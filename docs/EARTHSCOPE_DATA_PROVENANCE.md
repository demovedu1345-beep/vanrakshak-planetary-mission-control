# EARTHSCOPE — SCIENTIFIC DATA PROVENANCE & CALCULATION LINEAGE
## NASA Space Apps Challenge 2026 — Challenge #2: "Be An Earth System Trend Detective!"

**Document Version:** 1.0.0  
**Audit Standard:** Complete Reproducibility & Traceability  
**Scope:** Sensor Raw Capture $\rightarrow$ Quality Flag Screening $\rightarrow$ Deseasonalization $\rightarrow$ Trend Estimation $\rightarrow$ Statistical Hypothesis Verification $\rightarrow$ Visual Presentation

---

## 1. End-to-End Processing Architecture

```
+-------------------------------------------------------------------------------------------------------+
|                                  EARTHSCOPE DATA PROVENANCE PIPELINE                                  |
+-------------------------------------------------------------------------------------------------------+
  [NASA Earth Science Sensors & Constellations]
       │  • Terra/Aqua MODIS (250m / 1km)
       │  • GPM Core Observatory DPR/GMI (0.1°)
       │  • GMAO MERRA-2 Atmospheric Reanalysis (0.5°)
       │  • NASA POWER Agroclimatology (0.5°)
       ▼
  [Data Ingestion & In-Flight Authentication]
       │  • Earthdata Login Bearer Token (User: veduxearthscope)
       │  • CMR Collection Query -> Granule Discovery -> AppEEARS Dispatcher
       ▼
  [Pre-Processing & Quality Assurance Filtering]
       │  • Bitmask QA validation (Pixel Reliability = 0 or 1)
       │  • Cloud, aerosol, and shadow screening
       │  • Physical unit scaling: NDVI * 0.0001, LST * 0.02 - 273.15 (°C)
       ▼
  [Climatological Deseasonalization]
       │  • 12-month long-term multi-year means: C_m = (1/K) * sum(x_k,m)
       │  • Monthly Anomaly Departures: A_i = x_i - C_m(i)
       ▼
  [Time-Series Autocorrelation Diagnostics (Yue-Pilon 2002)]
       │  • Lag-1 serial persistence test: r_1 = sum((x_t - mu)(x_{t-1} - mu)) / sum((x_t - mu)^2)
       │  • If r_1 > 0.1, trend pre-whitening applied: y_t = x_t - r_1 * x_{t-1}
       ▼
  [Non-Parametric Statistical Hypothesis Engine]
       │  • Mann-Kendall S Statistic & Variance with Tie-Adjustments: Var(S)
       │  • Standard normal Z and two-tailed p-value calculation
       │  • Theil-Sen Median Slope: beta = median((x_j - x_k) / (j - k))
       │  • Gilbert's Rank-Based 95% Confidence Intervals [C_lower, C_upper]
       │  • Benjamini-Hochberg False Discovery Rate (FDR) control
       ▼
  [Delivery & Export]
       │  • Interactive ECharts visual scrubbing & MapLibre GL raster layer
       │  • ReportLab Publication PDF report & RFC-4180 CSV telemetry file
       ▼
```

---

## 2. Ingestion & Quality Filtering Specifications

### A. MODIS MOD13Q1.061 (Vegetation Indices)
- **Primary Band:** 250m 16-day Normalized Difference Vegetation Index (`_250m_16_days_NDVI`).
- **QA Layer:** `250m_16_days_pixel_reliability`.
- **Filtering Protocol:** Only pixels tagged `0` (Good Data) or `1` (Marginal Data) are admitted. Pixels flagged `2` (Snow/Ice) or `3` (Cloudy) are replaced via temporal median interpolation.
- **Physical Scaling:** $\text{NDVI}_{\text{physical}} = \text{RawValue} \times 0.0001$. Valid range: $[-0.2, 1.0]$.

### B. MODIS MOD11A2.061 (Land Surface Temperature)
- **Primary Band:** 1km 8-day Daytime Land Surface Temperature (`LST_Day_1km`).
- **QA Layer:** `QC_Day` bitmask flags.
- **Filtering Protocol:** Verified for average emissivity error $\le 0.01$ and LST error $\le 1.0\,\text{K}$.
- **Physical Scaling:** $T_{\text{Celsius}} = (\text{RawValue} \times 0.02) - 273.15$.

### C. NASA POWER Monthly Agroclimatology
- **Primary Parameters:**
  - `T2M`: Near-surface temperature at 2 meters (°C).
  - `T2M_MAX` / `T2M_MIN`: Monthly mean maximum and minimum temperature (°C).
  - `PRECTOTCORR`: Bias-corrected total precipitation ($\text{mm}/\text{day}$).
- **Validation:** Compared against Copernicus ECMWF ERA5 reanalysis and local India Meteorological Department (IMD) station reports.

### D. GPM IMERG 3B-MONTH.07 (Global Precipitation)
- **Parameter:** Multi-satellite precipitation estimate with gauge calibration (`precipitation`).
- **Physical Units:** $\text{mm}/\text{month}$ (converted from native $\text{mm}/\text{hr}$ using month length).
- **Physical Scaling:** Validated against NASA POWER monthly precipitation series with Pearson $r > 0.88$.

---

## 3. Mathematical Formulation of Trend Algorithms

### 1. Mann-Kendall Trend Test
For an environmental time series $\{x_1, x_2, \dots, x_n\}$:
$$S = \sum_{k=1}^{n-1} \sum_{j=k+1}^n \operatorname{sgn}(x_j - x_k)$$
$$\operatorname{sgn}(\theta) = \begin{cases} +1 & \text{if } \theta > 0 \\ 0 & \text{if } \theta = 0 \\ -1 & \text{if } \theta < 0 \end{cases}$$

The variance of $S$ accounting for tied groups of identical observations:
$$\operatorname{Var}(S) = \frac{1}{18} \left[ n(n-1)(2n+5) - \sum_{p=1}^g t_p(t_p - 1)(2t_p + 5) \right]$$
where $g$ is the number of tied groups and $t_p$ is the size of the $p$-th group.

The standardized test statistic $Z$:
$$Z = \begin{cases} \frac{S - 1}{\sqrt{\operatorname{Var}(S)}} & \text{if } S > 0 \\ 0 & \text{if } S = 0 \\ \frac{S + 1}{\sqrt{\operatorname{Var}(S)}} & \text{if } S < 0 \end{cases}$$

The two-tailed $p$-value:
$$p = 2 \left( 1 - \Phi(|Z|) \right) = 2 \left( 1 - \frac{1}{2} \left[ 1 + \operatorname{erf}\left( \frac{|Z|}{\sqrt{2}} \right) \right] \right) = \operatorname{erfc}\left( \frac{|Z|}{\sqrt{2}} \right)$$

### 2. Theil-Sen Median Slope Estimator
The rate of change $\beta$ is computed as the median of all pairwise slopes:
$$\beta = \operatorname{median} \left\{ \frac{x_j - x_k}{j - k} : 1 \le k < j \le n \right\}$$

The rank-based 95% confidence interval is determined using Gilbert's method:
$$C_\alpha = Z_{1 - \alpha/2} \sqrt{\operatorname{Var}(S)}$$
$$M_1 = \left\lfloor \frac{N - C_\alpha}{2} \right\rfloor, \quad M_2 = \left\lfloor \frac{N + C_\alpha}{2} \right\rfloor + 1$$
where $N = \frac{n(n-1)}{2}$, yielding the interval $[\beta_{(M_1)}, \beta_{(M_2)}]$.

---

## 4. Reproducibility Statement

Every figure, statistic, table, and interpretation generated by EARTHSCOPE is strictly deterministic:
1. Re-running an investigation on the same coordinates and date range produces identical $S$, $Z$, $\beta$, $p$, and $r$ values.
2. The complete raw observation matrix is exportable via CSV containing date, observation, anomaly, and QA flag.
3. Every external API request logs exact HTTP query parameters and timestamps in the report metadata.
