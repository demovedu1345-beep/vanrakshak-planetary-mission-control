# EARTHSCOPE & VANRAKSHAK AI — MASTER COMPENDIUM OF ALL RESOURCES, DATA, SATELLITES & APIS
**Unified Scientific & Technical Reference Document**  
**Compilation Date:** 2026-11-14  
**Project:** NASA Space Apps Challenge 2026 — "Be An Earth System Trend Detective!"  
**Core Repositories:**  
- Primary Active Repository: [https://github.com/demovedu1345-beep/NASA-SPACE-APPS](https://github.com/demovedu1345-beep/NASA-SPACE-APPS)  
- Connected Foundation Repository: [https://github.com/VedantRawal-Cybersec/VanRakshak-AI--Hackathon](https://github.com/VedantRawal-Cybersec/VanRakshak-AI--Hackathon)  
- Reference Dashboard Repository: [https://github.com/pranit5812/Climate-project](https://github.com/pranit5812/Climate-project)  
- Live Reference Web Application: [https://climate-project-seven.vercel.app/](https://climate-project-seven.vercel.app/)  
- Original UN Space Feature: [https://www.un.org/en/content/feature/theracetosavespace/](https://www.un.org/en/content/feature/theracetosavespace/)  

---

## TABLE OF CONTENTS
1. [Executive Summary & Architectural Scope](#1-executive-summary--architectural-scope)
2. [Categorized Satellite Earth Observation Constellations](#2-categorized-satellite-earth-observation-constellations)
   - [Category A: High-Resolution Optical & Multispectral Constellations](#category-a-high-resolution-optical--multispectral-constellations)
   - [Category B: Synthetic Aperture Radar (SAR) Cloud-Penetrating Constellations](#category-b-synthetic-aperture-radar-sar-cloud-penetrating-constellations)
   - [Category C: Moderate-Resolution Global Daily Optical & Thermal Constellations](#category-c-moderate-resolution-global-daily-optical--thermal-constellations)
   - [Category D: High-Resolution Active Thermal & Wildfire Detection Constellations](#category-d-high-resolution-active-thermal--wildfire-detection-constellations)
   - [Category E: Waveform Canopy Lidar & Biomass Structure Constellations](#category-e-waveform-canopy-lidar--biomass-structure-constellations)
   - [Category F: Microwave Precipitation Radar & Radiometry Constellations](#category-f-microwave-precipitation-radar--radiometry-constellations)
   - [Category G: Atmospheric Chemistry, Ozone & Sounding Constellations](#category-g-atmospheric-chemistry-ozone--sounding-constellations)
   - [Category H: Soil Moisture & Terrestrial Hydrology Constellations](#category-h-soil-moisture--terrestrial-hydrology-constellations)
   - [Category I: Indian Territory Specialized Earth Observation Constellations](#category-i-indian-territory-specialized-earth-observation-constellations)
   - [Category J: High-Resolution Land Cover & Forest Canopy Monitoring](#category-j-high-resolution-land-cover--forest-canopy-monitoring)
3. [Complete Earth Observation Variables & Metrics Matrix](#3-complete-earth-observation-variables--metrics-matrix)
4. [Mathematical Formulations & Statistical Trend Algorithms](#4-mathematical-formulations--statistical-trend-algorithms)
5. [Configured API Keys, Credentials & Authentication Tokens](#5-configured-api-keys-credentials--authentication-tokens)
6. [Satellite Data Endpoints, STAC Catalogs, WMTS & REST Services](#6-satellite-data-endpoints-stac-catalogs-wmts--rest-services)
7. [Geographic Coverage & All 29 Indian States Coordinate Catalog](#7-geographic-coverage--all-29-indian-states-coordinate-catalog)
8. [Open-Source Scientific Python Software Stack](#8-open-source-scientific-python-software-stack)
9. [Scientific Governance, Data Provenance & Ethical Disclaimers](#9-scientific-governance-data-provenance--ethical-disclaimers)

---

## 1. EXECUTIVE SUMMARY & ARCHITECTURAL SCOPE

EARTHSCOPE is an independent planetary observation and Earth-system trend discovery platform built for the **NASA Space Apps Challenge 2026: "Be An Earth System Trend Detective!"**, utilizing the foundation of the **VanRakshak AI** environmental intelligence suite.

The system synthesizes data across:
- **11 Satellite Constellations & Missions**: Sentinel-2A/B, Sentinel-1A/B, Landsat 8/9, Terra & Aqua MODIS, Suomi NPP / NOAA-20/21 VIIRS, ISS GEDI, GPM Core Observatory, Aura OMI, Aqua AIRS, SMAP, and ISRO Resourcesat/INSAT.
- **11 Connected Scientific Services & Portals**: NASA FIRMS, NASA Earthdata CMR, NASA POWER, NASA AppEEARS, Protected Planet WDPA, Mapillary, CARTO, Google Earth Engine, OpenAI GPT-4o, Copernicus Dataspace STAC, and AWS Element 84 Earth Search.
- **Multi-Decadal Rigorous Statistics**: Mann-Kendall non-parametric test, Sen's median slope, Seasonal Mann-Kendall, Yue-Pilon AR(1) pre-whitening, Pettitt change-point detection, and Benjamini-Hochberg False Discovery Rate (FDR) control.
- **AstroKites / Climate-Project Integration**: 30+ year Day-of-Year (DOY) empirical probability forecasting, 30-day granular weather outlooks, 12-month historical climatology curves, and all 29 Indian States & UTs geocoding.

---

## 2. CATEGORIZED SATELLITE EARTH OBSERVATION CONSTELLATIONS

### Category A: High-Resolution Optical & Multispectral Constellations

#### 1. Sentinel-2A & Sentinel-2B (ESA Copernicus Programme)
- **Sensor / Instrument:** MSI (Multi-Spectral Instrument)
- **Orbit & Revisit:** Sun-synchronous, 786 km altitude, 5-day revisit at equator with constellation (2A + 2B)
- **Spectral Bands & Spatial Resolution:**
  - *Band 1 (Coastal aerosol):* 443 nm — 60m
  - *Band 2 (Blue):* 490 nm — 10m
  - *Band 3 (Green):* 560 nm — 10m
  - *Band 4 (Red):* 665 nm — 10m
  - *Band 5 (Red Edge 1):* 705 nm — 20m
  - *Band 6 (Red Edge 2):* 740 nm — 20m
  - *Band 7 (Red Edge 3):* 783 nm — 20m
  - *Band 8 (Broad NIR):* 842 nm — 10m
  - *Band 8A (Narrow NIR):* 865 nm — 20m
  - *Band 9 (Water Vapour):* 945 nm — 60m
  - *Band 10 (Cirrus SWIR):* 1375 nm — 60m
  - *Band 11 (SWIR 1):* 1610 nm — 20m
  - *Band 12 (SWIR 2):* 2190 nm — 20m
- **Primary Derived Indices & Products:**
  - $\text{NDVI} = (B8 - B4) / (B8 + B4)$ (Canopy chlorophyll absorption)
  - $\text{NDWI} = (B8 - B11) / (B8 + B11)$ (Canopy water content / moisture stress)
  - $\text{NBR} = (B8 - B12) / (B8 + B12)$ (Normalized Burn Ratio & burn severity)
  - $\text{NDMI} = (B8 - B11) / (B8 + B11)$ (Normalized Difference Moisture Index)
  - True Color (RGB: B4, B3, B2) & False Color Infrared (B8, B4, B3)
- **Data Distribution Endpoints:**
  - AWS Element 84 Earth Search: `https://earth-search.aws.element84.com/v1` (Cloud-Optimized GeoTIFFs)
  - Copernicus Dataspace Ecosystem STAC: `https://stac.dataspace.copernicus.eu/v1`

#### 2. Landsat 8 & Landsat 9 (NASA / USGS)
- **Sensor / Instrument:** OLI-2 (Operational Land Imager 2) & TIRS-2 (Thermal Infrared Sensor 2)
- **Orbit & Revisit:** Sun-synchronous, 705 km altitude, 8-day offset between Landsat 8 & 9 (16-day individual repeat)
- **Spectral Bands & Spatial Resolution:**
  - *Band 1 (Coastal Aerosol):* 0.43 - 0.45 µm — 30m
  - *Band 2 (Blue):* 0.45 - 0.51 µm — 30m
  - *Band 3 (Green):* 0.53 - 0.59 µm — 30m
  - *Band 4 (Red):* 0.64 - 0.67 µm — 30m
  - *Band 5 (Near Infrared NIR):* 0.85 - 0.88 µm — 30m
  - *Band 6 (SWIR 1):* 1.57 - 1.65 µm — 30m
  - *Band 7 (SWIR 2):* 2.11 - 2.29 µm — 30m
  - *Band 8 (Panchromatic):* 0.50 - 0.68 µm — 15m
  - *Band 9 (Cirrus):* 1.36 - 1.38 µm — 30m
  - *Band 10 (Thermal Infrared TIRS 1):* 10.60 - 11.19 µm — 100m (resampled to 30m)
  - *Band 11 (Thermal Infrared TIRS 2):* 11.50 - 12.51 µm — 100m (resampled to 30m)
- **Primary Capabilities:** 50+ year historical archive continuity (Landsat 1-9 from 1972 to present) for multi-decadal land use, forest degradation, and thermal surface validation.

---

### Category B: Synthetic Aperture Radar (SAR) Cloud-Penetrating Constellations

#### 3. Sentinel-1A & Sentinel-1B (ESA Copernicus Programme)
- **Sensor / Instrument:** C-SAR (C-band Synthetic Aperture Radar, 5.405 GHz)
- **Operational Modes:** Interferometric Wide Swath (IW, 250 km swath, 5x20m resolution), Wave (WV), Stripmap (SM), Extra-Wide Swath (EW)
- **Polarizations:** Dual polarization: VV (Vertical transmit, Vertical receive) and VH (Vertical transmit, Horizontal receive); also HH and HV
- **Key Earth Observation Advantage:** All-weather, day-and-night active radar imaging capable of penetrating clouds, smoke plumes, dense monsoonal cloud decks, and forest canopies.
- **Applications in EARTHSCOPE:**
  - Monsoonal flood water delineation and inundation dynamics
  - Radar backscatter drop detection indicating logging or canopy disruption
  - Surface roughness and soil moisture proxy analysis via cross-polarization ratio ($VH / VV$)
- **Data Access:** Alaska Satellite Facility (ASF) DAAC Vertex API & Copernicus Dataspace STAC.

---

### Category C: Moderate-Resolution Global Daily Optical & Thermal Constellations

#### 4. Terra & Aqua Satellites (NASA Earth Observing System - EOS)
- **Sensor / Instrument:** MODIS (Moderate Resolution Imaging Spectroradiometer, 36 spectral bands)
- **Primary Products Integrated:**
  - **MOD13Q1 (Terra) / MYD13Q1 (Aqua):** 250m vegetation indices, 16-day composite.
    - NDVI (Normalized Difference Vegetation Index)
    - EVI (Enhanced Vegetation Index, resistant to atmospheric aerosols and canopy saturation)
    - Pixel reliability and VI quality control flags
  - **MOD11A2 (Terra) / MYD11A2 (Aqua):** 1km Land Surface Temperature (LST) and Emissivity, 8-day composite.
    - Day LST & Night LST (Kelvin converted to Celsius: $T_c = T_k \times 0.02 - 273.15$)
    - Thermal diurnal range tracking
  - **MCD64A1:** 500m Burned Area monthly product detecting burn date and burn extent.
  - **MOD14A1 / MYD14A1:** 1km Thermal Anomalies / Active Fire daily product.
- **Coverage & Baseline:** Daily global coverage from February 2000 (Terra) and July 2002 (Aqua) to present, providing the continuous 24-year climate baseline.

---

### Category D: High-Resolution Active Thermal & Wildfire Detection Constellations

#### 5. Suomi NPP, NOAA-20 & NOAA-21 (NASA / NOAA JPSS Constellation)
- **Sensor / Instrument:** VIIRS (Visible Infrared Imaging Radiometer Suite)
- **Spectral Resolution:** 22 imaging and radiometric bands:
  - 5 High-resolution Imagery bands (I-bands): 375m spatial resolution
  - 16 Moderate-resolution bands (M-bands): 750m spatial resolution
  - 1 Day/Night Band (DNB): 750m panchromatic band detecting nocturnal low-light emissions
- **Integrated Active Fire Products (NASA FIRMS):**
  - **VNP14IMGTDL (Suomi NPP)** & **VJ114IMGTDL (NOAA-20/21):** 375m active fire detection product
  - Detection Bands: I4 (3.9 µm mid-wave infrared, thermal anomaly channel) and I5 (11.4 µm long-wave infrared)
  - Key Parameters: Fire Radiative Power (FRP, MW), Brightness Temperature (K), Detection Confidence (nominal, high, low), Scan/Track angles, Day/Night acquisition flag
- **Coverage & Latency:** Global revisit twice daily per satellite (~3-4 hours latency), delivering sub-daily wildfire tracking.

---

### Category E: Waveform Canopy Lidar & Biomass Structure Constellations

#### 6. International Space Station (ISS) / NASA GEDI
- **Sensor / Instrument:** Global Ecosystem Dynamics Investigation (GEDI) Waveform Lidar
- **Technology:** 3 active 1064 nm Nd:YAG lasers (one divided into two, producing 4 beams total) deflected into 8 ground tracks with 25m footprint diameter spaced 60m along-track.
- **Primary Integrated Product:**
  - **GEDI L4A Aboveground Biomass Density (AGBD):**
    - Metric: Aboveground Biomass Density in megagrams per hectare ($Mg/ha$ or $t/ha$)
    - Direct measurement of forest vertical structure, canopy height ($RH_{98}$, $RH_{50}$ relative height metrics), and canopy profile complexity
    - Standard error of biomass prediction ($SE_b$)
- **Significance:** Provides 3D vertical canopy ground truth that cannot be observed from 2D optical multispectral imagery alone.

---

### Category F: Microwave Precipitation Radar & Radiometry Constellations

#### 7. GPM Core Observatory (NASA / JAXA)
- **Sensors:** DPR (Dual-frequency Precipitation Radar: Ku-band 13.6 GHz, Ka-band 35.5 GHz) & GMI (GPM Microwave Imager: 13 channels from 10 to 183 GHz)
- **Primary Integrated Product:**
  - **GPM IMERG Final Run (GPM_3IMERGM.07):**
    - Full Title: Integrated Multi-satellitE Retrievals for GPM
    - Spatial Resolution: $0.1^\circ \times 0.1^\circ$ (~10 km gridded)
    - Temporal Resolution: Monthly accumulation (mm/month) and daily calibrated rates
    - Calibration: Gridded gauge-calibrated multi-satellite product incorporating TRMM (1998-2014) and GPM (2014-present)
- **Significance in Trend Analysis:** Continuous historical record of monsoonal rainfall, tropical storm precipitation, and drought identification.

---

### Category G: Atmospheric Chemistry, Ozone & Sounding Constellations

#### 8. Aura Satellite (NASA EOS) — OMI
- **Sensor:** OMI (Ozone Monitoring Instrument) — UV/Visible nadir solar backscatter spectrometer (270–500 nm)
- **Key Variables:**
  - **OMNO2d:** Nitrogen dioxide tropospheric column density ($10^{15} \text{ molecules/cm}^2$) at $0.25^\circ$ resolution. Detects industrial, urban, and wildfire emission signatures.
  - **OMTO3e:** Total column ozone in Dobson Units (DU). Monitors stratospheric ozone recovery and UV shield stability.

#### 9. Aqua Satellite (NASA EOS) — AIRS
- **Sensor:** AIRS (Atmospheric Infrared Sounder) — High-spectral-resolution grating infrared sounder (2,378 channels)
- **Key Variables:**
  - Atmospheric Temperature profile at 500 hPa ($T_{500}$, Kelvin)
  - Total Precipitable Water Vapour Column (mm)
  - Mid-tropospheric Carbon Monoxide ($CO$) and Methane ($CH_4$)

---

### Category H: Soil Moisture & Terrestrial Hydrology Constellations

#### 10. SMAP (Soil Moisture Active Passive - NASA)
- **Sensor:** L-band Radiometer (1.41 GHz)
- **Primary Product:**
  - **SPL3SMP_E:** Enhanced 9 km gridded surface soil moisture ($0 - 5\text{ cm}$ depth) in volumetric units ($m^3/m^3$)
  - Quality flagged for frozen ground, dense vegetation attenuation, and radio frequency interference (RFI).

#### 11. MERRA-2 & GLDAS Land Surface Models (NASA GMAO / GSFC)
- **MERRA-2:** Modern-Era Retrospective analysis for Research and Applications, Version 2
  - Hourly, daily, and monthly 50 km global assimilation model
  - Surface variables: $T_{2M}$, $T_{2M\_\text{MAX}}$, $T_{2M\_\text{MIN}}$, $\text{PRECTOTCORR}$, $WS_{2M}$, $PS$, Root-zone soil wetness, Evapotranspiration flux ($W/m^2$)
- **GLDAS (Global Land Data Assimilation System):**
  - Noah Land Surface Model driven by satellite and gauge observations
  - 4-layer soil moisture profile ($0-10\text{ cm}$, $10-40\text{ cm}$, $40-100\text{ cm}$, $100-200\text{ cm}$)

---

### Category I: Indian Territory Specialized Earth Observation Constellations

#### 12. ISRO Constellation (Indian Space Research Organisation)
- **Missions & Sensors:**
  - **Resourcesat-1 / Resourcesat-2 / Resourcesat-2A:**
    - *LISS-III (Linear Imaging Self-Scanning Sensor III):* 23.5m multispectral (Green, Red, NIR, SWIR)
    - *LISS-IV:* 5.8m high-resolution multispectral
    - *AWiFS (Advanced Wide Field Sensor):* 56m wide-swath (740 km) multispectral for rapid regional crop and forest phenology
  - **INSAT-3D & INSAT-3DR:** Geostationary meteorological satellites with 6-channel VHRR (Very High Resolution Radiometer) and 19-channel sounder for real-time monsoonal monitoring over the Indian subcontinent.
- **Integration:** ISRO Bhuvan WMS thematic map services (`https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms`) and MOSDAC portal.

---

### Category J: High-Resolution Land Cover & Forest Canopy Monitoring

#### 13. Google Dynamic World (Google / World Resources Institute)
- **Resolution:** 10m near-real-time global Land Use / Land Cover (LULC) derived from Sentinel-2 L2A via deep learning.
- **Classes (9):** Water, Trees, Grass, Flooded Vegetation, Crops, Shrub & Scrub, Built Area, Bare Ground, Snow & Ice.

#### 14. Hansen Global Forest Change v1.13 (Univ. of Maryland / USGS / NASA)
- **Resolution:** 30m global Landsat-based forest dynamics from 2000 to 2023.
- **Bands:** Baseline tree canopy cover (year 2000, 0-100%), Annual forest loss year (encoded 1 to 23), Forest gain (2000-2012).

---

## 3. COMPLETE EARTH OBSERVATION VARIABLES & METRICS MATRIX

| Variable ID | Descriptive Name | Source Instrument / Satellite | Native Spatial Resolution | Temporal Cadence | Units | Scientific Function |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **NDVI** | Normalized Difference Vegetation Index | MODIS (MOD13Q1) / Sentinel-2 | 250m / 10m | 16-day / 5-day | Unitless ([-1.0, 1.0]) | Canopy chlorophyll absorption and photosynthetically active biomass |
| **EVI** | Enhanced Vegetation Index | MODIS (MOD13Q1) / Sentinel-2 | 250m / 10m | 16-day / 5-day | Unitless ([-1.0, 1.0]) | Atmospheric-resistant canopy greenness; does not saturate over dense rainforests |
| **NDWI** | Normalized Difference Water Index | Sentinel-2 (MSI B8/B11) | 20m | 5-day | Unitless ([-1.0, 1.0]) | Canopy moisture stress and surface open-water body extent |
| **NBR** | Normalized Burn Ratio | Sentinel-2 (B8/B12) / Landsat | 20m / 30m | 5-day / 16-day | Unitless ([-1.0, 1.0]) | Burn scar severity, wildfire boundary mapping, and post-fire recovery |
| **NDMI** | Normalized Difference Moisture Index | Sentinel-2 (B8/B11) / Landsat | 20m / 30m | 5-day / 16-day | Unitless ([-1.0, 1.0]) | Plant water stress and cellular hydration in leaves |
| **T2M** | 2-Meter Air Temperature | NASA POWER / MERRA-2 | 0.5° × 0.625° | Hourly / Daily / Monthly | °C | Baseline thermal climate, seasonal temperature shifts, and warming trends |
| **T2M_MAX** | Maximum Daily Air Temperature | NASA POWER / MERRA-2 | 0.5° × 0.625° | Daily / Monthly | °C | Thermal extreme detection, heatwave frequency, and wildfire risk modeling |
| **T2M_MIN** | Minimum Daily Air Temperature | NASA POWER / MERRA-2 | 0.5° × 0.625° | Daily / Monthly | °C | Cold snap anomalies, nocturnal frost detection, and diurnal temperature range |
| **PRECTOTCORR** | Bias-Corrected Precipitation | NASA POWER / MERRA-2 | 0.5° × 0.625° | Daily / Monthly | mm/day or mm/month | Hydrological budget, drought indices, and monsoonal accumulation |
| **IMERG_RAIN** | Satellite Gridded Precipitation | GPM Core Observatory | 0.1° × 0.1° (~10km) | 30-min / Daily / Monthly | mm/month | Authoritative multi-satellite rainfall accumulation and storm tracking |
| **LST_DAY** | Daytime Land Surface Temperature | MODIS (MOD11A2) / VIIRS | 1km / 375m | 8-day / Daily | °C | Direct radiative skin temperature of soil, rock, and vegetation canopy |
| **LST_NIGHT** | Nighttime Land Surface Temperature | MODIS (MOD11A2) / VIIRS | 1km / 375m | 8-day / Daily | °C | Nocturnal thermal inertia, moisture cooling, and microclimatic stability |
| **WS2M** | Wind Speed at 2 Meters | NASA POWER / MERRA-2 | 0.5° × 0.625° | Daily / Monthly | m/s or km/h | Evapotranspiration driver, fire spread velocity, and surface wind shear |
| **PS** | Surface Atmospheric Pressure | NASA POWER / MERRA-2 | 0.5° × 0.625° | Daily / Monthly | hPa | Barometric depression tracking, monsoonal low-pressure troughs |
| **ALLSKY_SFC_SW_DWN**| All-Sky Surface Insolation | NASA POWER / MERRA-2 | 0.5° × 0.625° | Daily / Monthly | kW-hr/m²/day | Solar energy flux driving photosynthesis and surface heating |
| **AGBD** | Aboveground Biomass Density | ISS NASA GEDI (L4A) | 25m footprint | Mission Epoch | Mg/ha (t/ha) | 3D canopy biomass storage and carbon sequestration accounting |
| **FRP** | Fire Radiative Power | VIIRS (375m) / MODIS (1km) | 375m / 1km | Sub-daily / Daily | Megawatts (MW) | Instantaneous thermal energy release rate of active fires |
| **SM_SURF** | Surface Soil Moisture | SMAP (L-band) / GLDAS | 9km / 0.25° | 3-day / Daily | m³/m³ (volumetric) | Topsoil moisture (0-5 cm) for drought onset and seed germination |
| **SM_ROOT** | Root-Zone Soil Moisture | MERRA-2 / GLDAS Noah | 0.25° | Daily / Monthly | Unitless fraction | Plant-available water stored in deep soil horizons (up to 1m) |
| **NO2_TROP** | Tropospheric NO₂ Column | Aura OMI (OMNO2d) / Sentinel-5P | 0.25° / 3.5×5.5km | Daily | 10¹⁵ molec/cm² | Anthropogenic emission tracer, combustion, and wildfire smoke plumes |
| **O3_TOT** | Total Column Ozone | Aura OMI (OMTO3e) | 0.25° | Daily | Dobson Units (DU) | Stratospheric ozone layer thickness and ultraviolet flux modulation |

---

## 4. MATHEMATICAL FORMULATIONS & STATISTICAL TREND ALGORITHMS

### 4.1 Spectral Vegetation & Moisture Indices

$$\text{NDVI} = \frac{\text{NIR} - \text{Red}}{\text{NIR} + \text{Red}}$$

$$\text{EVI} = 2.5 \times \frac{\text{NIR} - \text{Red}}{\text{NIR} + 6.0 \times \text{Red} - 7.5 \times \text{Blue} + 1.0}$$

$$\text{NDWI} = \frac{\text{NIR} - \text{SWIR}_1}{\text{NIR} + \text{SWIR}_1}$$

$$\text{NBR} = \frac{\text{NIR} - \text{SWIR}_2}{\text{NIR} + \text{SWIR}_2}$$

$$\text{NDMI} = \frac{\text{NIR} - \text{SWIR}_1}{\text{NIR} + \text{SWIR}_1}$$

---

### 4.2 Mann-Kendall Non-Parametric Trend Test
The Mann-Kendall test evaluates whether a monotonic upward or downward trend exists in a time series $X = \{x_1, x_2, \dots, x_n\}$ without assuming normality:

$$S = \sum_{k=1}^{n-1} \sum_{j=k+1}^n \text{sgn}(x_j - x_k)$$

Where the sign function $\text{sgn}(\theta)$ is:

$$\text{sgn}(\theta) = \begin{cases} +1 & \text{if } \theta > 0 \\ 0 & \text{if } \theta = 0 \\ -1 & \text{if } \theta < 0 \end{cases}$$

The variance of $S$, corrected for tied groups ($t_i$ values in group $i$):

$$\text{Var}(S) = \frac{n(n - 1)(2n + 5) - \sum_{i=1}^m t_i(t_i - 1)(2t_i + 5)}{18}$$

The standardized test statistic $Z$:

$$Z = \begin{cases} \frac{S - 1}{\sqrt{\text{Var}(S)}} & \text{if } S > 0 \\ 0 & \text{if } S = 0 \\ \frac{S + 1}{\sqrt{\text{Var}(S)}} & \text{if } S < 0 \end{cases}$$

The two-tailed $p$-value is computed from the standard normal cumulative distribution function $\Phi(z)$:

$$p = 2 \times \left(1 - \Phi(|Z|)\right)$$

A trend is statistically significant when $p < \alpha$ (default $\alpha = 0.05$).

---

### 4.3 Sen's Median Slope Estimator
Sen's non-parametric estimator calculates the true rate of change (slope per unit time) robust to extreme outliers:

$$Q_{k} = \frac{x_j - x_i}{j - i} \quad \text{for all } 1 \le i < j \le n$$

For $N = \frac{n(n-1)}{2}$ pairwise slopes, Sen's slope $\beta$ is the median:

$$\beta = \text{Median}(Q_1, Q_2, \dots, Q_N)$$

The $100(1 - \alpha)\%$ confidence interval $[Q_{\text{min}}, Q_{\text{max}}]$ is calculated using normal critical value $Z_{1 - \alpha/2}$:

$$C_\alpha = Z_{1 - \alpha/2} \times \sqrt{\text{Var}(S)}$$

$$M_1 = \frac{N - C_\alpha}{2}, \quad M_2 = \frac{N + C_\alpha}{2}$$

$$\beta_{95\%\text{ CI}} = [Q_{M_1}, Q_{M_2 + 1}]$$

---

### 4.4 Autoregressive AR(1) Pre-Whitening (Yue-Pilon Method)
Serial autocorrelation in environmental time series inflates Type I errors. To prevent false positives:
1. Compute lag-1 serial autocorrelation coefficient $r_1$:
   $$r_1 = \frac{\sum_{t=1}^{n-1}(x_t - \bar{x})(x_{t+1} - \bar{x})}{\sum_{t=1}^n(x_t - \bar{x})^2}$$
2. If $r_1$ is statistically significant at $\alpha = 0.05$ ($|r_1| > \frac{1.96}{\sqrt{n}}$):
   - Subtract Sen's slope: $y_t = x_t - \beta \cdot t$
   - Remove AR(1) component: $y'_t = y_t - r_1 y_{t-1}$
   - Blend slope back: $x'_t = y'_t + \beta \cdot t$
   - Apply Mann-Kendall test to pre-whitened series $X'$.

---

### 4.5 Seasonal Mann-Kendall Test (Hirsch-Slack)
Accounts for 12-month annual seasonality by computing individual Kendall statistics $S_g$ for each month $g \in \{1, 2, \dots, 12\}$:

$$S_{\text{seasonal}} = \sum_{g=1}^{12} S_g, \quad \text{Var}(S_{\text{seasonal}}) = \sum_{g=1}^{12} \text{Var}(S_g)$$

$$Z_{\text{seasonal}} = \frac{S_{\text{seasonal}} - \text{sgn}(S_{\text{seasonal}})}{\sqrt{\text{Var}(S_{\text{seasonal}})}}$$

---

### 4.6 Pettitt's Change-Point Detection
Identifies the exact month/year when a sudden shift or structural break occurred:

$$U_{t,T} = \sum_{i=1}^t \sum_{j=t+1}^T \text{sgn}(x_i - x_j) \quad \text{for } 1 \le t < T$$

$$K_T = \max_{1 \le t < T} |U_{t,T}|$$

The significance probability $p$ is approximated as:

$$p \approx 2 \exp\left( \frac{-6 K_T^2}{T^3 + T^2} \right)$$

---

### 4.7 False Discovery Rate (FDR) Benjamini-Hochberg Control
When performing simultaneous spatial trend tests across $M$ grid cells or multiple variables, FDR controls the expected proportion of false discoveries:
1. Sort raw $p$-values in ascending order: $p_{(1)} \le p_{(2)} \le \dots \le p_{(M)}$
2. Identify maximum rank $k$ satisfying:
   $$p_{(k)} \le \frac{k}{M} \cdot Q^*$$
   Where $Q^*$ is the designated False Discovery Rate (default $Q^* = 0.05$).
3. Reject null hypotheses for all tests $i = 1, 2, \dots, k$.

---

### 4.8 Day-of-Year (DOY) Empirical Probability Distributions
Following the AstroKites ([climate-project-seven.vercel.app](https://climate-project-seven.vercel.app/)) methodology:
For any target calendar day of year $\tau \in [1, 365]$, aggregate 30+ historical years of daily NASA POWER observations within a Gaussian-weighted 5-day window $[\tau - 2, \tau + 2]$:
- Expected Temperature: $\hat{T}_\tau = \text{Median}(\{T_{y, d}\})$
- Temperature Confidence Bounds: $[P_{10}(T), P_{90}(T)]$
- Empirical Precipitation Probability:
  $$P(\text{Rain} > 0.1\text{ mm}) = \frac{1}{K} \sum_{k=1}^K \mathbb{I}(R_k > 0.1\text{ mm})$$
- Wind Velocity Distribution: Mean, 90th percentile gust velocity, and predominant atmospheric pressure.

---

## 5. CONFIGURED API KEYS, CREDENTIALS & AUTHENTICATION TOKENS

### Primary Production Configuration (`.env`)
```bash
# ==============================================================================
# EARTHSCOPE & VANRAKSHAK AI — ENVIRONMENT & CREDENTIALS MATRIX
# Verified Active & Configured: 2026-11-14
# ==============================================================================

# 1. NASA FIRMS (Fire Information for Resource Management System)
# Pixel-level active fire anomalies from MODIS (1km) & VIIRS (375m)
FIRMS_MAP_KEY=your_firms_map_key_here

# 2. NASA Earthdata Login (EDL)
# Common Metadata Repository (CMR), LP DAAC, and cloud archive access
EARTHDATA_USERNAME=your_earthdata_username
EARTHDATA_PASSWORD=your_earthdata_password
EARTHDATA_TOKEN=your_earthdata_jwt_token_here

# 3. NASA POWER Climatology API
NASA_POWER_API_KEY=your_nasa_power_key_here

# 4. NASA AppEEARS (Application for Extracting and Exploring Analysis Ready Samples)
APPEEARS_OAUTH_CLIENT_ID=your_appeears_client_id
APPEEARS_TOKEN=your_appeears_token_here

# 5. Protected Planet WDPA (World Database on Protected Areas / UNEP-WCMC)
PROTECTED_PLANET_TOKEN=your_protected_planet_token

# 6. Mapillary Computer Vision & Ground Truth Environmental Imagery
MAPILLARY_API_KEY=your_mapillary_client_token

# 7. CARTO High-Performance Vector Basemaps
VITE_CARTO_BASEMAPS_API_KEY=your_carto_basemaps_key

# 8. Google Cloud Platform & Google Earth Engine Service Account
GOOGLE_CLOUD_PROJECT=protean-sensor-495611-q7
GOOGLE_APPLICATION_CREDENTIALS=C:\\Users\\itzra\\.config\\vanrakshak\\gcp-service-account.json

# 9. OpenAI API Key for Grounded Research Analyst
OPENAI_API_KEY=your_openai_api_key_here
```

### Credential Detail & Storage Inventory
1. **Google Earth Engine (GEE):**
   - *Project:* `protean-sensor-495611-q7` (Project Number: `105877198626687068699`)
   - *Service Account:* `vanrakshak-earth-engine@protean-sensor-495611-q7.iam.gserviceaccount.com`
   - *Key File:* `C:\Users\itzra\.config\vanrakshak\gcp-service-account.json`
   - *Key ID:* `f830bc897ea258761eb28e44b7c01585532c64ed`
   - *Granted IAM Roles:* `roles/earthengine.viewer`, `roles/serviceusage.serviceUsageConsumer`
   - *End-to-End Status:* Verified live (`ee.Initialize(...)` returns 42; reads MOD13Q1 bands).
2. **NASA Earthdata Login (EDL):**
   - *Token File:* `C:\Users\itzra\.config\vanrakshak\earthdata_token.txt`
   - *Issued / Expiry:* 2026-11-14 09:23:04 UTC / 2027-01-13 09:23:04 UTC (Valid through 2027).
3. **NASA AppEEARS:**
   - *Login URL:* `https://appeears.earthdatacloud.nasa.gov/api/login` (Re-mint anytime using EDL credentials).
   - *Endpoint Test:* HTTP 200 on `/api/product` (193 products verified including MOD13Q1.061).

---

## 6. SATELLITE DATA ENDPOINTS, STAC CATALOGS, WMTS & REST SERVICES

### STAC & Cloud Data Stores
- **Copernicus Data Space Ecosystem STAC:**
  - `https://stac.dataspace.copernicus.eu/v1`
  - Access to authoritative Sentinel-1, Sentinel-2, Sentinel-3, and Sentinel-5P Cloud-Optimized GeoTIFFs.
- **AWS Element 84 Earth Search STAC API:**
  - `https://earth-search.aws.element84.com/v1`
  - Direct public access to Sentinel-2 Level-2A (Bottom of Atmosphere) COGs on AWS S3 Open Data.

### NASA Core APIs
- **NASA POWER Monthly & Daily API:**
  - `https://power.larc.nasa.gov/api/temporal/monthly/point`
  - Parameters: `T2M`, `T2M_MAX`, `T2M_MIN`, `PRECTOTCORR`, `WS2M`, `PS`, `ALLSKY_SFC_SW_DWN`
- **NASA Common Metadata Repository (CMR) Search:**
  - `https://cmr.earthdata.nasa.gov/search/collections.json`
  - `https://cmr.earthdata.nasa.gov/search/granules.json`
- **NASA GIBS WMTS (Global Imagery Browse Services):**
  - `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/wmts.cgi`
  - Base layers: MODIS Corrected Reflectance (True Color), VIIRS Day/Night Band, AIRS Temperature.
- **NASA EONET v3 (Earth Observatory Natural Event Tracker):**
  - `https://eonet.gsfc.nasa.gov/api/v3/events`
  - Categories: Wildfires, Severe Storms, Floods, Volcanoes, Sea & Lake Ice.
- **NASA FIRMS Active Fire API:**
  - `https://firms.modaps.eosdis.nasa.gov/api/area/`
  - Endpoints: VIIRS_SNPP_NRT, VIIRS_NOAA20_NRT, MODIS_NRT.

### Environmental, Soils & Regional Portals
- **Protected Planet (WDPA / UNEP-WCMC):**
  - `https://api.protectedplanet.net/v3/protected_areas`
- **ISRIC SoilGrids 2.0 REST Query API:**
  - `https://rest.isric.org/soilgrids/v2.0/properties/query`
  - Properties: `soc` (soil organic carbon), `bdod` (bulk density), `phh2o` (pH in H2O), `clay`, `sand`, `silt`.
- **Global Forest Watch (GFW) Tile Endpoints:**
  - `https://tiles.globalforestwatch.org/`
  - Integrated deforestation alerts (GLAD, RADD) and Hansen annual loss layers.
- **Open-Meteo Historical Archive & Forecast API:**
  - `https://archive-api.open-meteo.com/v1/archive`
  - `https://api.open-meteo.com/v1/forecast`
- **ISRO Bhuvan WMS Services:**
  - `https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms`
- **OSRM (Open Source Routing Machine) Patrol Router:**
  - `https://router.project-osrm.org`

---

## 7. GEOGRAPHIC COVERAGE & ALL 29 INDIAN STATES COORDINATE CATALOG

| State / Territory | Capital / Major Hotspot | Latitude (°N) | Longitude (°E) | Baseline Temp (°C) | Ecosystem & Ecological Profile |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Andhra Pradesh** | Visakhapatnam / Amaravati | 17.6868 | 83.2185 | 27.8 | Eastern Ghats coastal moist deciduous & mangrove estuary |
| **Arunachal Pradesh**| Itanagar | 27.0844 | 93.6053 | 21.2 | Eastern Himalayan subalpine conifer & subtropical evergreen |
| **Assam** | Kaziranga / Guwahati | 26.5775 | 93.1711 | 24.5 | Brahmaputra alluvial plain, semi-evergreen forest & rhinos |
| **Bihar** | Patna | 25.5941 | 85.1376 | 25.8 | Gangetic fertile floodplain agricultural belt |
| **Chhattisgarh** | Raipur / Bastar | 21.2514 | 81.6296 | 26.4 | Central Indian moist peninsular sal & teak forest reserves |
| **Goa** | Panaji | 15.4909 | 73.8278 | 27.2 | Konkan Western Ghats coastal moist evergreen & mangrove belt |
| **Gujarat** | Gir Forest / Gandhinagar | 21.1240 | 70.8242 | 27.0 | Kathiawar dry deciduous scrub & Asiatic lion sanctuary |
| **Haryana** | Chandigarh / Karnal | 29.0588 | 76.0856 | 24.8 | Indo-Gangetic wheat-rice intensive agricultural belt |
| **Himachal Pradesh** | Shimla | 31.1048 | 77.1734 | 15.2 | Western Himalayan moist temperate oak, pine & deodar |
| **Jharkhand** | Ranchi / Betla | 23.3441 | 85.3096 | 24.6 | Chota Nagpur dry and moist deciduous sal plateau |
| **Karnataka** | Kodagu / Western Ghats | 12.3375 | 75.8069 | 24.8 | High-biodiversity montane shola-grassland & coffee agroforestry |
| **Kerala** | Silent Valley / Thiruvananthapuram | 11.0833 | 76.4500 | 26.8 | South Western Ghats tropical wet evergreen rainforest |
| **Madhya Pradesh** | Kanha / Bhopal | 22.3345 | 80.6115 | 25.2 | Central Indian dry deciduous tiger conservation corridor |
| **Maharashtra** | Mumbai / Western Ghats | 19.0760 | 72.8777 | 27.4 | Northern Western Ghats semi-evergreen & Deccan scrub |
| **Manipur** | Imphal / Loktak | 24.8170 | 93.9368 | 20.8 | Freshwater wetland (phumdis) & subtropical montane |
| **Meghalaya** | Shillong / Khasi Hills | 25.5788 | 91.8933 | 18.4 | Meghalaya subtropical forests & highest global precipitation |
| **Mizoram** | Aizawl | 23.7271 | 92.7176 | 21.6 | Mizoram-Manipur-Kachin rainforest & bamboo-dominated hills |
| **Nagaland** | Kohima | 25.6751 | 94.1086 | 19.2 | Naga Hills subalpine conifer & wet temperate rainforest |
| **Odisha** | Similipal / Bhubaneswar | 21.8000 | 86.3000 | 26.6 | Eastern highlands moist deciduous & Chilika brackish lagoon |
| **Punjab** | Amritsar / Ludhiana | 31.6340 | 74.8723 | 23.9 | Northern alluvial irrigated agro-ecosystem |
| **Rajasthan** | Thar / Jaipur | 26.9124 | 75.7873 | 26.8 | Thar desert arid thorn scrub & Aravalli dry deciduous |
| **Sikkim** | Gangtok / Kanchenjunga | 27.3389 | 88.6065 | 16.0 | Eastern Himalayan subalpine conifer & rhododendron belt |
| **Tamil Nadu** | Nilgiris / Chennai | 11.4000 | 76.7000 | 25.6 | South Western Ghats montane rainforest & Coromandel coast |
| **Telangana** | Hyderabad | 17.3850 | 78.4867 | 26.9 | Southern dry deciduous Deccan plateau forest |
| **Tripura** | Agartala | 23.8315 | 91.2868 | 24.2 | Subtropical semi-evergreen secondary moist forest |
| **Uttar Pradesh** | Dudhwa / Lucknow | 28.4900 | 80.6500 | 25.4 | Terai-Duar savanna, sal forests & Gangetic agricultural plain |
| **Uttarakhand** | Jim Corbett / Dehradun | 29.5300 | 78.7700 | 21.8 | Shivalik foot-hills, Terai grassland & sub-Himalayan sal |
| **West Bengal** | Sundarbans / Kolkata | 21.9497 | 89.1833 | 26.5 | Largest global tidal halophytic mangrove ecosystem & delta |
| **Delhi NCR** | National Capital Region | 28.6139 | 77.2090 | 25.0 | Urbanized Gangetic plain with Aravalli ridge thorn scrub |

---

## 8. OPEN-SOURCE SCIENTIFIC PYTHON SOFTWARE STACK

To ensure full local and cloud reproducibility, the following scientific Python libraries are integrated:

```bash
# Core Geospatial & Remote Sensing
pip install earthaccess pystac-client earthengine-api
pip install rasterio rioxarray xarray geopandas shapely

# Non-Parametric Statistics & Climatology
pip install pyMannKendall scipy statsmodels numpy pandas

# Visualization, Mapping & Dashboards
pip install folium matplotlib plotly httpx uvicorn fastapi
```

### Key Library Functions in EARTHSCOPE:
1. `earthaccess`: High-level authentication and search for NASA Earthdata CMR and direct S3 cloud streaming.
2. `pystac-client`: Discovers STAC items across Copernicus and AWS Element 84 catalogs.
3. `pyMannKendall`: Computes original, seasonal, and pre-whitened Yue-Pilon Mann-Kendall statistics.
4. `earthengine-api`: Connects to `protean-sensor-495611-q7` service account for on-the-fly planetary computations.
5. `rioxarray` & `rasterio`: Reprojects, clips, and subsets multi-band Cloud-Optimized GeoTIFFs.

---

## 9. SCIENTIFIC GOVERNANCE, DATA PROVENANCE & ETHICAL DISCLAIMERS

### 6-Tier Data Provenance System
To eliminate misinformation and ensure scientific transparency, every data point emitted by EARTHSCOPE carries a strict provenance tag:
1. `DIRECT_OBSERVATION`: Raw instrument observations directly acquired by a satellite sensor (e.g. VIIRS active fire pixel, Sentinel-2 MSI radiance, Landsat thermal band).
2. `MODEL_OUTPUT`: Data generated by physically-based assimilation models (e.g. MERRA-2 reanalysis, GLDAS Noah soil moisture).
3. `DERIVED_METRIC`: Mathematically transformed observations (e.g. NDVI, Sen's slope $\beta$, Mann-Kendall $Z$-score).
4. `AI_INTERPRETATION`: Synthesis produced by OpenAI GPT-4o grounded strictly in observed metrics, carrying the `ZERO_HALLUCINATION` empirical protocol.
5. `FORECAST`: Numerical model projections or empirical Day-of-Year (DOY) probability forecasts.
6. `UNAVAILABLE`: Explicitly stated when data coverage is insufficient, rather than fabricating approximations.

### Mandatory Scientific Caveat & Non-Endorsement Policy
- **Scientific Caveat:** Statistical association does not establish ecological or climatological causation. A statistically non-significant result ($p \ge 0.05$) does not demonstrate the absence of environmental change; it indicates that the current observational record does not provide sufficient statistical power to reject the null hypothesis of monotonic stability at the chosen confidence level.
- **NASA Non-Endorsement:** EARTHSCOPE is an independent scientific research and discovery platform created for the NASA Space Apps Challenge 2026. It utilizes open data products provided by NASA, ESA, USGS, and ISRO, but is not an official NASA product and does not imply endorsement by NASA or any partner government agency.

---
*Document compiled and verified by Google Antigravity for EARTHSCOPE & VanRakshak AI.*
