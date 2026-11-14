import math
from app.services.nasa_trend_engine import (
    mann_kendall_test,
    sens_slope_estimator,
    seasonal_mann_kendall_test,
    compute_climatology_anomalies,
    multi_variable_correlation,
    generate_trend_data_csv,
    generate_trend_report_pdf,
    NASA_VARIABLE_CATALOGUE,
    VERIFIED_AOIS,
)

def test_mann_kendall_increasing():
    # Strictly increasing sequence (n=12)
    vals = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0]
    res = mann_kendall_test(vals, alpha=0.05)
    assert res["valid"] is True
    assert res["stat_s"] == 12 * 11 // 2  # 66
    assert res["z"] > 0
    assert res["p_value"] < 0.001
    assert res["is_significant"] is True
    assert res["trend"] == "SIGNIFICANT_INCREASING"

def test_mann_kendall_decreasing():
    # Strictly decreasing sequence (n=12)
    vals = [12.0 - i for i in range(12)]
    res = mann_kendall_test(vals, alpha=0.05)
    assert res["valid"] is True
    assert res["stat_s"] == -66
    assert res["z"] < 0
    assert res["p_value"] < 0.001
    assert res["is_significant"] is True
    assert res["trend"] == "SIGNIFICANT_DECREASING"

def test_mann_kendall_no_trend():
    # Alternating sequence with zero net trend
    vals = [10.0, 10.1, 10.0, 10.1, 10.0, 10.1, 10.0, 10.1, 10.0, 10.1, 10.0, 10.1]
    res = mann_kendall_test(vals, alpha=0.05)
    assert res["valid"] is True
    assert res["is_significant"] is False
    assert res["trend"] == "NO_SIGNIFICANT_TREND"

def test_mann_kendall_insufficient_data():
    # Less than 10 observations must return insufficient data
    vals = [1.0, 2.0, 3.0, 4.0]
    res = mann_kendall_test(vals)
    assert res["valid"] is False
    assert res["trend"] == "INSUFFICIENT_DATA"

def test_sens_slope():
    # Linear slope of 0.5 per month -> annual rate = 6.0
    vals = [10.0 + 0.5 * i for i in range(15)]
    mk = mann_kendall_test(vals)
    sens = sens_slope_estimator(vals, mk["var_s"], alpha=0.05)
    assert sens["valid"] is True
    assert math.isclose(sens["slope_per_month"], 0.5, abs_tol=1e-4)
    assert math.isclose(sens["annual_rate"], 6.0, abs_tol=1e-4)
    assert sens["ci_lower_annual"] <= sens["annual_rate"] <= sens["ci_upper_annual"]

def test_seasonal_mann_kendall():
    # 24 months of data (2 years)
    series = []
    for y in (2020, 2021):
        for m in range(1, 13):
            # Strong seasonal cycle with slight yearly increase
            val = (y - 2020) * 1.5 + (m % 4)
            series.append({"date": f"{y}-{m:02d}", "value": val})

    res = seasonal_mann_kendall_test(series, alpha=0.05)
    assert res["valid"] is True
    assert "seasonal_s" in res
    assert "seasonal_p_value" in res

def test_climatology_anomalies():
    series = [
        {"date": "2020-01", "value": 10.0},
        {"date": "2021-01", "value": 12.0},
        {"date": "2020-02", "value": 20.0},
        {"date": "2021-02", "value": 20.0},
    ]
    anoms = compute_climatology_anomalies(series)
    assert len(anoms) == 4
    # Jan mean = 11.0. 2020-01 anomaly = -1.0, 2021-01 anomaly = +1.0
    jan_2020 = next(x for x in anoms if x["date"] == "2020-01")
    assert math.isclose(jan_2020["climatology_mean"], 11.0, abs_tol=1e-4)
    assert math.isclose(jan_2020["anomaly"], -1.0, abs_tol=1e-4)

def test_correlation():
    # Perfectly correlated series
    sa = [{"date": f"2020-{i:02d}", "value": float(i)} for i in range(1, 11)]
    sb = [{"date": f"2020-{i:02d}", "value": float(i * 2 + 5)} for i in range(1, 11)]
    res = multi_variable_correlation(sa, sb)
    assert res["valid"] is True
    assert math.isclose(res["pearson_r"], 1.0, abs_tol=1e-3)
    assert res["is_significant"] is True

def test_pdf_and_csv_generation():
    analysis_mock = {
        "aoi": VERIFIED_AOIS["kodagu"],
        "variable": NASA_VARIABLE_CATALOGUE["modis_ndvi"],
        "time_range": {
            "start_year": 2020,
            "end_year": 2021,
            "start_date": "2020-01",
            "end_date": "2021-12",
            "total_months": 24,
            "valid_months": 24,
            "coverage_pct": 100.0
        },
        "statistics": {
            "mean": 0.75,
            "std": 0.05,
            "min": 0.65,
            "max": 0.85,
            "mann_kendall": {
                "stat_s": -25,
                "var_s": 500.0,
                "z": -1.07,
                "p_value": 0.28,
                "tau": -0.09,
                "is_significant": False
            },
            "sens_slope": {
                "annual_rate": -0.002,
                "ci_lower_annual": -0.005,
                "ci_upper_annual": +0.001
            }
        },
        "provenance": {
            "dataset": "MODIS MOD13A3",
            "product_id": "MOD13A3.061",
            "daac": "LP DAAC",
            "doi": "10.5067/MODIS/MOD13A3.061",
            "data_type": "DIRECT_OBSERVATION",
            "spatial_resolution": "1 km",
            "temporal_resolution": "Monthly",
            "units": "NDVI index"
        },
        "explanation": {
            "what_changed": "Slight downward drift",
            "how_much_changed": "-0.002 units / yr",
            "ecological_interpretation": "Canopy fluctuation within typical bounds",
            "scientific_limitations": "NDVI does not measure tree count directly."
        },
        "time_series": [
            {"date": "2020-01", "value": 0.74, "qa": "VALID"},
            {"date": "2020-02", "value": 0.72, "qa": "VALID"}
        ],
        "anomalies": [
            {"date": "2020-01", "observed": 0.74, "climatology_mean": 0.74, "anomaly": 0.0}
        ]
    }

    # Test PDF generation
    pdf_bytes = generate_trend_report_pdf(analysis_mock)
    assert len(pdf_bytes) > 1000
    assert pdf_bytes.startswith(b"%PDF")

    # Test CSV generation
    csv_str = generate_trend_data_csv(analysis_mock)
    assert "date,observed_value,climatology_mean" in csv_str
    assert "2020-01" in csv_str
