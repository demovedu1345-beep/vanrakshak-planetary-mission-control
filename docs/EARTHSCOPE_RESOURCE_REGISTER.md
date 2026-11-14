# EARTHSCOPE — OFFICIAL RESOURCE & DATASET REGISTER
## NASA Space Apps Challenge 2026 — Challenge #2: "Be An Earth System Trend Detective!"

**Document Version:** 1.0.0  
**Registration Date:** November 14, 2026  
**Auditor:** EARTHSCOPE Science & Engineering Working Group  
**Compliance Target:** NASA Space Apps Official Judging Guidelines (Relevance, Validity, Provenance)

---

## 1. NASA Earth Science Data Products (Tiers P0, P1, P2)

| Tier | Short Name | Product Name | Instrument / Mission | DAAC / Center | DOI / URL | Native Resolution |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **P0** | **MOD13Q1.061** | MODIS/Terra Vegetation Indices 16-Day L3 Global 250m SIN Grid | MODIS / Terra | LP DAAC | `doi:10.5067/MODIS/MOD13Q1.061` | 250 m |
| **P0** | **MOD11A2.061** | MODIS/Terra Land Surface Temperature/Emissivity 8-Day L3 Global 1km | MODIS / Terra | LP DAAC | `doi:10.5067/MODIS/MOD11A2.061` | 1 km |
| **P0** | **NASA POWER** | Prediction of Worldwide Energy Resources (Monthly Agroclimatology) | Assimilated Reanalysis (GEOS-5 FP-IT / MERRA-2) | NASA LaRC | `https://power.larc.nasa.gov` | 0.5° × 0.5° |
| **P1** | **GPM 3B-MONTH** | Global Precipitation Measurement (GPM) Integrated Multi-satellitE Retrievals for GPM (IMERG) Final Monthly | GMI / DPR / Multi-satellite Constellation | GES DISC | `doi:10.5067/GPM/IMERG/3B-MONTH/07` | 0.1° × 0.1° |
| **P1** | **MERRA-2** | Modern-Era Retrospective analysis for Research and Applications, Version 2 | Global Modeling and Assimilation Office (GMAO) | GES DISC | `doi:10.5067/2E096JV59PK7` | 0.5° × 0.625° |
| **P1** | **GLDAS-2.1** | Global Land Data Assimilation System Noah Land Surface Model L4 0.25 × 0.25 degree Monthly | Noah LSM / Multi-sensor Forcing | GES DISC | `doi:10.5067/74QC742M88V0` | 0.25° × 0.25° |
| **P2** | **AIRS2RET** | Atmospheric Infrared Sounder (AIRS) / Aqua L3 Monthly Standard Physical Retrieval | AIRS / Aqua | GES DISC | `doi:10.5067/Aqua/AIRS/DATA301` | 1.0° × 1.0° |
| **P2** | **OMTO3d** | Ozone Monitoring Instrument (OMI) / Aura Daily Global Total Column Ozone | OMI / Aura | GES DISC | `doi:10.5067/Aura/OMI/DATA3001` | 1.0° × 1.0° |

---

## 2. Near-Real-Time Disturbance & Event Telemetry

| Service | Provider / Agency | Integration Type | Authentication Method | Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **NASA FIRMS** | NASA LANCE / GSFC | REST API | Map Key (`5838d5821e01327a8b8c24fe055a0955`) | Real-time thermal anomalies and fire footprints (VIIRS 375m & MODIS 1km) |
| **NASA EONET** | NASA Earth Observatory | REST API v3 | Open / Public | Natural hazard tracking (wildfires, severe storms, volcanoes, floods) |
| **NASA AppEEARS** | LP DAAC / USGS EROS | REST API | Earthdata Login Bearer Token (`veduxearthscope`) | Point and polygon area subsetting, reformatting, and statistical reprojection |
| **NASA CMR** | NASA Earthdata | REST API | Earthdata Login Bearer Token | Dynamic granule, collection, platform, and spatial facet querying |

---

## 3. Auxiliary Open-Source Scientific Datasets

| Dataset | Provider | Purpose | Resolution | Provenance URL |
| :--- | :--- | :--- | :--- | :--- |
| **ISRIC SoilGrids 2.0** | ISRIC — World Soil Information | Soil organic carbon (SOC), pH, clay, sand, bulk density | 250 m | `https://rest.isric.org` |
| **Copernicus Sentinel-2** | ESA / European Union | High-resolution optical validation (RGB, False Color, NDVI) | 10 m / 20 m | Microsoft Planetary Computer STAC |
| **Copernicus Sentinel-1** | ESA / Alaska Satellite Facility (ASF) | Synthetic Aperture Radar (SAR) all-weather canopy structure | 10 m (C-band) | ASF Vertex REST API |
| **USGS Landsat 8/9** | USGS / NASA | 50-year historical decadal optical baseline | 30 m | USGS / Planetary Computer |
| **Open-Meteo Climatology** | Open-Meteo / ECMWF | Near-surface historical weather and short-term forecasts | 1 km – 11 km | `https://archive-api.open-meteo.com` |
| **Protected Planet (WDPA)** | UNEP-WCMC / IUCN | Protected area boundaries, IUCN categories, management status | Vector Polygons | `https://api.protectedplanet.net` |
| **OpenStreetMap Overpass** | OpenStreetMap Community | Human pressure, infrastructure density, encroachment vectors | Vector Features | `https://overpass-api.de` |

---

## 4. Software Libraries & Attribution Register

| Library / Engine | Version | License | Role in EARTHSCOPE |
| :--- | :--- | :--- | :--- |
| **FastAPI** | 0.115+ | MIT | Asynchronous high-performance REST application framework |
| **Starlette / Uvicorn** | 0.38+ | BSD-3 | Asynchronous server gateway interface (ASGI) |
| **Pydantic** | 2.9+ | MIT | Strict data validation, schema enforcement, and telemetry typing |
| **Three.js** | 0.160.0 | MIT | WebGL 3D Earth canvas, atmospheric shading, and orbital projection |
| **Apache ECharts** | 5.4.3 | Apache-2.0 | High-performance interactive SVG/Canvas time-series charts |
| **MapLibre GL JS** | 3.6.2 / 5.6.2 | BSD-3 | Open-source vector and raster geospatial mapping client |
| **Leaflet.js** | 1.9.4 | BSD-2 | Lightweight before/after split-slider change visualizer |
| **ReportLab** | 4.2+ | BSD-like | Reproducible scientific PDF publication and dossier generation |
| **HTTPX** | 0.27+ | BSD-3 | Next-generation asynchronous HTTP client with backoff retries |

---

## 5. Pre-Existing Code vs. Hackathon Innovation Statement

In accordance with official NASA Space Apps Challenge Rules:
- **Pre-Existing Code:** The baseline VanRakshak repository contained forest alert endpoints, MapLibre UI wrappers, basic weather fetchers, and layout templates developed prior to the event.
- **Hackathon Additions & Innovations (November 2026):**
  1. The complete EARTHSCOPE Earth System Trend Detective mathematical engine (`backend/earthscope_backend.py` and `backend/app/services/nasa_trend_engine.py`).
  2. Implementations of Mann-Kendall ($S$, $\operatorname{Var}(S)$, $Z$, two-tailed $p$-value), Seasonal Mann-Kendall, Sen's slope with rank-based 95% confidence intervals, and 12-month climatology cycle anomalies.
  3. Yue-Pilon (2002) pre-whitened autocorrelation diagnostics ($r_1$) and Benjamini-Hochberg (1995) False Discovery Rate control.
  4. NASA Earthdata CMR live collection and granule discovery with Earthdata Login Bearer Token authentication.
  5. Multi-region biophysical trend contrast (Western Ghats Wet Evergreen vs Deccan Plateau Semi-Arid Deciduous).
  6. The dedicated 3D WebGL Planetary Observation & Trend Dashboard (`web/dashboard.html`) with dual-navigation federation.
  7. ReportLab reproducible PDF generator, CSV observation exporter, and 7 judging compliance dossiers.
