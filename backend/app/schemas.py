from pydantic import BaseModel, Field
from typing import Optional


class FactoryCreate(BaseModel):
    name: str
    location: str
    industry: str = "Manufacturing"
    company_id: int


class FactoryRead(BaseModel):
    id: int
    name: str
    location: str
    industry: str
    company_id: int

    class Config:
        orm_mode = True


class MeterReadingCreate(BaseModel):
    factory_id: int
    period: str
    electricity_kwh: float = 0.0
    diesel_liters: float = 0.0
    petrol_liters: float = 0.0
    natural_gas_m3: float = 0.0
    water_liters: float = 0.0
    waste_kg: float = 0.0
    renewable_share_pct: float = 0.0
    total_co2e_kg: float = 0.0


class DashboardOverview(BaseModel):
    total_emissions_tco2e: float
    electricity_kwh: float
    fuel_liters: float
    water_liters: float
    waste_kg: float
    renewable_share_pct: float
    reduction_vs_last_year_pct: float
    monthly_trend: list[dict]
    process_breakdown: list[dict]
    recommendations: list[dict]
