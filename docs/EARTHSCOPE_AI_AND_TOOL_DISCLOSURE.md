# EARTHSCOPE — AI & ASSISTIVE TOOL DISCLOSURE
## NASA Space Apps Challenge 2026 — Challenge #2: "Be An Earth System Trend Detective!"

**Document Version:** 1.0.0  
**Compliance Standard:** Mandatory 2026 Space Apps AI Disclosure & Academic Integrity  
**Statement of Originality:** All core algorithms, mathematical implementations, data pipelines, and UI integrations were authored by the project team.

---

## 1. Disclosure of Generative AI & Developer Tools

In compliance with the official NASA Space Apps Challenge rules, the team discloses the following tool usages during the design, coding, and documentation phases:

| Tool / Model | Role in Project Development | Nature of Generated Content | Verification & Quality Control Method |
| :--- | :--- | :--- | :--- |
| **Google Antigravity Agent** | Codebase navigation, refactoring, documentation drafting | Shell script automation, boilerplate Markdown tables, test runner harnesses | 100% human-verified and audited; tested with Python test runners and browser subagents. |
| **Google Gemini 2.5 Pro / Flash** | Assistance with mathematical formula rendering in LaTeX, drafting presentation storyboards | KaTeX markdown syntax, initial phrasing of scientific synthesis prompts | Reviewed by team domain specialists; verified against peer-reviewed literature (Gilbert 1987, Yue-Pilon 2002). |
| **GitHub Copilot / IDE Completion** | Inline auto-completion of Python typing and CSS rules | Standard code completion (e.g. typing Dict, List, CSS flexbox properties) | All code was reviewed, syntax-checked, and validated with automated regression suites. |

---

## 2. In-Application AI & Machine Learning Architecture

EARTHSCOPE does not utilize decorative or ungrounded generative AI. The AI components built into the platform operate under strict epistemic constraints:

### A. Grounded Scientific Research Analyst
- **Function:** Translates complex non-parametric outputs (Mann-Kendall $p$-values, Sen's slopes, confidence intervals) into plain-language scientific summaries for decision-makers.
- **Epistemic Guardrails:**
  - **Zero Fabrication Mandate:** The model is forbidden from inventing trends, dates, or causes not present in the calculated observation payload.
  - **Explicit Citation:** Every paragraph generated must quote the exact computed statistics (e.g., "$S = -142$, Kendall's $\tau = -0.038$, $p = 0.665$, Sen's slope = $-0.0012/\text{yr}$").
  - **Null Hypothesis Discipline:** When $p > \alpha$ ($0.05$), the assistant strictly concludes "No statistically significant monotonic trend detected ($H_0$ retained)", actively preventing premature panic or false alarms.

### B. Supervised Deforestation Benchmark Model
- **Dataset:** 908 PRODES-2022 spatial observation blocks across the Amazonian deforestation arc.
- **Model Type:** L2-regularized logistic regression trained on 32 multi-spectral vegetation and thermal indices.
- **Purpose:** Serves as a validated baseline comparator to evaluate whether current vegetation changes resemble verified land-use clearing or natural seasonal phenology.

---

## 3. Epistemic Independence & Verification

All scientific computations in EARTHSCOPE (Mann-Kendall, Sen's slope, Pearson correlation, Yue-Pilon autocorrelation) are executed via pure, deterministic Python algorithms and **do not depend on external AI APIs or black-box LLMs**. The AI layer acts strictly as an analytical synthesizer of mathematically verified facts.
