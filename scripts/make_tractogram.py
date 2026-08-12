#!/usr/bin/env python3
"""Build the web tractogram from the HCP1065 population-averaged atlas.

The published atlas is far too large to serve from a static site, so this
subsamples it to a streamline count that still reads as a dense whole-brain
tractogram while fitting inside Cloudflare's per-asset ceiling.

    python3 scripts/make_tractogram.py --input <dir-or-file> [--out site/assets/tracts/hcp1065.trk]

`--input` accepts either a single .trk file or a directory of per-bundle .trk
files, which are merged. Source: https://brain.labsolver.org/hcp_trk_atlas.html
(CC BY-SA 4.0, derived from HCP data; see scripts/README.md).
"""

import argparse
import pathlib
import sys

import numpy as np
import nibabel as nib
from nibabel.streamlines import Tractogram
from nibabel.streamlines.trk import TrkFile

# Cloudflare rejects static assets over 25 MiB; leave room to spare.
SIZE_LIMIT_MB = 20.0


def find_inputs(path: pathlib.Path) -> list[pathlib.Path]:
    if path.is_file():
        return [path]
    files = sorted(p for p in path.rglob("*.trk"))
    if not files:
        sys.exit(f"no .trk files under {path}")
    return files


def load_streamlines(files: list[pathlib.Path]):
    """Merge the bundles, keeping the first file's spatial header."""
    streamlines, header = [], None
    for f in files:
        trk = nib.streamlines.load(str(f), lazy_load=False)
        if header is None:
            header = trk.header
        streamlines.extend(trk.streamlines)
        print(f"  {f.name}: {len(trk.streamlines):>7,} streamlines")
    return streamlines, header


def decimate(streamline: np.ndarray, stride: int, min_points: int = 12) -> np.ndarray:
    """Drop every nth point, keeping the endpoints so the curve still lands
    where it should. Short streamlines are left alone to stay smooth."""
    if stride <= 1 or len(streamline) <= min_points:
        return streamline
    kept = streamline[::stride]
    if not np.array_equal(kept[-1], streamline[-1]):
        kept = np.vstack([kept, streamline[-1]])
    return kept


def estimate_mb(streamlines) -> float:
    """TRK on disk: a 1000-byte header, then per streamline a 4-byte count
    and three float32 per point."""
    points = sum(len(s) for s in streamlines)
    return (1000 + 4 * len(streamlines) + 12 * points) / (1024 * 1024)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--input", required=True, type=pathlib.Path,
                    help="a .trk file, or a directory of per-bundle .trk files")
    ap.add_argument("--out", type=pathlib.Path,
                    default=pathlib.Path("site/assets/tracts/hcp1065.trk"))
    ap.add_argument("--count", type=int, default=28000,
                    help="streamlines to keep (default 28000)")
    ap.add_argument("--stride", type=int, default=2,
                    help="keep every nth point along a streamline (default 2)")
    ap.add_argument("--min-length", type=float, default=20.0,
                    help="drop streamlines shorter than this, in mm (default 20)")
    ap.add_argument("--seed", type=int, default=20260812,
                    help="random seed, so the same atlas gives the same output")
    args = ap.parse_args()

    files = find_inputs(args.input)
    print(f"reading {len(files)} file(s)")
    streamlines, header = load_streamlines(files)
    print(f"total: {len(streamlines):,} streamlines")

    if args.min_length > 0:
        keep = []
        for s in streamlines:
            length = np.linalg.norm(np.diff(s, axis=0), axis=1).sum()
            if length >= args.min_length:
                keep.append(s)
        print(f"after dropping under {args.min_length:g} mm: {len(keep):,}")
        streamlines = keep

    if not streamlines:
        sys.exit("nothing left to write — check --min-length")

    rng = np.random.default_rng(args.seed)
    if len(streamlines) > args.count:
        idx = rng.choice(len(streamlines), size=args.count, replace=False)
        idx.sort()                      # keep bundles interleaved as they came
        streamlines = [streamlines[i] for i in idx]
    else:
        print("fewer streamlines than requested — keeping all")
    print(f"subsampled to: {len(streamlines):,}")

    stride = args.stride
    while True:
        thinned = [decimate(np.asarray(s, dtype=np.float32), stride) for s in streamlines]
        size = estimate_mb(thinned)
        print(f"stride {stride}: ~{size:.1f} MB")
        if size <= SIZE_LIMIT_MB or stride >= 6:
            break
        stride += 1                     # still too big: thin further

    while estimate_mb(thinned) > SIZE_LIMIT_MB and len(thinned) > 1000:
        # Curves are as sparse as they should go; drop streamlines instead.
        thinned = thinned[: int(len(thinned) * 0.9)]
        print(f"trimmed to {len(thinned):,} streamlines: ~{estimate_mb(thinned):.1f} MB")

    args.out.parent.mkdir(parents=True, exist_ok=True)
    tractogram = Tractogram(thinned, affine_to_rasmm=np.eye(4))
    TrkFile(tractogram, header=header).save(str(args.out))

    written = args.out.stat().st_size / (1024 * 1024)
    points = sum(len(s) for s in thinned)
    print(f"\nwrote {args.out}")
    print(f"  {len(thinned):,} streamlines, {points:,} points, {written:.1f} MB")
    if written > SIZE_LIMIT_MB:
        sys.exit(f"still over {SIZE_LIMIT_MB} MB — lower --count or raise --stride")


if __name__ == "__main__":
    main()
