# EARTHSCOPE — DATA PROVENANCE, COLLECTIONS & OFFICIAL CITATIONS
## NASA Space Apps Challenge 2026 | Challenge 02: "Be An Earth System Trend Detective!"

---

## 1. OFFICIAL NASA DATASETS INVENTORY

EARTHSCOPE exclusively utilizes official, verifiable NASA Earth science data collections hosted by official Distributed Active Archive Centers (DAACs):

### 1.1 MODIS Vegetation Indices (NDVI & EVI)
- **Product ID:** `MOD13A3.061` (Terra) & `MYD13A3.061` (Aqua)
- **Responsible DAAC:** NASA Land Processes DAAC (LP DAAC)
- **DOI:** [10.5067/MODIS/MOD13A3.061](https://doi.org/10.5067/MODIS/MOD13A3.061)
- **Spatial Resolution:** 1 km (L3 Global Grid)
- **Temporal Resolution:** Monthly composite
- **Physical Parameter:** Normalized Difference Vegetation Index (NDVI) & Enhanced Vegetation Index (EVI)
- **Valid Data Range:** $-0.2000$ to $+1.0000$ (dimensionless)
- **Scaling Factor:** $0.0001$ applied to raw 16-bit signed integer
- **Fill Value:** $-3000$ (unprocessed/ocean)
- **Quality Flags:** MODIS QA band bits 0–1 (`00` = VI produced with good quality, `01` = VI produced with check other QA).
- **Physical Interpretation:** NDVI measures relative chlorophyll absorption in the red band vs reflectance in the near-infrared band. It is a proxy for canopy greenness and photosynthetic vigor, *not* a direct count of trees or biomass.

---

### 1.2 NASA Global Precipitation Measurement (GPM)
- **Product ID:** `GPM_3IMERGM.06` (IMERG Final Run)
- **Responsible DAAC:** NASA Goddard Earth Sciences Data and Information Services Center (GES DISC)
- **DOI:** [10.5067/GPM/IMERG/3B-MONTH/06](https://doi.org/10.5067/GPM/IMERG/3B-MONTH/06)
- **Spatial Resolution:** 0.1° $\times$ 0.1° (~10 km)
- **Temporal Resolution:** Monthly accumulation
- **Physical Parameter:** Monthly total precipitation (`precipitation` in mm/month)
- **Valid Data Range:** $0.0$ to $3000.0\text{ mm/month}$
- **Fill Value:** $-9999.9$
- **Calibration:** Multi-satellite precipitation estimation combined with GPCC monthly gauge calibration.

---

### 1.3 NASA Global Land Data Assimilation System (GLDAS)
- **Product ID:** `GLDAS_NOAH025_M.2.1` (Noah Land Surface Model L4)
- **Responsible DAAC:** NASA GES DISC
- **DOI:** [10.5067/SXAVCZFAQLNO](https://doi.org/10.5067/SXAVCZFAQLNO)
- **Spatial Resolution:** 0.25° $\times$ 0.25° (~25 km)
- **Temporal Resolution:** Monthly average
- **Physical Parameter:** Root-Zone Soil Moisture (`RootMoist_inst` / `GWETROOT`, fraction 0–1 or $\text{kg/m}^2$)
- **Depth:** $0 - 100\text{ cm}$ root zone layer
- **Valid Data Range:** $0.000$ to $1.000$ volumetric soil saturation fraction
- **Fill Value:** $-9999.0$
- **Significance:** Measures hydrological water availability directly accessible to tree root systems.

---

### 1.4 MERRA-2 Atmospheric Reanalysis
- **Product ID:** `M2TMNXSLV.5.12.4` (Modern-Era Retrospective analysis for Research and Applications, Version 2)
- **Responsible DAAC:** NASA GES DISC / Global Modeling and Assimilation Office (GMAO)
- **DOI:** [10.5067/SUOQESM065F5](https://doi.org/10.5067/SUOQESM065F5)
- **Spatial Resolution:** 0.5° $\times$ 0.625°
- **Temporal Resolution:** Monthly mean
- **Physical Parameters:** Near-surface 2m air temperature (`T2M`, °C) and Relative Humidity (`RH2M`, %)
- **Fill Value:** $1.0 \times 10^{15}$ (screened to $-999$)
- **Significance:** Characterizes atmospheric evaporative demand and thermal stress on forest canopies.

---

### 1.5 NASA GIBS & NASA FIRMS (Supporting Context)
- **GIBS Endpoint:** `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/`
  - MODIS Terra Corrected Reflectance True Color (Daily 250m)
  - VIIRS S-NPP True Color (Daily 250m)
- **FIRMS Active Fire API:** NASA Fire Information for Resource Management System
  - VIIRS S-NPP / NOAA-20 / NOAA-21 375m active fire detections (NRT)
  - MODIS 1 km thermal anomalies

---

## 2. OFFICIAL CITATIONS & REFERENCES

1. **Didan, K.** (2021). *MOD13A3 MODIS/Terra Vegetation Indices Monthly L3 Global 1 km SIN Grid V061*. NASA EOSDIS Land Processes Distributed Active Archive Center. DOI: [10.5067/MODIS/MOD13A3.061](https://doi.org/10.5067/MODIS/MOD13A3.061)
2. **Huffman, G. J., et al.** (2019). *GPM IMERG Final Precipitation L3 1 month 0.1 degree x 0.1 degree V06*. Goddard Earth Sciences Data and Information Services Center (GES DISC). DOI: [10.5067/GPM/IMERG/3B-MONTH/06](https://doi.org/10.5067/GPM/IMERG/3B-MONTH/06)
3. **Rodell, M., et al.** (2004). *The Global Land Data Assimilation System*. Bulletin of the American Meteorological Society, 85(3), 381-394. DOI: [10.1175/BAMS-85-3-381](https://doi.org/10.1175/BAMS-85-3-381)
4. **Gelaro, R., et al.** (2017). *The Modern-Era Retrospective Analysis for Research and Applications, Version 2 (MERRA-2)*. Journal of Climate, 30(14), 5419-5454. DOI: [10.1175/JCLI-D-16-0758.1](https://doi.org/10.1175/JCLI-D-16-0758.1)
5. **Mann, H. B.** (1945). *Nonparametric tests against trend*. Econometrica, 13(3), 245-259.
6. **Sen, P. K.** (1968). *Estimates of the regression coefficient based on Kendall's tau*. Journal of the American Statistical Association, 63(324), 1379-1389.
7. **Hirsch, R. M., Slack, J. R., & Smith, R. A.** (1982). *Techniques of trend analysis for monthly water quality data*. Water Resources Research, 18(1), 107-121.
