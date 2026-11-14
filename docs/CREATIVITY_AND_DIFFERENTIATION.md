# EARTHSCOPE — CREATIVITY AND DIFFERENTIATION
## NASA Space Apps Challenge 2026 | Challenge 02: "Be An Earth System Trend Detective!"

---

## 1. WHY EARTHSCOPE IS NOT A GENERIC DASHBOARD

Most satellite dashboards suffer from three fundamental flaws:
1. **Passive Visualization:** They display static colored maps without statistical inference or confidence testing.
2. **The "Data Dump" Dilemma:** They provide raw numbers without guiding users on *what* to investigate or *how* variables interact.
3. **Black-Box AI:** They use generative AI to guess answers without mathematical ties to empirical observations.

**EARTHSCOPE** rethinks Earth system analysis into an active, hypothesis-driven **Scientific Detective Investigation**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       THE GUIDED INVESTIGATION PIPELINE                     │
├──────────────────┬──────────────────┬──────────────────┬────────────────────┤
│ 1. DISCOVERY     │ 2. INGESTION     │ 3. ANALYTICS     │ 4. INTERPRETATION  │
│ Guided search &  │ Authentic NASA   │ Non-parametric   │ Evidence-backed    │
│ variable pairing │ DAAC acquisition │ Mann-Kendall     │ 7-question answers │
│ recommendation   │ & QA screening   │ & Sen's slope    │ & PDF export       │
└──────────────────┴──────────────────┴──────────────────┴────────────────────┘
```

---

## 2. THE FIVE DISTINCTIVE CAPABILITIES

### A. Guided Investigation Recommender
Users do not need a Ph.D. in remote sensing to select the right NASA datasets. The built-in recommendation engine maps ecological inquiries directly to official NASA Earth science parameters:
- Inquiry: *"Is drought causing forest canopy decline?"*  
  $\rightarrow$ Recommends **MODIS MOD13A3 (NDVI)** paired with **NASA GLDAS Root-Zone Soil Moisture** and **GPM Precipitation**.
- Inquiry: *"Are higher temperatures stressing evergreen trees?"*  
  $\rightarrow$ Recommends **MODIS MOD13A3 (EVI)** paired with **MERRA-2 2m Air Temperature**.

### B. Interactive Variable Discovery Catalogue
The Trend Lab exposes a structured metadata catalog (`GET /api/trends/catalogue`) displaying:
- Exact Product ID (e.g., `MOD13A3.061`, `GPM_3IMERGM.06`, `GLDAS_NOAH025_M.2.1`).
- Responsible NASA DAAC (LP DAAC, GES DISC, Langley ASDC).
- Official DOI and scientific citation.
- Physical units, valid bounds, and spatial/temporal resolution.

### C. Dual-Region Trend Contrast Engine (`POST /api/trends/compare-regions`)
Rather than viewing a single isolated coordinate, EARTHSCOPE enables side-by-side comparative diagnostics:
- Directly evaluates whether two contrasting biomes (e.g., Kodagu Evergreen vs Bandipur Deciduous) exhibit synchronized or diverging environmental trajectories.
- Compares slope magnitudes, statistical significance ($p$-values), and historical baseline means under identical temporal windows.

### D. Explainable Evidence-Backed Science (Zero Hallucination)
Every explanation generated in the 7-question breakdown is deterministically constructed from verifiable numerical outputs:
- States the exact Sen's slope rate and 95% confidence intervals.
- Cites the Mann-Kendall $S$-statistic, $Z$-score, and two-tailed $p$-value.
- Highlights whether the null hypothesis $H_0$ is rejected or retained.
- Explains physical limitations: explicitly caveats that NDVI measures spectral greenness, not direct tree count or illegal felling.

### E. Interactive 2D HTML5 Canvas Scrubbing & Climatology Overlay
The custom canvas rendering engine plots:
- The raw monthly observations ($y$-axis).
- The 12-month climatology cycle (normal historical baseline for each calendar month).
- The non-parametric Sen's slope trajectory.
- Interactive hover tooltips displaying date, observed value, and climatological anomaly.

---

## 3. FEATURE DIFFERENTIATION MATRIX

| Capability | Generic Earth Dashboards | EARTHSCOPE Innovation |
| :--- | :--- | :--- |
| **Statistical Rigor** | Simple linear regression ($R^2$), highly vulnerable to outliers. | Non-parametric **Mann-Kendall test** and **Sen's slope** with 95% CI, robust against extreme values. |
| **Seasonality Handling** | Ignored; winter leaf-loss is falsely flagged as forest degradation. | **Seasonal Mann-Kendall stratification** isolates genuine multi-year changes from regular monsoon rhythms. |
| **Cross-Variable Coupling** | Displays separate disconnected charts. | Simultaneous multi-variable Pearson/Spearman correlation and cross-lag analysis. |
| **Actionability** | Informational display only. | Directly connects satellite alerts to field patrol waypoint optimization via OSRM. |
| **Evidence Deliverable** | Raw screenshot. | Publication-grade **ReportLab PDF** and structured CSV observation download. |
