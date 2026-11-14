# VANRAKSHAK AI — DASHBOARD INFORMATION ARCHITECTURE
**Planetary Forest Intelligence Mission Control**
**Architecture Specification Document** | **Date:** 2026-11-14

---

## 1. THE CORE DOCTRINE: ONE WORKSPACE, ONE PURPOSE, ONE CLEAR SET OF CONTROLS

The redesign eliminates the legacy single-page overcrowded control panel where all 37 features, 12 data layers, time-machine date pickers, cloud thresholds, and model parameters fought for screen real estate simultaneously. 

Instead, VanRakshak AI adopts a **Planetary Mission Control Information Architecture**:
- **Central Visual Anchor**: A continuous, hyper-realistic, interactive 3D Earth globe suspended in deep space.
- **Top Command Bar**: Minimal telemetry strip with system status, global geographic search, source health pill, and user mission settings.
- **Left Mission Navigation**: Collapsible, icon-driven sidebar guiding operators between 12 distinct workspaces.
- **Context-Sensitive Floating Inspector**: An adaptable right drawer that renders only information and actions relevant to the current user selection (satellite, region, alert, or analysis).
- **Bottom Timeline / Layer Strip**: Minimal scrubbable temporal navigator appearing only when historical or time-series data is active.

---

## 2. THE 12 DEDICATED WORKSPACES

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              VANRAKSHAK AI MISSION CONTROL                             │
│       [Search Location...]     [Selected: Kodagu (12.34°N, 75.81°E)]     [Health: 13/13 OK]    │
├───────────────┬────────────────────────────────────────────────────────┬───────────────┤
│ NAVIGATION    │ PRIMARY WORKSPACE CANVAS                               │ CONTEXT       │
│               │                                                        │ INSPECTOR     │
│ 1. Mission    │                                                        │               │
│    Control    │                  REALISTIC ROTATING                    │ Selected      │
│ 2. Earth      │                        3D EARTH                        │ Entity /      │
│    Globe      │                                                        │ Variable /    │
│ 3. Satellites │                 [Starfield & Atmosphere]               │ Hotspot       │
│ 4. Layers     │                                                        │               │
│ 5. Forest     │   [Floating Quick Toolbar: 3D/2D | Reset | Layers]     │ Live Metrics  │
│ 6. Hazards    │                                                        │ & Provenance  │
│ 7. Climate    │                                                        │               │
│ 8. AI Intel   │                                                        │ [Actions]     │
│ 9. Operations │                                                        │               │
│ 10. Analytics │                                                        │               │
│ 11. Reports   │                                                        │               │
│ 12. System    │                                                        │               │
├───────────────┴────────────────────────────────────────────────────────┴───────────────┤
│ BOTTOM OBSERVATION TIMELINE & ACTIVE LAYER STRIP                                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### WORKSPACE 1: MISSION CONTROL (Route: `/dashboard` or `#dashboard`)
- **Purpose**: Global situational awareness and executive planetary health overview.
- **Key Visual Elements**: Full interactive rotating 3D Earth, global observation status, selected area KPI cards (Vegetation Integrity, Land Surface Temp, Fire Hotspots, Warning Level), system provider health summary, high-priority forest alerts, recent investigations ticker, and quick-launch portals to specialized workspaces.
- **Controls**: Location search, ecosystem preset buttons, Quick 3D/2D switch, and critical alert notification bell.

### WORKSPACE 2: EARTH GLOBE (Route: `/globe` or `#globe`)
- **Purpose**: Immersive 3D geospatial exploration workspace.
- **Key Visual Elements**: Photorealistic 3D Earth globe with real day/night terminator, high-res texture basemaps, atmospheric scattering, cloud layer animation, deep space starfield, country boundaries, protected area polygons, fire hotspot pips, and satellite scene footprints.
- **Controls**: Camera fly-to, drag/orbit rotation, zoom, tilt, rotation speed toggle, coordinate inspector on click, GeoJSON layer overlay toggles.

### WORKSPACE 3: SATELLITES & MISSIONS (Route: `/satellites` or `#satellites`)
- **Purpose**: Searchable, verified spacecraft and mission explorer.
- **Grouping**:
  - *Optical Constellations*: Sentinel-2A/B (MSI 10m), Landsat 8/9 (OLI-2 30m), Terra/Aqua MODIS (250m).
  - *Synthetic Aperture Radar (SAR)*: Sentinel-1A/B (C-SAR 10m all-weather radar).
  - *Thermal & Active Fire*: Suomi NPP / NOAA-20/21 VIIRS (375m I-bands), MODIS thermal.
  - *Canopy Structure & Biomass Lidar*: ISS GEDI (25m waveform lidar).
  - *Precipitation Radar*: GPM Core Observatory (DPR/GMI 0.1° IMERG).
  - *Regional Earth Observation*: ISRO Resourcesat-2 (LISS-III / AWiFS), INSAT-3D/3DR (VHRR), Bhuvan WMS.
  - *Models & Reanalysis (Strictly separated from spacecraft)*: NASA POWER (0.5°), Open-Meteo ERA5, MERRA-2.
- **Mission Cards**: Sensor specifications, spatial/temporal resolution, historical coverage, authentication status, and direct launch buttons to view scene products.

### WORKSPACE 4: EARTH DATA LAYERS (Route: `/layers` or `#layers`)
- **Purpose**: Categorized map layer registry and overlay management.
- **Categories**:
  - *A. Satellite Imagery*: Sentinel-2 True Color, Sentinel-2 False Color, Landsat Surface Reflectance, NASA GIBS Terra/Aqua True Color, NASA VIIRS True Color.
  - *B. Spectral Indices*: NDVI (Canopy Greenness), NDMI (Canopy Moisture), NBR (Burn Ratio), NDWI (Surface Water), MODIS 8-day NDVI.
  - *C. Forest Cover & Disturbance*: Dynamic World Trees (10m), GFW Integrated Alerts, Hansen Tree Loss, GEDI Biomass Density (25m), Tree Cover Density 2000.
  - *D. Terrain*: SRTM Elevation (30m DEM), SRTM Slope, Aspect, Erosion Risk.
  - *E. Water & Hydrology*: JRC Global Surface Water Occurrence, NASA OPERA Dynamic Surface Water, CHIRPS Rainfall Raster.
  - *F. Climate*: MODIS Day LST (1km), MODIS Night LST (1km), NASA GPM IMERG Precipitation Rate, Surface Air Temp.
  - *G. Fire & Thermal*: NASA FIRMS NRT Active Fires, NASA VIIRS Thermal Anomalies, MODIS Burned Area.
  - *H. Human Pressure & Conservation*: Protected Planet WDPA Protected Areas, OpenStreetMap Roads & Trails, OpenStreetMap Settlements, WorldPop Population Density, Human Modification Index.
- **Controls**: Independent layer opacity slider, layer reordering, legend display, data freshness tag, and resolution badge.

### WORKSPACE 5: FOREST INTELLIGENCE (Route: `/forest` or `#forest`)
- **Purpose**: Deep biological and biophysical forest monitoring.
- **Capabilities Organized**: Forest Cover Monitoring, Vegetation Health, Deforestation Detection, Remote Change Analysis, Synchronized Before/After Split Comparison, Forest Fragmentation Metrics (Core/Edge/Perforation), Forest Digital Profile, Forest Time Machine, Recovery Intelligence, Carbon Loss Estimation.
- **Controls**: Date selector for before/after scenes, cloud screening slider (0-60%), forest type filter, and vegetation index mode.

### WORKSPACE 6: FIRE & HAZARD INTELLIGENCE (Route: `/hazards` or `#hazards`)
- **Purpose**: Active wildfire, thermal anomaly, and natural disaster management.
- **Capabilities Organized**: Active Fire Detections (FIRMS VIIRS), Fire Event Catalogue (EONET v3), Thermal Brightness Temperature, Fire Spread Risk Rating, Historical Fire Event Catalogue, Nearby Forest Vulnerability Index.
- **Controls**: Observation lookback window (24h, 48h, 7 days), confidence filter (nominal, high), satellite sensor toggle (VIIRS vs MODIS).

### WORKSPACE 7: CLIMATE & ENVIRONMENT (Route: `/environment` or `#environment`)
- **Purpose**: Weather intelligence, multi-decadal climatology, and soil health.
- **Capabilities Organized**: 7-Day Numerical Weather Forecast (Open-Meteo), 30-Day DOY Empirical Prediction (NASA POWER), Climatological Anomalies (temperature, precipitation), Drought & Water Stress, ISRIC SoilGrids 6-depth soil chemistry column (pH, SOC, Nitrogen, Texture).
- **Controls**: Variable selector, forecast horizon (1-30 days), unit toggles (°C/°F, mm/inches).

### WORKSPACE 8: AI INTELLIGENCE & FORESIGHT (Route: `/intelligence` or `#intelligence`)
- **Purpose**: Machine learning diagnostics, explainable AI, and ecological simulation.
- **Capabilities Organized**: AI Forest Doctor (probabilistic cause inference), Natural-Language Earth Query (`/api/query/live`), Environmental Anomaly Radar (IsolationForest multi-spectral anomaly vectors), Smart Warning System (0-100 evidence-weighted risk), Threat Prediction Engine (Holt-Winters trend projection with holdout MAE/RMSE), Threat Cascade Engine (DAG ecological domino simulation), What-If Environmental Simulator, Forest Resilience Index, AI Evidence Chain.
- **Controls**: Scenario sliders (e.g. +2°C warming, -30% rainfall, +50% logging pressure), prompt box for Earth Query, and evidence drill-down tabs.

### WORKSPACE 9: FIELD OPERATIONS (Route: `/operations` or `#operations`)
- **Purpose**: Ground ranger deployment, patrol routing, and emergency response.
- **Capabilities Organized**: Investigation / Patrol Route Optimizer (OSRM road & trail network routing), Waypoint Sequencing, Fuel & Distance Estimator, Protected Area Boundary Intersections, Intervention Task Engine, Recovery Exit Conditions, Dispatchable Field Alerts (WhatsApp/Email/SMS copyable templates).
- **Controls**: Max waypoints slider (1-10), transport mode (Vehicle / Foot Patrol), candidate disturbance point selection, and printable dispatch generator.

### WORKSPACE 10: ANALYTICS & COMPARISON (Route: `/analytics` or `#analytics`)
- **Purpose**: Multi-decadal mathematical statistics and regional benchmarking.
- **Capabilities Organized**: 120-Month Decadal Trend Engine (Mann-Kendall Tau, Sen's Slope with Gilbert 95% CIs, Yue-Pilon AR(1) pre-whitening), Regional Threat Comparison (multi-region side-by-side radar), Climate–Forest Correlation Matrix, Answers to NASA Space Apps Challenge #2 Questions, All 29 Indian States & UTs Rapid Scan.
- **Controls**: Variable selectors, significance threshold ($\alpha = 0.05, 0.01$), time span slider (2015–2024), region comparator builder.

### WORKSPACE 11: REPORTS & EVIDENCE (Route: `/reports` or `#reports`)
- **Purpose**: Scientific dossier generation, evidence auditing, and intelligence export.
- **Capabilities Organized**: Automatic Investigation Dossier (`/api/report/investigation`), PDF & HTML Export Engine, Data Provenance Citations, DOI References, Sensor Methodology Summaries, News & Media Intelligence (Google News RSS / GDELT).
- **Controls**: Export format (PDF, HTML, CSV, JSON), report title customization, section inclusion checkboxes.

### WORKSPACE 12: SYSTEM HEALTH & TELEMETRY (Route: `/system` or `#system`)
- **Purpose**: Full platform operational transparency and infrastructure telemetry.
- **Capabilities Organized**: Source Health Diagnostic Matrix (Copernicus, Earth Search, Planetary Computer, ASF Sentinel-1, Open-Meteo, MET Norway, NASA GIBS, NASA POWER, NASA EONET, SoilGrids, Protected Planet, NASA FIRMS, Google Earth Engine, Photon, Nominatim), Live Latency Monitor, Credential Manifest (masked safely), Fallback Architecture Readiness Map, Recent Failures Audit Log.
- **Controls**: `⚡ Run Live Health Probe` button, credential guide modal, latency threshold filter.

---

## 3. CONTEXT-SENSITIVE FILTER ARCHITECTURE

Instead of one giant control panel, each workspace provides its own tailored, capability-aware drawer:

| Workspace | Contextual Filters Displayed | Hidden / Excluded Controls |
|---|---|---|
| **Mission Control** | Selected ecosystem preset, quick layer view, location search | Deep date pickers, cloud thresholds, routing waypoints |
| **Satellites** | Mission category (Optical, SAR, Thermal), instrument, resolution | Weather forecasts, fire radius, patrol roads |
| **Earth Layers** | Layer category, opacity, date slider | Patrol routing, AI simulation knobs |
| **Forest** | Before/After date pickers, cloud threshold slider (0-60%), spectral mode (NDVI/NDMI/NBR) | OSRM road options, Mann-Kendall $\alpha$ level |
| **Hazards / Fire** | Lookback days (1-7d), confidence filter (nominal/high), sensor (VIIRS/MODIS) | Soil depth levels, cloud cover filters |
| **Climate** | Time range, forecast horizon (1-30d), meteorology variable (Temp, Rain, Wind, Soil) | Satellite orbit tracks, patrol waypoints |
| **AI Intelligence** | Scenario perturbation sliders ($\Delta T$, $\Delta \text{Rain}$, $\Delta \text{Log}$), query input | Raw raster opacity, OSRM routing |
| **Field Operations** | Max waypoints, transport mode (foot/vehicle), candidate cluster source | Spectral math formulas, decadal climate trends |
| **Analytics** | Statistical test ($\alpha$, pre-whitening), multi-region picker, trend variable | Live GPS pins, ranger alerts |

---

## 4. MAPPING OF ALL 37 CAPABILITIES TO WORKSPACES

| Capability ID & Name | Primary Workspace | Main API Endpoint(s) |
|---|---|---|
| 1. Real Satellite Monitoring | **WORKSPACE 3 (Satellites)** & **4 (Layers)** | `/api/satellite/latest`, `/api/map/satellite-layer` |
| 2. Forest Cover Monitoring | **WORKSPACE 5 (Forest)** | `/api/layers`, `/api/earth-engine/layer/dynamic_world_trees` |
| 3. AI Deforestation Detection | **WORKSPACE 5 (Forest)** & **8 (AI Intel)** | `/api/analysis/remote-change`, `/api/ai/change-model/status` |
| 4. Before–After Satellite Comparison | **WORKSPACE 5 (Forest)** | `/api/map/compare`, `/api/analysis/remote-change` |
| 5. Multi-Spectral Analysis | **WORKSPACE 4 (Layers)** & **5 (Forest)** | `/api/map/satellite-layer?mode=ndvi/ndmi/nbr/ndwi` |
| 6. Multi-Layer Earth Map | **WORKSPACE 2 (Globe)** & **4 (Layers)** | `/api/layers`, `/api/map/gfw-layer`, `/api/gibs/layer/{id}` |
| 7. Deep Region Investigation | **WORKSPACE 1 (Mission Control)** & **11 (Reports)** | `/api/investigate`, `/api/analysis/evidence-chain` |
| 8. Temperature Intelligence | **WORKSPACE 7 (Climate)** | `/api/weather`, `/api/climate/anomaly` |
| 9. Weather Intelligence | **WORKSPACE 7 (Climate)** | `/api/weather`, `/api/climate/forecast` |
| 10. Drought & Water Stress | **WORKSPACE 7 (Climate)** | `/api/climate/anomaly`, `/api/earth-engine/layer/jrc_water_occurrence` |
| 11. Fire & Heat Detection | **WORKSPACE 6 (Hazards)** | `/api/fire`, `/api/fire/intelligence`, `/api/eonet/events` |
| 12. Vegetation Health | **WORKSPACE 5 (Forest)** | `/api/analysis/vegetation-series` |
| 13. Environmental Anomaly Radar | **WORKSPACE 8 (AI Intel)** | `/api/intelligence/anomaly-radar`, `/api/analysis/remote-change` |
| 14. AI Forest Doctor | **WORKSPACE 8 (AI Intel)** | `/api/intelligence/forest-doctor`, `/api/intelligence/live` |
| 15. Smart Warning System | **WORKSPACE 1 (Mission Control)** & **8 (AI Intel)** | `/api/intelligence/risk`, `/api/intelligence/live` |
| 16. Threat Prediction | **WORKSPACE 8 (AI Intel)** | `/api/intelligence/predict-location` |
| 17. Threat Cascade Engine | **WORKSPACE 8 (AI Intel)** | `/api/intelligence/cascade`, `/api/intelligence/live` |
| 18. AI Priority Engine | **WORKSPACE 8 (AI Intel)** & **10 (Analytics)** | `/api/intelligence/compare-live` |
| 19. Investigation / Patrol Optimizer | **WORKSPACE 9 (Operations)** | `/api/patrol/live`, `/api/patrol/road-route` |
| 20. AI What-If Simulator | **WORKSPACE 8 (AI Intel)** | `/api/intelligence/what-if-location` |
| 21. Intervention Engine | **WORKSPACE 9 (Operations)** | `/api/intelligence/intervention`, `/api/intelligence/live` |
| 22. Recovery Intelligence | **WORKSPACE 5 (Forest)** | `/api/analysis/recovery-location` |
| 23. Recovery Exit Conditions | **WORKSPACE 5 (Forest)** & **9 (Operations)** | `/api/analysis/recovery-location` |
| 24. Forest Resilience Score | **WORKSPACE 8 (AI Intel)** | `/api/intelligence/resilience`, `/api/intelligence/live` |
| 25. Protected Area Intelligence | **WORKSPACE 4 (Layers)** & **9 (Operations)** | `/api/protected-area/context`, `/api/protected-areas` |
| 26. Forest Fragmentation Analysis | **WORKSPACE 5 (Forest)** | `/api/analysis/fragmentation` |
| 27. Carbon Loss Calculator | **WORKSPACE 5 (Forest)** | `/api/carbon`, `/api/analysis/evidence-chain` |
| 28. Climate–Forest Correlation | **WORKSPACE 10 (Analytics)** | `/api/analysis/climate-forest-correlation`, `/api/intelligence/correlation` |
| 29. AI Evidence Chain | **WORKSPACE 8 (AI Intel)** & **11 (Reports)** | `/api/analysis/evidence-chain` |
| 30. Explainable AI (XAI) | **WORKSPACE 8 (AI Intel)** | `/api/intelligence/risk`, `/api/analysis/evidence-chain` |
| 31. Natural-Language Earth Query | **WORKSPACE 8 (AI Intel)** | `/api/query/live` |
| 32. Automatic Investigation Report | **WORKSPACE 11 (Reports)** | `/api/report`, `/api/report/investigation` |
| 33. Regional Threat Comparison | **WORKSPACE 10 (Analytics)** | `/api/intelligence/compare-live`, `/api/earth/trends/compare` |
| 34. Forest Time Machine | **WORKSPACE 5 (Forest)** | `/api/time-machine` |
| 35. Live Command Center | **WORKSPACE 1 (Mission Control)** & **12 (System)** | `/api/health`, `/api/source-health`, `/api/fallbacks/status` |
| 36. Forest Digital Profile | **WORKSPACE 5 (Forest)** | `/api/forest-profile` |
| 37. News & Internet Intelligence | **WORKSPACE 11 (Reports)** | `/api/news` |
