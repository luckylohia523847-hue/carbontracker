from typing import List

from app.db import SessionLocal
from app.models import Company, Factory, MeterReading, Recommendation


def seed_demo_data():
    db = SessionLocal()
    try:
        if db.query(Company).count() == 0:
            company = Company(name="Northstar Industries", admin_email="admin@northstar.example")
            db.add(company)
            db.commit()
            db.refresh(company)

            factory = Factory(
                name="Plant A",
                location="Pune, Maharashtra",
                industry="Textiles",
                company_id=company.id,
            )
            db.add(factory)
            db.commit()
            db.refresh(factory)

            db.add_all([
                MeterReading(
                    factory_id=factory.id,
                    period="2026-06",
                    electricity_kwh=15600,
                    diesel_liters=1800,
                    petrol_liters=500,
                    natural_gas_m3=2400,
                    water_liters=62000,
                    waste_kg=8400,
                    renewable_share_pct=36.2,
                    total_co2e_kg=20180,
                ),
                Recommendation(
                    factory_id=factory.id,
                    title="Install variable frequency drives",
                    description="Replace fixed-speed compressors and motors to reduce idle-energy losses.",
                    estimated_co2e_kg=14300,
                    estimated_savings_inr=420000,
                    implementation_cost_inr=780000,
                    payback_months=18,
                    priority="High",
                ),
                Recommendation(
                    factory_id=factory.id,
                    title="Optimize transport routes",
                    description="Consolidate deliveries and adjust vehicle loads to reduce fuel consumption.",
                    estimated_co2e_kg=8600,
                    estimated_savings_inr=260000,
                    implementation_cost_inr=220000,
                    payback_months=10,
                    priority="Medium",
                ),
            ])
            db.commit()
    finally:
        db.close()
