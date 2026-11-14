# EARTHSCOPE — FINAL RESOURCE REGISTER & SOURCE ATTRIBUTIONS
## NASA Space Apps Challenge 2026 | Challenge 02: "Be An Earth System Trend Detective!"

---

## 1. OFFICIAL SPACE AGENCY & EARTH SCIENCE DATASETS

| Resource Name | Provider / Agency | URL / Access Endpoint | Purpose in EARTHSCOPE | License / Terms |
| :--- | :--- | :--- | :--- | :--- |
| **MODIS MOD13A3.061** | NASA LP DAAC / USGS | `https://doi.org/10.5067/MODIS/MOD13A3.061` | Monthly 1 km Vegetation Indices (NDVI, EVI) for canopy health monitoring | NASA Open Data Policy (Public Domain) |
| **GPM 3IMERGM.06** | NASA GES DISC | `https://doi.org/10.5067/GPM/IMERG/3B-MONTH/06` | Monthly precipitation accumulation for hydrological driver analysis | NASA Open Data Policy (Public Domain) |
| **GLDAS Noah L4 0.25°** | NASA GES DISC | `https://doi.org/10.5067/SXAVCZFAQLNO` | Monthly Root-Zone Soil Moisture ($0-100\text{ cm}$) | NASA Open Data Policy (Public Domain) |
| **MERRA-2 Reanalysis** | NASA GMAO / GES DISC | `https://doi.org/10.5067/SUOQESM065F5` | Monthly 2m air temperature and relative humidity for evaporative demand | NASA Open Data Policy (Public Domain) |
| **NASA GIBS WMTS** | NASA EOSDIS | `https://gibs.earthdata.nasa.gov` | Daily true-color imagery (MODIS/VIIRS) for spatial visualization | NASA Open Data Policy (Public Domain) |
| **NASA FIRMS** | NASA LANCE / FIRMS | `https://firms.modaps.eosdis.nasa.gov` | Active thermal anomalies and fire point screening | NASA Open Data Policy (Public Domain) |
| **NASA POWER API** | NASA Langley ASDC | `https://power.larc.nasa.gov` | Climatological meteorology and solar radiation feeds | NASA Open Data Policy (Public Domain) |
| **Sentinel-2 L2A & Landsat** | ESA / USGS via Microsoft Planetary Computer | `https://planetarycomputer.microsoft.com` | High-resolution 10m/30m multispectral satellite tiles for Before/After maps | Open Data / CC-BY 4.0 / Public Domain |

---

## 2. PRE-EXISTING VS. HACKATHON-DEVELOPED COMPONENTS

In strict adherence to NASA Space Apps official rules, we maintain transparent accounting of pre-existing project baseline assets versus new capabilities authored during this hackathon:

### Pre-Existing VanRakshak AI Baseline (Open Source under MIT License):
- Core Dark Command Center layout (`web/index.html`, `web/styles.css`).
- Base MapLibre GL canvas setup and Esri World Imagery basemap tile integration.
- Incident review drawer and initial ranger alert draft templates.
- Baseline FastAPI routing scaffold (`backend/app/main.py`).

### Newly Authored During Space Apps 2026 Hackathon:
- **`backend/app/services/nasa_trend_engine.py`:** Complete non-parametric Mann-Kendall test, Sen's slope with 95% confidence intervals, Seasonal Mann-Kendall stratification, 12-month climatology anomaly engine, Pearson/Spearman multi-variable correlation, and ReportLab PDF/CSV exporters.
- **`backend/tests/test_nasa_trend_engine.py` & `run_nasa_tests.py`:** Automated mathematical and scientific validation test suite (9/9 tests passing).
- **Planetary Computer Tile Integration (`backend/app/services/historical_imagery.py`):** Resilient cloud tile engine eliminating local Docker/TiTiler dependency for Before/After maps.
- **NASA Trend Lab Modal UI & Interactions (`web/index.html`, `web/app.js`):** Interactive controls, responsive HTML5 Canvas time-series renderer with climatology curves, dual-variable and dual-region comparative inspectors.
- **Responsive CSS Isolation Fix (`web/styles.css`):** Resolution of CSS grid-template collapse across all mobile and desktop viewports.
- **Complete Judging Compliance Documentation (`docs/*.md`):** Matrix, use case, scientific validation, data provenance, and presentation storyboard.

---

## 3. OPEN-SOURCE LIBRARIES & THIRD-PARTY ASSETS

| Library / Asset | Version | Purpose in Project | License |
| :--- | :--- | :--- | :--- |
| **FastAPI** | `0.128.2` | High-performance asynchronous backend API framework | MIT License |
| **ReportLab** | `4.4.9` | Publication-grade scientific PDF document generation | BSD License |
| **MapLibre GL JS** | `5.6.2` | Open-source vector/raster interactive web map engine | 3-Clause BSD |
| **ECharts** | `5.6.0` | Analytical charts and trend visualization | Apache 2.0 |
| **Leaflet** | `1.9.4` | Light map layer handling | BSD-2-Clause |
| **NumPy & SciPy** | `2.3.5 / 1.16.3` | Array mathematics, error function CDF evaluation | BSD-3-Clause |
| **Shapely** | `2.1.2` | Geometric manipulations for bounding polygons | BSD-3-Clause |
| **Pydantic** | `2.13.4` | Request validation and data serialization | MIT License |
| **Inter Font** | Rasmus Andersson | Clean utilitarian typography | SIL Open Font License 1.1 |
| **OSRM** | Project OSRM | Road and track routing for ranger patrols | 2-Clause BSD |
| **SoilGrids REST API** | ISRIC | Soil organic carbon and bulk density context | CC-BY 4.0 |
| **Protected Planet API** | UNEP-WCMC | World Database on Protected Areas boundaries | Terms of Use for non-commercial research |
