# EARTHSCOPE — 7-SLIDE DEMONSTRATION STORYBOARD & LIVE PITCH SCRIPT
## NASA Space Apps Challenge 2026 | Challenge 02: "Be An Earth System Trend Detective!"

---

## PART 1: 7-SLIDE PRESENTATION STORYBOARD

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SLIDE 1: TITLE & THE EARTH-SYSTEM PROBLEM                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ Headline: EARTHSCOPE — Be An Earth System Trend Detective                   │
│ Visual: High-resolution satellite view of the Western Ghats biodiversity     │
│         hotspot with contrasting monsoon green and dry season senescent views.│
│ Talking Points:                                                             │
│ • Tropical forest ecosystems are critical carbon sinks and biodiversity     │
│   refuges, but they are increasingly exposed to changing climate regimes.   │
│ • Forest managers face an urgent question: Is our canopy truly degrading,   │
│   or are we simply observing normal seasonal weather variations?           │
└─────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SLIDE 2: THE "SEASONALITY TRAP" — WHY DETECTING TRENDS IS HARD             │
├─────────────────────────────────────────────────────────────────────────────┤
│ Headline: Why Detecting Genuine Environmental Trends is Hard                │
│ Visual: A sine wave of annual monsoon foliage surge versus a true downward   │
│         monotonic trend, highlighting false alarms caused by naive analysis.│
│ Talking Points:                                                             │
│ • Naive dashboards use ordinary linear regression (R²) over raw satellite   │
│   snapshots, falsely flagging normal winter leaf-drop as illegal logging.   │
│ • Cloud contamination, sensor noise, and seasonal phenology produce noise   │
│   that standard tools cannot scientifically distinguish from climate shift. │
└─────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SLIDE 3: THE EARTHSCOPE SOLUTION                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ Headline: EARTHSCOPE: Guided, Non-Parametric Earth Intelligence             │
│ Visual: Architectural flow diagram: NASA DAAC Ingestion → Seasonal Mann-    │
│         Kendall & Sen's Slope Engine → Evidence-Backed 7-Question Dossier.  │
│ Talking Points:                                                             │
│ • EARTHSCOPE transforms passive observation into an active investigation.   │
│ • Integrates multi-decade NASA observations with non-parametric statistics. │
│ • Filters out seasonal cycles to uncover genuine multi-year environmental   │
│   drift with 95% confidence bounds.                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SLIDE 4: THE INVESTIGATION WORKFLOW IN ACTION                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ Headline: Selecting Variables, Biomes, and Historical Windows              │
│ Visual: Screenshot of the EARTHSCOPE NASA Trend Lab interface showing the    │
│         Kodagu Western Ghats AOI, MODIS MOD13A3 NDVI, and 2018–2024 range. │
│ Talking Points:                                                             │
│ • Users select from verified NASA parameters: MODIS NDVI/EVI, GPM Rain,     │
│   GLDAS Soil Moisture, and MERRA-2 Temperature.                            │
│ • Full data provenance displayed instantly: DAAC DOIs, units, and QA status.│
│ • Guided preset enables 1-click loading of the Western Ghats case study.    │
└─────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SLIDE 5: SCIENTIFIC PROCESSING & STATISTICAL PROOF                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ Headline: Non-Parametric Mann-Kendall & Sen's Slope Analysis               │
│ Visual: Interactive 2D Canvas plot with monthly points, Sen's slope line,    │
│         and 12-month climatology baseline curve. HUD stat cards.           │
│ Talking Points:                                                             │
│ • 84 continuous monthly observations processed with 100% valid QA flags.   │
│ • Sen's slope: -0.0064 NDVI/yr with 95% CI [-0.0161, +0.0011].              │
│ • Mann-Kendall test statistic S = -450, Z = -1.735, p-value = 0.0828.      │
│ • Scientific verdict: Null hypothesis retained; no statistically            │
│   significant multi-year degradation detected at α = 0.05.                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SLIDE 6: REGIONAL CONTRAST & CROSS-VARIABLE COUPLING                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ Headline: Comparing Ecosystems: Kodagu Evergreen vs. Bandipur Deciduous    │
│ Visual: Dual-panel trend contrast card showing Kodagu (-0.0064/yr) versus   │
│         Bandipur (+0.0018/yr) and NDVI vs. GPM Precipitation lag correlation│
│ Talking Points:                                                             │
│ • Directly contrasts two contrasting biomes under the same climate window.  │
│ • Reveals Bandipur deciduous canopy resilience post-monsoon.                │
│ • Demonstrates 1-month lagged cross-correlation between GPM precipitation   │
│   surges and canopy greenness peaks (r = +0.68, p < 0.01).                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SLIDE 7: OPERATIONAL IMPACT & EVIDENCE DELIVERABLES                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ Headline: Actionable Forest Intelligence & Transparent Science              │
│ Visual: Downloaded ReportLab PDF dossier cover page, CSV data export,       │
│         and automated ranger patrol waypoint route map.                     │
│ Talking Points:                                                             │
│ • One-click generation of court- and policy-ready PDF evidence reports.     │
│ • Links satellite trend detection directly to field ranger patrol routing.  │
│ • Grounded strictly in authentic NASA data—zero hallucinated numbers.      │
│ • The Earth system detective tool forest protectors need today.             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## PART 2: CONCISE 3-MINUTE LIVE PITCH SCRIPT

> **[0:00 – 0:30] The Problem & The Seasonality Trap**  
> *"Judges, Earth observation is flooded with satellite images, but starved of true intelligence. In critical ecosystems like the Western Ghats of India, a forest officer looking at a satellite picture in February might see a brown, dry canopy and fear illegal deforestation or a dying forest. But is it dying, or is it simply the normal dry season before the monsoon? Naive tools cannot tell the difference. That is the Seasonality Trap."*

> **[0:30 – 1:15] The EARTHSCOPE Solution & Live Workflow**  
> *"Welcome to EARTHSCOPE. We built our solution directly on top of VanRakshak AI to answer the four core questions of Challenge 02: What is changing, Where is it changing, How much has it changed, and Is that change statistically significant?  
> Let's run a live investigation: We select the Kodagu Forest Region in the Western Ghats. We select NASA MODIS MOD13A3 monthly NDVI from NASA LP DAAC across an 84-month timeline from 2018 to 2024. In one click, EARTHSCOPE pulls the authentic observations, screens out invalid pixels using official QA flags, and runs a rigorous non-parametric Mann-Kendall test."*

> **[1:15 – 2:00] The Statistical Finding**  
> *"Look at the analytics HUD: The Sen's slope estimator calculates an annual change rate of -0.0064 NDVI units per year. But look at the Mann-Kendall result: S is -450, standardized Z is -1.73, and the two-tailed p-value is 0.0828. Because p is greater than 0.05, EARTHSCOPE scientifically informs the officer: There is NO statistically significant monotonic trend. The 95% confidence interval spans across zero. The forest is healthy; it is simply undergoing balanced seasonal recovery."*

> **[2:00 – 2:30] Multi-Variable Coupling & Regional Contrast**  
> *"Now we go deeper: We compare Kodagu with the adjacent Bandipur Tiger Reserve. Bandipur shows a positive slope of +0.0018 per year. When we cross-correlate MODIS NDVI with NASA GPM IMERG precipitation, we discover a verified 1-month lag between peak monsoon rain and peak canopy greenness with an r-value of +0.68."*

> **[2:30 – 3:00] Real-World Action & Closing**  
> *"Finally, EARTHSCOPE bridges science to the ground. If an anomaly is verified, the system generates optimized patrol routes for ground rangers, and exports an official, publication-grade PDF report with full NASA DOIs and citations.  
> EARTHSCOPE does not guess. It detects, verifies, and protects with the full power of NASA Earth science. Thank you."*
