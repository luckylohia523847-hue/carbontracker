from fastapi import APIRouter

router = APIRouter()


@router.get("/dashboard/overview")
def dashboard_overview():
    return {
        "total_emissions_tco2e": 248.4,
        "electricity_kwh": 105600,
        "fuel_liters": 42250,
        "water_liters": 485000,
        "waste_kg": 68000,
        "renewable_share_pct": 34.6,
        "reduction_vs_last_year_pct": 18.2,
        "monthly_trend": [
            {"month": "Jan", "emissions": 28.5, "target": 24.0},
            {"month": "Feb", "emissions": 27.1, "target": 23.5},
            {"month": "Mar", "emissions": 25.9, "target": 23.0},
            {"month": "Apr", "emissions": 24.5, "target": 22.8},
            {"month": "May", "emissions": 23.4, "target": 22.0},
            {"month": "Jun", "emissions": 22.8, "target": 21.8},
            {"month": "Jul", "emissions": 21.3, "target": 21.1},
        ],
        "process_breakdown": [
            {"name": "Boiler", "value": 32},
            {"name": "Machinery", "value": 26},
            {"name": "Logistics", "value": 18},
            {"name": "Waste", "value": 15},
            {"name": "Lighting", "value": 9},
        ],
        "recommendations": [
            {"title": "LED lighting retrofit", "impact": "12.5 tCO₂e", "savings": "₹ 3.2L"},
            {"title": "Rooftop solar feasibility", "impact": "18.1 tCO₂e", "savings": "₹ 5.6L"},
            {"title": "Route optimization", "impact": "6.9 tCO₂e", "savings": "₹ 2.1L"},
        ],
        "factories": [
            {"name": "Plant A", "location": "Pune", "emissions": "132.4 tCO₂e", "status": "Below target"},
            {"name": "Plant B", "location": "Ahmednagar", "emissions": "116.1 tCO₂e", "status": "Improving"},
        ],
    }
