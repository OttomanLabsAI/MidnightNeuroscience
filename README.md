# NeuralMapping
Mapping the Brain with our open-source app. At the moment, we are mapping the receptor sub-types to brain regions by analysing densities per region.

The app is a static HTML page — no server needed. Just open `index.html` in a browser, pick a receptor family from the dropdown, and the grouped bar chart shows the density of each receptor sub-type across brain structures.

The Python code in `backend/` is used for data processing. The chart data embedded in `index.html` comes from `backend/data/ReceptorDensity.csv`, processed the same way as before: each `min:max` density range is collapsed to its max value.
