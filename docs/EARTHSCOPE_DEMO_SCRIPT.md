# EARTHSCOPE — OFFICIAL 3-MINUTE JUDGING DEMONSTRATION SCRIPT
## NASA Space Apps Challenge 2026 — Challenge #2: "Be An Earth System Trend Detective!"

**Target Time:** 3 minutes (180 seconds)  
**Presenter:** EARTHSCOPE Project Lead  
**Format:** Live Screen Recording & Verbal Narrative  
**Target Audience:** Official NASA Space Apps Evaluation Jury

---

## Chronological Cue Sheet

| Time Window | UI State / Screen View | Presenter Verbal Script | Key Evaluation Criteria Addressed |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:25** | VanRakshak Command Center (`http://localhost:8000/`) | *"Judges, welcome to EARTHSCOPE, our solution for Challenge #2: 'Be An Earth System Trend Detective!'. Rather than building a decorative climate dashboard, we built a scientifically rigorous trend detection platform that answers NASA's four fundamental questions: What is changing? Where is it changing? How much is it changing? And are the changes statistically significant?"* | **Impact & Relevance** (Defines core challenge problem and operational scope) |
| **0:25 – 0:50** | Click `🛰 NASA Trend Lab` or navigate to `http://localhost:8000/earthscope` | *"Let's open our dedicated Planetary Observation & Trend Dashboard. Here in the Western Ghats of India—a global biodiversity hotspot—we examine a 10-year decadal baseline from 2015 to 2024. In the upper KPI strip, notice our live integration of NASA Terra MODIS 250-meter vegetation integrity, MODIS 1-kilometer Land Surface Temperature, and GPM IMERG 0.1-degree precipitation."* | **Validity & Presentation** (Demonstrates authenticated NASA data ingestion and high-craft UI) |
| **0:50 – 1:20** | Click `Kodagu Rainforest` -> ECharts decadal chart scrubs to display NDVI time series | *"Is vegetation greenness in Kodagu declining? Many raw visualizations falsely suggest deforestation during summer brown-downs. But EARTHSCOPE computes non-parametric Mann-Kendall statistics. Over 120 monthly epochs, our calculated Sen's slope is minus 0.0012 per year, with a p-value of 0.665. Because p is greater than 0.05, our statistical hypothesis engine rigorously concludes: No statistically significant monotonic decline."* | **Validity & Creativity** (Solves the central scientific question; eliminates false positives) |
| **1:20 – 1:50** | Click `🐅 Bandipur Biosphere` (or `Regional Contrast`) | *"Now, watch our dual-region biophysical contrast. We shift 70 kilometers east to the Bandipur dry deciduous forest under the exact same temporal baseline. In Bandipur, NDVI displays sharp cyclical swings with an r₁ autocorrelation of 0.828, directly tracking monsoon rain pulses. Notice how our biophysical coupling matrix separates thermodynamic surface energy balances from macro-climatic circulation."* | **Creativity & Impact** (Dual-region comparative analysis; biophysical coupling) |
| **1:50 – 2:20** | Open `🔑 Keys & APIs (12)` -> Scroll down to `NASA Earthdata CMR` | *"Under the hood, EARTHSCOPE connects directly to NASA Earthdata CMR and AppEEARS using live Bearer token authentication. We support all 8 core challenge datasets—from MODIS and GPM to MERRA-2 and GLDAS. No numbers are hardcoded, and no mock data is ever displayed."* | **Relevance & Validity** (Authentic NASA APIs and token-backed architecture) |
| **2:20 – 2:50** | Click `📄 Research Dossier` -> New tab opens `http://localhost:8000/api/earth/report?format=html` | *"Finally, for field ecologists and forest guardians, one click exports a reproducible, publication-grade Research Dossier. It provides Sen's slope confidence intervals, data DOIs, sensor caveats, and an RFC-4180 CSV observation file ready for peer review."* | **Presentation & Impact** (Actionable deliverables for decision-makers) |
| **2:50 – 3:00** | Return to VanRakshak Command Center (`🌿 VanRakshak Command`) | *"EARTHSCOPE turns complex satellite archives into verifiable, statistically sound environmental intelligence. Thank you."* | **Closing & Summary** |
