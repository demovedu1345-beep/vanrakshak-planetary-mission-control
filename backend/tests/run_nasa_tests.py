import sys
import os
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parents[1]
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

import test_nasa_trend_engine as t

test_funcs = [
    t.test_mann_kendall_increasing,
    t.test_mann_kendall_decreasing,
    t.test_mann_kendall_no_trend,
    t.test_mann_kendall_insufficient_data,
    t.test_sens_slope,
    t.test_seasonal_mann_kendall,
    t.test_climatology_anomalies,
    t.test_correlation,
    t.test_pdf_and_csv_generation
]

passed = 0
for fn in test_funcs:
    try:
        fn()
        print(f"✓ {fn.__name__} PASSED")
        passed += 1
    except Exception as exc:
        print(f"✗ {fn.__name__} FAILED: {exc}")
        import traceback
        traceback.print_exc()

print(f"\nResult: {passed}/{len(test_funcs)} unit tests passed.")
if passed != len(test_funcs):
    sys.exit(1)
