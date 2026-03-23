const US_STATE_META = [
  { abbr: "AL", name: "Alabama", fips: "01" },
  { abbr: "AK", name: "Alaska", fips: "02" },
  { abbr: "AZ", name: "Arizona", fips: "04" },
  { abbr: "AR", name: "Arkansas", fips: "05" },
  { abbr: "CA", name: "California", fips: "06" },
  { abbr: "CO", name: "Colorado", fips: "08" },
  { abbr: "CT", name: "Connecticut", fips: "09" },
  { abbr: "DE", name: "Delaware", fips: "10" },
  { abbr: "DC", name: "District of Columbia", fips: "11" },
  { abbr: "FL", name: "Florida", fips: "12" },
  { abbr: "GA", name: "Georgia", fips: "13" },
  { abbr: "HI", name: "Hawaii", fips: "15" },
  { abbr: "ID", name: "Idaho", fips: "16" },
  { abbr: "IL", name: "Illinois", fips: "17" },
  { abbr: "IN", name: "Indiana", fips: "18" },
  { abbr: "IA", name: "Iowa", fips: "19" },
  { abbr: "KS", name: "Kansas", fips: "20" },
  { abbr: "KY", name: "Kentucky", fips: "21" },
  { abbr: "LA", name: "Louisiana", fips: "22" },
  { abbr: "ME", name: "Maine", fips: "23" },
  { abbr: "MD", name: "Maryland", fips: "24" },
  { abbr: "MA", name: "Massachusetts", fips: "25" },
  { abbr: "MI", name: "Michigan", fips: "26" },
  { abbr: "MN", name: "Minnesota", fips: "27" },
  { abbr: "MS", name: "Mississippi", fips: "28" },
  { abbr: "MO", name: "Missouri", fips: "29" },
  { abbr: "MT", name: "Montana", fips: "30" },
  { abbr: "NE", name: "Nebraska", fips: "31" },
  { abbr: "NV", name: "Nevada", fips: "32" },
  { abbr: "NH", name: "New Hampshire", fips: "33" },
  { abbr: "NJ", name: "New Jersey", fips: "34" },
  { abbr: "NM", name: "New Mexico", fips: "35" },
  { abbr: "NY", name: "New York", fips: "36" },
  { abbr: "NC", name: "North Carolina", fips: "37" },
  { abbr: "ND", name: "North Dakota", fips: "38" },
  { abbr: "OH", name: "Ohio", fips: "39" },
  { abbr: "OK", name: "Oklahoma", fips: "40" },
  { abbr: "OR", name: "Oregon", fips: "41" },
  { abbr: "PA", name: "Pennsylvania", fips: "42" },
  { abbr: "RI", name: "Rhode Island", fips: "44" },
  { abbr: "SC", name: "South Carolina", fips: "45" },
  { abbr: "SD", name: "South Dakota", fips: "46" },
  { abbr: "TN", name: "Tennessee", fips: "47" },
  { abbr: "TX", name: "Texas", fips: "48" },
  { abbr: "UT", name: "Utah", fips: "49" },
  { abbr: "VT", name: "Vermont", fips: "50" },
  { abbr: "VA", name: "Virginia", fips: "51" },
  { abbr: "WA", name: "Washington", fips: "53" },
  { abbr: "WV", name: "West Virginia", fips: "54" },
  { abbr: "WI", name: "Wisconsin", fips: "55" },
  { abbr: "WY", name: "Wyoming", fips: "56" }
];

const STATE_BY_ABBR = Object.fromEntries(US_STATE_META.map((s) => [s.abbr, s]));
const STATE_ABBR_BY_FIPS = Object.fromEntries(US_STATE_META.map((s) => [s.fips, s.abbr]));

const FEDERAL_BRACKETS = [
  { cap: 11600, rate: 0.1 },
  { cap: 47150, rate: 0.12 },
  { cap: 100525, rate: 0.22 },
  { cap: 191950, rate: 0.24 },
  { cap: 243725, rate: 0.32 },
  { cap: 609350, rate: 0.35 },
  { cap: Infinity, rate: 0.37 }
];

const FICA_SOCIAL_SECURITY_RATE = 0.062;
const FICA_WAGE_BASE = 168600;
const FICA_MEDICARE_RATE = 0.0145;
const FICA_ADDITIONAL_MEDICARE_RATE = 0.009;
const FICA_ADDITIONAL_THRESHOLD = 200000;

const COUNTY_GEOJSON_URL =
  "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json";
const COUNTY_COL_JSON_URL = "./data/county_col_index_2026.json";
const STATE_TAX_JSON_URL = "./data/state_tax_brackets.json";

const MAJOR_CITIES = [
  { name: "Seattle", lat: 47.6062, lon: -122.3321 },
  { name: "San Francisco", lat: 37.7749, lon: -122.4194 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "Phoenix", lat: 33.4484, lon: -112.074 },
  { name: "Denver", lat: 39.7392, lon: -104.9903 },
  { name: "Dallas", lat: 32.7767, lon: -96.797 },
  { name: "Houston", lat: 29.7604, lon: -95.3698 },
  { name: "Minneapolis", lat: 44.9778, lon: -93.265 },
  { name: "Chicago", lat: 41.8781, lon: -87.6298 },
  { name: "St. Louis", lat: 38.627, lon: -90.1994 },
  { name: "Atlanta", lat: 33.749, lon: -84.388 },
  { name: "Miami", lat: 25.7617, lon: -80.1918 },
  { name: "Washington, DC", lat: 38.9072, lon: -77.0369 },
  { name: "Philadelphia", lat: 39.9526, lon: -75.1652 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "Boston", lat: 42.3601, lon: -71.0589 }
];

const dom = {
  grossIncome: document.getElementById("grossIncome"),
  taxStatus: document.getElementById("taxStatus"),
  monthlyThreshold: document.getElementById("monthlyThreshold"),
  colToggle: document.getElementById("colToggle"),
  refreshButton: document.getElementById("refreshButton"),
  map: document.getElementById("map"),
  selectionInfo: document.getElementById("selectionInfo"),
  colExplain: document.getElementById("colExplain"),
  summaryCards: document.getElementById("summaryCards")
};

const appState = {
  countyGeoJson: null,
  countyRecords: [],
  stateTaxBracketsByAbbr: {},
  countyFmrByFips: {},
  countyFmrMedian: 0
};

function currency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function parseInputs() {
  const grossIncome = Number(dom.grossIncome.value || 0);
  const taxStatus = dom.taxStatus.value;
  const monthlyThreshold = Math.max(0, Number(dom.monthlyThreshold.value || 0));
  const colAdjusted = dom.colToggle.checked;
  return { grossIncome, taxStatus, monthlyThreshold, colAdjusted };
}

function applyAutoLayoutMode() {
  const mobileViewport = window.matchMedia("(max-width: 768px)").matches;
  const normalized = mobileViewport ? "mobile" : "desktop";
  document.body.setAttribute("data-layout-mode", normalized);
  // Let CSS settle, then resize plot to avoid clipped map.
  setTimeout(() => {
    try {
      Plotly.Plots.resize(dom.map);
    } catch (_error) {
      // Ignore before first map render.
    }
  }, 0);
}

function standardDeductionForStatus(taxStatus) {
  if (taxStatus === "nonResidentUnder5") {
    return 0;
  }
  return 14600;
}

function estimateFederalTax(income, taxStatus) {
  const taxable = Math.max(0, income - standardDeductionForStatus(taxStatus));
  let tax = 0;
  let lower = 0;
  for (const bracket of FEDERAL_BRACKETS) {
    if (taxable <= lower) break;
    const upper = bracket.cap;
    const taxedInBracket = Math.max(0, Math.min(taxable, upper) - lower);
    tax += taxedInBracket * bracket.rate;
    lower = upper;
  }
  return tax;
}

function estimateFicaTax(income, taxStatus) {
  if (taxStatus === "nonResidentUnder5") {
    return 0;
  }
  const socialSecurity = Math.min(income, FICA_WAGE_BASE) * FICA_SOCIAL_SECURITY_RATE;
  const medicare = income * FICA_MEDICARE_RATE;
  const additional = Math.max(0, income - FICA_ADDITIONAL_THRESHOLD) * FICA_ADDITIONAL_MEDICARE_RATE;
  return socialSecurity + medicare + additional;
}

function estimateStateTaxFromBrackets(income, stateAbbr) {
  if (income <= 0) return 0;
  const brackets = appState.stateTaxBracketsByAbbr[stateAbbr];
  if (!brackets || !brackets.length) return 0;

  let tax = 0;
  for (const bracket of brackets) {
    const upper = bracket.max;
    const taxed = Math.max(0, Math.min(income, upper) - bracket.min);
    tax += taxed * bracket.rate;
  }
  return tax;
}

function estimateAnnualTakeHome(grossIncome, taxStatus, stateAbbr) {
  const federal = estimateFederalTax(grossIncome, taxStatus);
  const fica = estimateFicaTax(grossIncome, taxStatus);
  const stateTax = estimateStateTaxFromBrackets(grossIncome, stateAbbr);
  const takeHome = Math.max(0, grossIncome - federal - fica - stateTax);

  return {
    takeHomeAnnual: takeHome,
    takeHomeMonthly: takeHome / 12,
    stateTaxAnnual: stateTax,
    federalTaxAnnual: federal,
    ficaAnnual: fica
  };
}

function adjustedForCostOfLiving(monthlyTakeHome, colIndex) {
  return monthlyTakeHome * (100 / colIndex);
}

function getColorbarConfig(title, isMobile) {
  if (!isMobile) {
    return { title };
  }
  return {
    title: { text: title, side: "top", font: { size: 10 } },
    orientation: "h",
    thickness: 8,
    len: 0.62,
    x: 0.5,
    xanchor: "center",
    y: 0.01,
    yanchor: "bottom",
    tickfont: { size: 9 },
    bgcolor: "rgba(255,255,255,0.75)"
  };
}

function buildStateViewData(input, isMobile) {
  const locations = [];
  const z = [];
  const customdata = [];
  for (const state of US_STATE_META) {
    const takeHome = estimateAnnualTakeHome(input.grossIncome, input.taxStatus, state.abbr);
    if (takeHome.takeHomeMonthly < input.monthlyThreshold) continue;
    const effectiveRate = input.grossIncome > 0 ? takeHome.stateTaxAnnual / input.grossIncome : 0;
    locations.push(state.abbr);
    z.push(takeHome.takeHomeMonthly);
    customdata.push([state.name, effectiveRate, takeHome.stateTaxAnnual, takeHome.takeHomeMonthly]);
  }

  return {
    type: "choropleth",
    locationmode: "USA-states",
    locations,
    z,
    customdata,
    colorbar: getColorbarConfig("Monthly take-home", isMobile),
    marker: { line: { color: "#ffffff", width: 0.7 } },
    hovertemplate:
      "<b>%{customdata[0]}</b><br>Estimated state income tax: %{customdata[2]:$,.0f}/yr (%{customdata[1]:.2%})<br>Take-home: %{z:$,.0f}/mo<extra></extra>",
    colorscale: "Viridis"
  };
}

function buildCountyViewData(input, isMobile) {
  const locations = [];
  const z = [];
  const customdata = [];

  for (const county of appState.countyRecords) {
    const takeHome = estimateAnnualTakeHome(input.grossIncome, input.taxStatus, county.stateAbbr);
    const adjustedMonthly = adjustedForCostOfLiving(takeHome.takeHomeMonthly, county.colIndex);
    if (adjustedMonthly < input.monthlyThreshold) continue;
    const multiplier = 100 / county.colIndex;
    locations.push(county.fips);
    z.push(adjustedMonthly);
    customdata.push([
      county.name,
      county.stateAbbr,
      county.colIndex,
      takeHome.takeHomeMonthly,
      multiplier,
      adjustedMonthly
    ]);
  }

  return {
    type: "choropleth",
    geojson: appState.countyGeoJson,
    locations,
    z,
    featureidkey: "id",
    customdata,
    colorbar: getColorbarConfig("COL-adjusted monthly", isMobile),
    marker: { line: { color: "#f5f7ff", width: 0.1 } },
    hovertemplate:
      "<b>%{customdata[0]}, %{customdata[1]}</b><br>Raw: %{customdata[3]:$,.0f}/mo<br>COL index: %{customdata[2]}<br>Multiplier: %{customdata[4]:.3f}x (100 / index)<br>Adjusted: %{customdata[5]:$,.0f}/mo<extra></extra>",
    colorscale: "Turbo"
  };
}

function buildMajorCityLabelsTrace(isMobile) {
  const mode = isMobile ? "markers" : "markers+text";
  return {
    type: "scattergeo",
    mode,
    lat: MAJOR_CITIES.map((city) => city.lat),
    lon: MAJOR_CITIES.map((city) => city.lon),
    text: MAJOR_CITIES.map((city) => city.name),
    textposition: "top center",
    textfont: { size: 10, color: "#1b2a4a" },
    marker: { size: 4, color: "#1b2a4a", opacity: 0.7 },
    name: "Major cities",
    hovertemplate: "<b>%{text}</b><extra></extra>",
    showlegend: false
  };
}

function renderSummaryCards(input) {
  const monthlyValues = US_STATE_META.map(
    (state) => estimateAnnualTakeHome(input.grossIncome, input.taxStatus, state.abbr).takeHomeMonthly
  );

  const avgMonthly = monthlyValues.reduce((a, b) => a + b, 0) / monthlyValues.length;
  const maxMonthly = Math.max(...monthlyValues);
  const minMonthly = Math.min(...monthlyValues);

  const cardItems = [
    { title: "Gross / Month", value: currency(input.grossIncome / 12) },
    { title: "US Avg Take-home / Month", value: currency(avgMonthly) },
    { title: "Highest State Estimate", value: currency(maxMonthly) },
    { title: "Lowest State Estimate", value: currency(minMonthly) }
  ];

  dom.summaryCards.innerHTML = cardItems
    .map((item) => `<article class="card"><h3>${item.title}</h3><p>${item.value}</p></article>`)
    .join("");
}

function updateSelectionInfo(text) {
  dom.selectionInfo.innerHTML = text;
}

function renderColExplain(input, useCountyCol) {
  if (!useCountyCol) {
    dom.colExplain.innerHTML =
      "COL adjustment is off in the current view. Enable the checkbox to color counties by adjusted monthly take-home.";
    return;
  }

  const exampleState = "CA";
  const exampleRaw = estimateAnnualTakeHome(input.grossIncome, input.taxStatus, exampleState).takeHomeMonthly;
  const exampleIndex = 120;
  const exampleMultiplier = 100 / exampleIndex;
  const exampleAdjusted = adjustedForCostOfLiving(exampleRaw, exampleIndex);
  dom.colExplain.innerHTML = `Visualization formula (county mode): <strong>adjusted monthly = raw monthly * (100 / COL index)</strong><br/>Example: ${currency(
    exampleRaw
  )} * (100 / ${exampleIndex}) = ${currency(exampleAdjusted)} (${exampleMultiplier.toFixed(3)}x). Here COL index is based on county HUD 2-bedroom FMR relative to national median.`;
}

function renderMap() {
  const input = parseInputs();
  const isMobile = document.body.getAttribute("data-layout-mode") === "mobile";
  const useCountyCol = input.colAdjusted && Boolean(appState.countyGeoJson);
  const mapTrace = useCountyCol ? buildCountyViewData(input, isMobile) : buildStateViewData(input, isMobile);
  const cityTrace = buildMajorCityLabelsTrace(isMobile);
  const visibleRegionCount = mapTrace.locations.length;

  const title = useCountyCol
    ? "County-Level Cost-of-Living Adjusted Monthly Take-Home"
    : "State-Level Monthly Take-Home (Before COL Adjustment)";
  const thresholdText = `Threshold: ${currency(input.monthlyThreshold)}/mo`;

  Plotly.newPlot(dom.map, [mapTrace, cityTrace], {
    title: {
      text: `${title}<br><sup>${thresholdText}</sup>`,
      font: { size: isMobile ? 13 : 18 }
    },
    geo: {
      scope: "usa",
      projection: { type: "albers usa" },
      showland: true,
      landcolor: "#eef1f6",
      bgcolor: "#ffffff"
    },
    margin: isMobile ? { t: 54, l: 6, r: 6, b: 28 } : { t: 70, l: 10, r: 10, b: 10 },
    height: isMobile ? 560 : undefined
  });

  if (visibleRegionCount === 0) {
    updateSelectionInfo(
      `No regions exceed ${currency(
        input.monthlyThreshold
      )}/mo. Lower the threshold to see map values.`
    );
  } else {
    const regionLabel = useCountyCol ? "counties" : "states";
    updateSelectionInfo(
      `${visibleRegionCount.toLocaleString()} ${regionLabel} currently exceed ${currency(
        input.monthlyThreshold
      )}/mo. Click a region for details.`
    );
  }

  dom.map.on("plotly_click", (eventData) => {
    const point = eventData?.points?.[0];
    if (!point) return;
    if (!point.location && !point.customdata) return;

    if (useCountyCol) {
      const [countyName, stateAbbr, colIndex, rawMonthly, multiplier, adjustedMonthly] = point.customdata;
      updateSelectionInfo(
        `<strong>${countyName}, ${stateAbbr}</strong><br/>Raw take-home: ${currency(
          rawMonthly
        )}/mo<br/>COL index: ${colIndex}<br/>Formula: ${currency(rawMonthly)} * (100 / ${colIndex}) = ${currency(
          adjustedMonthly
        )}<br/>Multiplier: ${multiplier.toFixed(3)}x<br/>COL data: HUD 2-bedroom FMR index`
      );
      return;
    }

    const stateAbbr = point.location;
    const stateMeta = STATE_BY_ABBR[stateAbbr];
    const takeHome = estimateAnnualTakeHome(input.grossIncome, input.taxStatus, stateAbbr);
    const effectiveRate = input.grossIncome > 0 ? takeHome.stateTaxAnnual / input.grossIncome : 0;
    updateSelectionInfo(
      `<strong>${stateMeta.name} (${stateAbbr})</strong><br/>Estimated monthly take-home: ${currency(
        takeHome.takeHomeMonthly
      )}<br/>State income tax estimate: ${currency(takeHome.stateTaxAnnual)}/yr (${(effectiveRate * 100).toFixed(
        2
      )}%)`
    );
  });

  renderSummaryCards(input);
  renderColExplain(input, useCountyCol);
}

function buildCountyRecordsFromDatasets() {
  if (!appState.countyGeoJson) return;
  appState.countyRecords = appState.countyGeoJson.features
    .map((feature) => {
      const stateFips = feature.properties?.STATE;
      const stateAbbr = STATE_ABBR_BY_FIPS[stateFips];
      if (!stateAbbr) return null;
      const fips = feature.id;
      const colIndex = Number(appState.countyFmrByFips[fips]) || 100;
      return {
        fips,
        stateAbbr,
        name: feature.properties?.NAME || "Unknown County",
        colIndex
      };
    })
    .filter(Boolean);
}

async function initializeStateTaxData() {
  try {
    const response = await fetch(STATE_TAX_JSON_URL);
    if (!response.ok) throw new Error(`Unable to fetch state tax data (${response.status})`);
    const data = await response.json();
    const byState = data.brackets_by_state || {};

    for (const state of US_STATE_META) {
      const brackets = (byState[state.abbr] || [])
        .map((b) => ({
          rate: Number(b.rate) || 0,
          min: Number(b.min) || 0,
          max: b.max === null || b.max === undefined ? Infinity : Number(b.max)
        }))
        .sort((a, b) => a.min - b.min);
      appState.stateTaxBracketsByAbbr[state.abbr] =
        brackets.length > 0 ? brackets : [{ rate: 0, min: 0, max: Infinity }];
    }
  } catch (error) {
    console.error(error);
    for (const state of US_STATE_META) {
      appState.stateTaxBracketsByAbbr[state.abbr] = [{ rate: 0, min: 0, max: Infinity }];
    }
    updateSelectionInfo("State tax dataset unavailable, so state income tax is temporarily set to zero.");
  }
}

async function initializeCountyGeoJson() {
  try {
    const response = await fetch(COUNTY_GEOJSON_URL);
    if (!response.ok) throw new Error(`Unable to fetch county data (${response.status})`);
    appState.countyGeoJson = await response.json();
  } catch (error) {
    console.error(error);
    updateSelectionInfo(
      "County cost-of-living layer could not be loaded, so the map is using state-level mode only."
    );
  }
}

async function initializeCountyHousingCostData() {
  try {
    const response = await fetch(COUNTY_COL_JSON_URL);
    if (!response.ok) throw new Error(`Unable to fetch county housing dataset (${response.status})`);
    const data = await response.json();
    appState.countyFmrByFips = data.col_index_by_fips || {};
    appState.countyFmrMedian = data.median_fmr_2br || 1;
  } catch (error) {
    console.error(error);
    appState.countyFmrByFips = {};
    appState.countyFmrMedian = 1;
    updateSelectionInfo("County housing-cost dataset unavailable, so COL index defaults to 100.");
  }
}

async function boot() {
  updateSelectionInfo("Loading state tax and county cost datasets...");
  await Promise.all([initializeStateTaxData(), initializeCountyGeoJson(), initializeCountyHousingCostData()]);
  buildCountyRecordsFromDatasets();
  renderMap();
}

dom.refreshButton.addEventListener("click", renderMap);
dom.colToggle.addEventListener("change", renderMap);
dom.monthlyThreshold.addEventListener("change", renderMap);
window.addEventListener("resize", applyAutoLayoutMode);

applyAutoLayoutMode();
boot();
