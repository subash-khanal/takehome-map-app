# US Take-Home Pay Explorer (MVP)

Interactive browser app to estimate monthly take-home pay based on:

- Gross annual income
- Immigration / tax status
- Location in the USA (state and county map click)
- Optional local cost-of-living (COL) adjustment
- Threshold filter to display only regions above a minimum monthly value
- Major US city labels for orientation on the map

## Live Site

<https://subash-khanal.github.io/takehome-map-app/>

## Run locally

Because this is a static app, run it with any local web server.

### Option A (Python, most common)

```bash
cd "/Users/subashkhanal/Desktop/JOBS/Job/takehome-map-app"
python3 -m http.server 8080
```

Then open: <http://localhost:8080>

### Option B (open file directly)

You can open `index.html` in a browser, but some browsers may block remote data fetch for county data.

## Notes

- Tax calculations are simplified (MVP assumptions shown in UI).
- Federal tax is simplified, but state tax now uses real state bracket data from Tax Foundation.
- County COL now uses a real public proxy from HUD county-level 2-bedroom Fair Market Rents.
- Non-resident tax handling varies by visa/treaty; this MVP uses a simple baseline assumption.
- COL visualization in county mode uses: `adjusted = raw_monthly * (100 / COL_index)`.
- COL index computation uses: `county_col_index = county_fmr_2br / national_median_fmr_2br * 100`.

## Data Sources

- US county boundaries (GeoJSON): <https://github.com/plotly/datasets/blob/master/geojson-counties-fips.json>
- State income tax brackets (CSV): <https://github.com/TaxFoundation/facts-and-figures/blob/master/12-state-individual-income-tax.csv>
- County housing-cost proxy (HUD county 2-bedroom FMR CSV): <https://www.huduser.gov/Portal/datasets/FMR/FMR_2Bed_1983_2026.csv>
- Federal tax bracket reference (baseline): <https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024>
- Social Security wage base reference: <https://www.ssa.gov/oact/cola/cbb.html>
- Additional Medicare tax reference: <https://www.irs.gov/taxtopics/tc560>

## Bundled real-data files

- `data/state_tax_brackets.json` (generated from Tax Foundation CSV)
- `data/county_col_index_2026.json` (generated from HUD FMR CSV)

These are checked into the app so static hosting (e.g., GitHub Pages) does not rely on third-party CORS settings at runtime.
