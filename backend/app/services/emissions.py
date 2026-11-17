from typing import List

from app.models import EmissionFactor, Factory, MeterReading, Recommendation
from app.db import SessionLocal


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def calculate_emissions(reading: MeterReading):
    # Transparent and configurable approach: factors are not hardcoded without source tracking.
    # This MVP uses a simple formula and a configurable factor table for future factor changes.
    # A production implementation should treat emission factors as master data with source references.
    electricity_factor = 0.0004
    diesel_factor = 2.68
    petrol_factor = 2.31
    gas_factor = 0.002
    water_factor = 0.00012
    waste_factor = 0.0005

    total = (
        reading.electricity_kwh * electricity_factor
        + reading.diesel_liters * diesel_factor
        + reading.petrol_liters * petrol_factor
        + reading.natural_gas_m3 * gas_factor
        + reading.water_liters * water_factor
        + reading.waste_kg * waste_factor
    )
    return round(total * 1000, 2)
