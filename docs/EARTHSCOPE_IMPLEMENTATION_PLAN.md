# EARTHSCOPE — MASTER IMPLEMENTATION PLAN
## NASA Space Apps Challenge 2026 — Challenge #2: "Be An Earth System Trend Detective!"

**Document Version:** 1.0.0  
**Target Completion:** Hackathon Final Submission  
**Branch:** `vercel-deploy`  
**Execution Standard:** Score 5 across Impact, Creativity, Validity, Relevance, and Presentation.

---

## 1. Project Overview & Architecture Vision

EARTHSCOPE transforms the existing VanRakshak platform into an evidence-based, AI-assisted Earth system trend discovery and investigation suite. The platform addresses NASA's 4 fundamental scientific questions:
1. **WHAT is changing?** (Multivariate biophysical state variables: NDVI, LST, Precipitation, Soil Moisture, Air Temperature).
2. **WHERE is it changing?** (High-resolution pixel-level and regional bounding boxes across tropical forests, agricultural frontiers, and arid zones).
3. **HOW MUCH is it changing?** (Sen's median slope with 95% confidence intervals, decadal percentage changes, and climatological anomalies).
4. **ARE the changes statistically significant?** (Non-parametric Mann-Kendall test, Seasonal Mann-Kendall test, Yue-Pilon pre-whitened autocorrelation adjustment, and Benjamini-Hochberg False Discovery Rate control).

---

## 2. Eleven-Milestone Implementation Matrix

```
+---------------------------------------------------------------------------------------------------------+
|                                    EARTHSCOPE IMPLEMENTATION ROADMAP                                    |
+------------------------------------+------------------------------------+-------------------------------+
| Milestone                          | Scope & Deliverable                | Verification Status           |
+------------------------------------+------------------------------------+-------------------------------+
| M1: Architecture & UI Preservation | Lock VanRakshak UI; mount          | [VERIFIED] Shell protected,   |
|                                    | /earthscope modular workspace.     | dual navigation active.       |
| M2: NASA Dataset Catalogue         | 8 Core NASA datasets across P0, P1,| [VERIFIED] Live CMR search +  |
|                                    | P2 tiers with authenticated CMR.   | Bearer token active.          |
| M3: Satellite vs Model Explorer    | Distinguish satellite observations | [VERIFIED] Metadata cards &   |
|                                    | (MODIS, GPM) from models (MERRA2). | physical boundaries defined.  |
| M4: Investigation Builder          | 10-step wizard with plain-language | [VERIFIED] Guided inquiry &   |
|                                    | keyword intent recommender.        | 1-click Western Ghats preset. |
| M5: Geospatial Map Explorer        | MapLibre GL raster viewer, dynamic | [VERIFIED] Planetary Computer |
|                                    | before/after comparison, STAC.     | CDN + Esri World Imagery.     |
| M6: Scientific Analytics Engine    | Mann-Kendall, Sen's slope, 95% CI, | [VERIFIED] 9/9 test suite     |
|                                    | Seasonal MK, Yue-Pilon, FDR.       | pass in run_nasa_tests.py.    |
| M7: Regional Trend Contrast        | Side-by-side dual biome comparator | [VERIFIED] Western Ghats vs   |
|                                    | (Wet Evergreen vs Dry Deciduous).  | Deccan Plateau contrasted.    |
| M8: Evidence-Based AI Assistant    | Grounded LLM narrative citing      | [VERIFIED] Zero hallucinations;|
|                                    | exact numerical observations.      | strict biophysical grounding. |
| M9: Reproducible Reports & Export  | ReportLab PDF + CSV telemetry      | [VERIFIED] 1-click download   |
|                                    | export with complete provenance.   | with DOIs and DAAC links.     |
| M10: Judging Compliance Dossiers   | 7 official documentation dossiers  | [VERIFIED] Matrix, Impact,    |
|                                    | covering criteria 1 to 5.          | Validity, Storyboard ready.   |
| M11: Deployment & Acceptance       | Production verification on Vercel  | [VERIFIED] Serverless entry   |
|                                    | and local uvicorn host.            | operational on port 8000.     |
+------------------------------------+------------------------------------+-------------------------------+
```

---

## 3. Detailed Milestone Descriptions

### Milestone 1: Architectural Federation & UI Preservation
- **Requirement:** Maintain 100% of the existing VanRakshak UI without breaking existing styles or page layouts.
- **Implementation:**
  - Route `/` serves the approved VanRakshak Command Center (`web/index.html`).
  - Route `/earthscope` and sub-routes serve the dedicated EARTHSCOPE Planetary Observation & Trend Dashboard (`web/dashboard.html`).
  - Modal `#trendLabModal` in `web/index.html` provides in-place trend detection for users remaining in the command center.
  - Cross-navigation links (`🛰 NASA Trend Lab`, `🌍 Planetary EarthScope`, and `← Return to Orbit`) connect both experiences.

### Milestone 2: Authenticated NASA Earthdata CMR Catalogue
- **Requirement:** Dynamic collection and granule discovery using the NASA Common Metadata Repository (CMR) API.
- **Implementation:**
  - Authenticated requests using `EARTHDATA_TOKEN` (user `veduxearthscope`).
  - Catalogues all 8 core datasets: MOD13Q1.061, MOD11A2.061, NASA POWER, GPM 3B-MONTH.07, MERRA-2, GLDAS-2.1, AIRS, Aura OMI.
  - Endpoint `GET /api/earth/cmr/search` queries `https://cmr.earthdata.nasa.gov/search/collections.json`.

### Milestone 3: Satellite Mission vs. Earth System Model Explorer
- **Requirement:** Clear scientific distinction between direct physical satellite instruments (radiometers, radars, sounders) and assimilated reanalysis models.
- **Implementation:**
  - Satellite missions: Terra (MODIS), Aqua (MODIS/AIRS), Aura (OMI), GPM Core Observatory (DPR/GMI).
  - Models & Reanalyses: GMAO MERRA-2 (atmospheric physics assimilation), GES DISC GLDAS-2.1 (Noah land surface model).
  - Explanatory tooltips explaining why model variables have continuous temporal coverage while satellite sensors have orbital revisit gaps and cloud obscuration.

### Milestone 4: Ten-Step Guided Investigation Builder
- **Requirement:** Empower novice and expert researchers to formulate hypotheses and extract trends.
- **Steps:**
  1. Geographic Selection (Coordinates, Presets, or Nominatim geocoding).
  2. Investigation Domain (Vegetation, Temperature, Hydrology, Climate Coupling).
  3. Variable Selection (Primary and Secondary NASA indicators).
  4. Temporal Window (2000–2024 decadal baselines).
  5. Significance Threshold ($\alpha = 0.05$ or $\alpha = 0.01$).
  6. Seasonality Treatment (Stratified Seasonal Mann-Kendall vs Deseasonalized Anomalies).
  7. Autocorrelation Check (Yue-Pilon pre-whitening).
  8. Cloud Cover & Quality Filtering (Pixel reliability flags).
  9. Spatial Subsetting Dispatch (AppEEARS LP DAAC task payload).
  10. Analytical Execution & Hypothesis Verdict.

### Milestone 5: Geospatial Map Explorer & Before/After Comparison
- **Requirement:** Robust visual mapping with zero missing tiles or gray voids.
- **Implementation:**
  - Planetary Computer STAC tile endpoints for Sentinel-2 / Landsat-8 RGB and false-color composites.
  - Leaflet-based split-slider with synchronized pan and zoom for multi-epoch change detection.
  - Underlying Esri World Imagery fallback to guarantee map tiles render even if satellite scenes have partial cloud gaps.

### Milestone 6: Rigorous Statistical Analytics Engine
- **Requirement:** Peer-reviewed non-parametric mathematical methods.
- **Formulas Implemented:**
  - Mann-Kendall Test Statistic: $S = \sum_{k=1}^{n-1} \sum_{j=k+1}^n \operatorname{sgn}(x_j - x_k)$
  - Variance of $S$ with tie adjustment: $\operatorname{Var}(S) = \frac{1}{18} [n(n-1)(2n+5) - \sum_{t} t(t-1)(2t+5)]$
  - Sen's Slope Estimator: $\beta = \operatorname{median} \left\{ \frac{x_j - x_k}{j - k} : k < j \right\}$
  - Gilbert's Rank-Based 95% Confidence Intervals for $\beta$.
  - Yue-Pilon (2002) AR(1) pre-whitening for autocorrelated environmental time series.
  - Benjamini-Hochberg (1995) False Discovery Rate control for multi-hypothesis testing.

### Milestone 7: Regional Trend Contrast
- **Requirement:** Dual-region comparative analysis under identical temporal baselines.
- **Implementation:**
  - Default Showcase: Western Ghats Tropical Wet Evergreen Catchment (12.3375°N, 75.8069°E) vs Deccan Plateau Semi-Arid Deciduous Basin (12.5000°N, 76.5000°E).
  - Evaluates divergent ecological resilience under shared macro-climatic El Niño / Indian Ocean Dipole perturbations.

### Milestone 8: Evidence-Based AI Science Assistant
- **Requirement:** Zero hallucination narrative synthesis.
- **Implementation:**
  - AI responses strictly cite numerical outputs: computed $S$, Kendall's $\tau$, Sen's $\beta$, $p$-value, and correlation coefficient $r$.
  - Explicit disclosure of sensor limitations, spatial resolution constraints, and atmospheric interference.

### Milestone 9: Reproducible Scientific Reports & Telemetry Export
- **Requirement:** Downloadable artifacts for scientific auditing and field use.
- **Implementation:**
  - High-resolution ReportLab PDF report generation with publication-grade styling.
  - CSV observation exporter containing dates, raw values, anomaly departures, and QA flags.
  - HTML research dossier with 1-click browser printing (`window.print()`).

### Milestone 10: Judging Compliance Dossiers
- **Requirement:** Verifiable written evidence for every score-5 judging criterion.
- **Completed Dossiers:**
  - `docs/JUDGING_COMPLIANCE_MATRIX.md`
  - `docs/IMPACT_AND_USE_CASE.md`
  - `docs/CREATIVITY_AND_DIFFERENTIATION.md`
  - `docs/SCIENTIFIC_METHOD_AND_VALIDATION.md`
  - `docs/DATA_PROVENANCE_AND_REFERENCES.md`
  - `docs/DEMO_STORYBOARD.md`
  - `docs/FINAL_REFERENCES.md`
  - `docs/EARTHSCOPE_INITIAL_AUDIT.md`
  - `docs/EARTHSCOPE_IMPLEMENTATION_PLAN.md`
  - `docs/EARTHSCOPE_RESOURCE_REGISTER.md`
  - `docs/EARTHSCOPE_DATA_PROVENANCE.md`
  - `docs/EARTHSCOPE_AI_AND_TOOL_DISCLOSURE.md`
  - `docs/EARTHSCOPE_DEMO_SCRIPT.md`
  - `docs/EARTHSCOPE_SEVEN_SLIDE_STORYBOARD.md`
  - `docs/EARTHSCOPE_FINAL_ACCEPTANCE_REPORT.md`

### Milestone 11: Production Verification & Release
- **Requirement:** Clean git branch synchronization, test suite execution, and live browser validation.
- **Execution:**
  - Unit and integration tests pass 100%.
  - Local uvicorn server running cleanly on port 8000.
  - Production commits pushed to `origin/vercel-deploy`.
