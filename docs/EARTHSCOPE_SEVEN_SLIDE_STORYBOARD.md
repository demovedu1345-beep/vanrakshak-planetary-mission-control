# EARTHSCOPE — SEVEN-SLIDE JUDGING PRESENTATION STORYBOARD
## NASA Space Apps Challenge 2026 — Challenge #2: "Be An Earth System Trend Detective!"

**Submission Format:** 7 Standard 16:9 Presentation Slides  
**Strict Guideline:** Adheres exactly to official NASA Space Apps Challenge submission criteria.

---

## Slide 1: Title & Challenge Identification
- **Slide Title:** EARTHSCOPE: AI-Assisted Earth System Trend Detective
- **Subtitle:** Solving Challenge #2: Be An Earth System Trend Detective!
- **Team Name:** VanRakshak / EARTHSCOPE Engineering & Science Team
- **Visuals:** 3D WebGL Earth with illuminated Western Ghats and Amazonian investigation pins; NASA Space Apps 2026 challenge badge.
- **Key Points:**
  - Addresses NASA's four core questions: What, Where, How Much, and Statistical Significance.
  - Bridges the gap between petabytes of raw satellite observations and verifiable environmental decisions.

---

## Slide 2: The Real-World Environmental Challenge
- **Slide Title:** The Problem: Satellite Dashboards Confuse Noise with Long-Term Change
- **Visuals:** Side-by-side comparison of a raw, noisy satellite time series vs. seasonal brown-down misdiagnosed as deforestation.
- **Key Points:**
  - Raw optical vegetation indices (NDVI) fluctuate heavily due to monsoonal rhythms, cloud obscuration, and sensor drift.
  - Conservationists and policymakers risk false alarms (or missed crises) without robust non-parametric statistical hypothesis testing.
  - Case Study Focus: Western Ghats biodiversity hotspot and agricultural frontier ecotones.

---

## Slide 3: The EARTHSCOPE Solution & Architecture
- **Slide Title:** An End-to-End Scientific Trend Detective Architecture
- **Visuals:** High-level pipeline diagram showing NASA Earthdata CMR $\rightarrow$ AppEEARS LP DAAC $\rightarrow$ Yue-Pilon Pre-whitening $\rightarrow$ Mann-Kendall Engine $\rightarrow$ Grounded AI Synthesis.
- **Key Points:**
  - Zero-mock policy: Ingests 8 Core NASA observation and reanalysis datasets across P0, P1, and P2 tiers.
  - Preserves approved UI design language while offering a dedicated 3D WebGL planetary observation studio.
  - Supports 115 live REST endpoints and dual-navigation cross-federation.

---

## Slide 4: Scientific Validity & Non-Parametric Mathematics
- **Slide Title:** Rigorous Mathematics: Moving Beyond Simple Linear Regression
- **Visuals:** Theil-Sen median slope line overlaid with Gilbert 95% rank-based confidence bounds; tie-adjusted Mann-Kendall equations.
- **Key Points:**
  - Non-parametric Mann-Kendall test ($S$, $\operatorname{Var}(S)$, $Z$, two-tailed $p$-value).
  - Sen's slope with rank-based 95% confidence intervals resistant to outliers and sensor noise.
  - Yue-Pilon (2002) AR(1) pre-whitening eliminates false significance from autocorrelated seasonal persistence ($r_1 = 0.828$).
  - Benjamini-Hochberg False Discovery Rate (FDR) control for multi-variable hypothesis testing.

---

## Slide 5: Dual-Region Biophysical Contrast & Guided Discovery
- **Slide Title:** Comparative Trend Intelligence: Western Ghats vs. Deccan Basin
- **Visuals:** Synchronized dual-panel graph comparing Kodagu Tropical Wet Evergreen forest ($p = 0.665$, stable) against Bandipur Dry Deciduous woodland (cyclical monsoon pulse).
- **Key Points:**
  - Demonstrates biophysical coupling: Disentangles surface energy balances (LST) from precipitation regimes (GPM IMERG).
  - Plain-language intent recommender assists non-specialists in formulating testable Earth science hypotheses.
  - 1-click guided investigation presets for rapid reproducible analysis.

---

## Slide 6: Actionable Impact & Operational Deliverables
- **Slide Title:** Empowering Ecologists, Rangers, and Policymakers
- **Visuals:** Screenshot of the 1-click publication-grade HTML/PDF Research Dossier and RFC-4180 CSV telemetry export.
- **Key Points:**
  - Delivers complete reproducibility: Every statistic traces back to authentic NASA DAAC collections and DOIs.
  - Used in tandem with the VanRakshak forest patrol planner, carbon sequestration calculator, and near-real-time FIRMS threat radar.
  - Provides objective, auditable evidence for REDD+ carbon credits and protected area stewardship.

---

## Slide 7: Technology Stack, Open Science & Future Horizons
- **Slide Title:** Built for NASA, Open-Source & Enterprise Ready
- **Visuals:** Badges for FastAPI, MapLibre GL, Three.js, Apache ECharts, ReportLab, and NASA Earthdata Login.
- **Key Points:**
  - 100% compliant with NASA Open Science guidelines and Apache-2.0 / MIT licensing.
  - Scalable deployment on Vercel Serverless and containerized edge infrastructure.
  - Future roadmap: Integration of upcoming NASA-ISRO Synthetic Aperture Radar (NISAR) 12-day repeat pass telemetry.
