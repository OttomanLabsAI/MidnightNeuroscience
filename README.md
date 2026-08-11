# MidnightNeuroscience
Mapping the Brain with our open-source app. At the moment, we are mapping the receptor sub-types to brain regions by analysing densities per region.

## Website

The website is fully static — no server needed. It lives in the `site/` folder:

- `site/index.html` — Region Atlas, the homepage: interactive MRI brain map that highlights AAL-116 regions on the MNI152 template, in the browser.
- `site/receptors.html` — Receptor Density viewer: pick a receptor family from the dropdown and the grouped bar chart shows the density of each receptor sub-type across brain structures.

To preview locally, just open either file in a browser.

## Hosting on Cloudflare (auto-deploy on merge to `main`)

The site is deployed as a Cloudflare Worker connected to this repository. The `wrangler.jsonc` file at the repo root tells Cloudflare what to deploy: the static files in `site/`, and nothing else. Every merge to `main` triggers a new build and publishes the updated site automatically; pushes to other branches get preview deployments.

If a deploy ever serves the wrong thing, check the Worker's build settings in the Cloudflare dashboard (**your Worker → Settings → Build**):

- **Git repository:** this repo, production branch `main`
- **Build command:** *(leave empty — there is nothing to build)*
- **Deploy command:** `npx wrangler deploy`
- **Root directory:** `/`

Cloudflare serves clean URLs automatically, so the pages are available at `/` (Region Atlas) and `/receptors` (receptor viewer). The old `/regionatlas` link redirects to the homepage. A custom domain can be attached under the Worker's **Domains & Routes** settings.

## Backend

The Python code in `backend/` is used for data processing. The chart data embedded in `site/receptors.html` comes from `backend/data/ReceptorDensity.csv`, processed the same way as before: each `min:max` density range is collapsed to its max value.
