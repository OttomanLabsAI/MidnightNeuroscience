# NeuralMapping
Mapping the Brain with our open-source app. At the moment, we are mapping the receptor sub-types to brain regions by analysing densities per region.

## Website

The website is fully static — no server needed. It lives in the `site/` folder:

- `site/index.html` — Receptor Density viewer: pick a receptor family from the dropdown and the grouped bar chart shows the density of each receptor sub-type across brain structures.
- `site/regionatlas.html` — Region Atlas: interactive MRI brain map that highlights AAL-116 regions on the MNI152 template, in the browser.

To preview locally, just open either file in a browser.

## Hosting on Cloudflare (auto-deploy on merge to `main`)

The site deploys with Cloudflare Pages using its built-in Git integration — every merge to `main` automatically publishes the new version. One-time setup:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize GitHub and select the `OttomanLabsAI/NeuralMapping` repository.
3. Configure the build:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `site`
4. Click **Save and Deploy**.

That's it — Cloudflare builds nothing, it just publishes the `site/` folder. From then on:

- Every merge/push to `main` deploys to production automatically.
- Every push to any other branch gets its own preview URL on the pull request.

Cloudflare serves clean URLs automatically, so the pages are available at `/` (receptor viewer) and `/regionatlas` (region atlas). A custom domain can be attached under the project's **Custom domains** tab.

## Backend

The Python code in `backend/` is used for data processing. The chart data embedded in `site/index.html` comes from `backend/data/ReceptorDensity.csv`, processed the same way as before: each `min:max` density range is collapsed to its max value.
