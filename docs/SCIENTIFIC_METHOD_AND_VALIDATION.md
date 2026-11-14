# EARTHSCOPE — SCIENTIFIC METHODOLOGY AND VALIDATION REPORT
## NASA Space Apps Challenge 2026 | Challenge 02: "Be An Earth System Trend Detective!"

---

## 1. SCIENTIFIC ARCHITECTURE

EARTHSCOPE implements an authentic, non-parametric Earth system analytics engine designed to detect monotonic trends in environmental time series while eliminating false positives caused by seasonal phenology or extreme weather outliers.

```
RAW NASA OBSERVATIONS (MODIS / GPM / GLDAS / MERRA-2)
                      │
                      ▼
        DATA QUALITY & FILL FILTERING
         (Exclude -999, Apply 0.0001 scale)
                      │
                      ▼
     SEASONAL MANN-KENDALL STRATIFICATION
           (m = 1..12 monthly strata)
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
MANN-KENDALL S-TEST          SEN'S SLOPE ESTIMATOR
  • Kendall's S-stat          • Median of pairwise slopes
  • Tied-group variance       • 95% Confidence Intervals
  • Standardized Z-score
  • Two-tailed p-value
        │                           │
        └─────────────┬─────────────┘
                      ▼
     12-MONTH CLIMATOLOGY ANOMALY DECOMPOSITION
                      │
                      ▼
      MULTI-VARIABLE PEARSON & SPEARMAN COUPLING
                      │
                      ▼
        DETERMINISTIC SCIENTIFIC REPORT
```

---

## 2. MATHEMATICAL FORMULATION

### 2.1 Mann-Kendall Trend Test
The Mann-Kendall test is a non-parametric, distribution-free statistical test for detecting monotonic trends in time series:

1. **Test Statistic $S$:**
   $$S = \sum_{k=1}^{n-1} \sum_{j=k+1}^n \operatorname{sgn}(x_j - x_k)$$
   where
   $$\operatorname{sgn}(x_j - x_k) = \begin{cases} +1 & \text{if } x_j - x_k > 0 \\ 0 & \text{if } x_j - x_k = 0 \\ -1 & \text{if } x_j - x_k < 0 \end{cases}$$

2. **Variance of $S$ with Tie Adjustment:**
   $$\operatorname{Var}(S) = \frac{n(n-1)(2n+5) - \sum_{i=1}^m t_i(t_i-1)(2t_i+5)}{18}$$
   where $m$ is the number of tied groups and $t_i$ is the size of the $i$-th tied group.

3. **Standardized Test Statistic $Z$:**
   $$Z = \begin{cases} \frac{S - 1}{\sqrt{\operatorname{Var}(S)}} & \text{if } S > 0 \\ 0 & \text{if } S = 0 \\ \frac{S + 1}{\sqrt{\operatorname{Var}(S)}} & \text{if } S < 0 \end{cases}$$

4. **Two-Tailed $p$-Value:**
   $$p = 2 \times [1 - \Phi(|Z|)]$$
   where $\Phi(|Z|)$ is the standard normal cumulative distribution function. At significance level $\alpha = 0.05$, the null hypothesis $H_0$ (no monotonic trend) is rejected if $p < 0.05$.

---

### 2.2 Sen's Slope Estimator (with 95% Confidence Intervals)
The non-parametric Sen's slope is robust against extreme anomalies, sensor blips, and cloud gaps:

1. **Pairwise Slopes:**
   $$d_{ij} = \frac{x_j - x_i}{j - i} \quad \text{for all } 1 \le i < j \le n$$
   Total pairwise combinations: $N = \frac{n(n-1)}{2}$.

2. **Median Slope:**
   $$Q = \operatorname{median}(d_{ij})$$

3. **Two-Tailed 95% Confidence Interval ($\alpha = 0.05$):**
   $$C_{\alpha} = Z_{1 - \alpha/2} \times \sqrt{\operatorname{Var}(S)} = 1.95996 \times \sqrt{\operatorname{Var}(S)}$$
   The lower and upper rank limits in the sorted list of $d_{ij}$ are:
   $$M_1 = \left\lfloor \frac{N - C_{\alpha}}{2} \right\rfloor, \quad M_2 = \left\lceil \frac{N + C_{\alpha}}{2} \right\rceil + 1$$
   $$Q_{\text{lower}} = d_{(M_1)}, \quad Q_{\text{upper}} = d_{(M_2)}$$

---

### 2.3 Seasonal Mann-Kendall Test
To account for annual monsoon cycles:
1. Observations are stratified by calendar month $m \in \{1, 2, \dots, 12\}$.
2. For each month $m$, individual $S_m$ and $\operatorname{Var}(S_m)$ are computed across successive years.
3. Total seasonal statistic:
   $$S_{\text{seasonal}} = \sum_{m=1}^{12} S_m, \quad \operatorname{Var}(S_{\text{seasonal}}) = \sum_{m=1}^{12} \operatorname{Var}(S_m)$$
4. Standardized $Z_{\text{seasonal}}$ and $p_{\text{seasonal}}$ are evaluated to detect true inter-annual shifts independent of intra-annual phenology.

---

## 3. SYNTHETIC BENCHMARK VALIDATION & UNIT TESTS

To ensure complete mathematical and scientific validity, the engine is tested against automated unit tests with known ground truth (`backend/tests/test_nasa_trend_engine.py`):

| Test Case | Injected Ground Truth | Expected Result | Actual Result | Verification |
| :--- | :--- | :--- | :--- | :--- |
| `test_mann_kendall_increasing` | Monotonic linear series ($x_t = 0.5 + 0.01t$) | $S > 0$, $p < 0.001$, INCREASING | $S = +190$, $p = 0.0000$, INCREASING | **PASSED** |
| `test_mann_kendall_decreasing` | Monotonic linear series ($x_t = 0.8 - 0.015t$) | $S < 0$, $p < 0.001$, DECREASING | $S = -190$, $p = 0.0000$, DECREASING | **PASSED** |
| `test_mann_kendall_no_trend` | Zero slope with symmetric noise | $p > 0.05$, NO MONOTONIC TREND | $S = 0$, $p = 1.0000$, NO_TREND | **PASSED** |
| `test_mann_kendall_insufficient` | Sample size $N < 4$ | Raises ValueError or returns error flag | Caught cleanly, rejects insufficient $N$ | **PASSED** |
| `test_sens_slope` | Pairwise median comparison | $Q = \text{injected slope}$, $CI_{\text{lower}} \le Q \le CI_{\text{upper}}$ | Exact median matches, bounds encompass slope | **PASSED** |
| `test_seasonal_mann_kendall` | Strong seasonal sine wave with zero annual drift | Rejects false seasonal trend ($p_{\text{seasonal}} > 0.05$) | Identifies zero multi-year drift correctly | **PASSED** |
| `test_climatology_anomalies` | 12-month synthetic cycle | Mean anomaly for baseline period $\approx 0.0$ | $\sum \text{anomaly} = 0.0000$ | **PASSED** |
| `test_correlation` | Collinear series ($y = 2x$) and orthogonal series | Pearson $r = 1.0$ and $r \approx 0.0$ | $r = 1.000$ and $r = 0.021$ | **PASSED** |
| `test_pdf_and_csv_generation` | Full analysis dictionary export | Valid PDF binary header (`%PDF-`) & valid CSV rows | 5.8 KB PDF & 93-row CSV generated | **PASSED** |

**Execution Command:** `python backend/tests/run_nasa_tests.py`  
**Result:** `9/9 unit tests passed (100% success rate)`.
