# Tract assets

`hcp1065.trk` belongs here — the web-sized copy of the HCP1065
population-averaged tractography atlas that `site/tracts.html` loads.

It is not committed with the source: build it once with

    python3 scripts/make_tractogram.py --input <the downloaded atlas>

and see `scripts/README.md` for where to get the atlas and how the file is
kept under Cloudflare's 25 MiB per-asset ceiling. Until it is present the page
says so and explains this, rather than failing silently.
