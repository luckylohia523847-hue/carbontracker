from fastapi import APIRouter

router = APIRouter()


@router.get("/reports/summary")
def reports_summary():
    return {
        "year": 2026,
        "organisation": "Northstar Industries",
        "total_annual_co2e_tonnes": 248.4,
        "scope_1": 113.2,
        "scope_2": 76.1,
        "scope_3": 59.1,
        "energy_consumption_kwh": 105600,
        "water_consumption_liters": 485000,
        "waste_generated_kg": 68000,
        "recommendations_count": 5,
        "target_progress_pct": 74,
        "summary": "The organisation is trending below its quarterly reduction target and has strong opportunities in lighting and solar adoption.",
    }
