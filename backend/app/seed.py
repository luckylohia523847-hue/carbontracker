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

            plant_a = Factory(
                name="Plant A",
                location="Pune, Maharashtra",
                industry="Textiles",
                company_id=company.id,
            )
            plant_b = Factory(
                name="Plant B",
                location="Ahmednagar, Maharashtra",
                industry="FMCG",
                company_id=company.id,
            )
            db.add_all([plant_a, plant_b])
            db.commit()
            db.refresh(plant_a)
            db.refresh(plant_b)

            db.add_all([
                MeterReading(
                    factory_id=plant_a.id,
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
                MeterReading(
                    factory_id=plant_b.id,
                    period="2026-06",
                    electricity_kwh=12800,
                    diesel_liters=900,
                    petrol_liters=350,
                    natural_gas_m3=1980,
                    water_liters=54000,
                    waste_kg=6200,
                    renewable_share_pct=28.5,
                    total_co2e_kg=17240,
                ),
                Recommendation(
                    factory_id=plant_a.id,
                    title="Install variable frequency drives",
                    description="Replace fixed-speed compressors and motors to reduce idle-energy losses.",
                    estimated_co2e_kg=14300,
                    estimated_savings_inr=420000,
                    implementation_cost_inr=780000,
                    payback_months=18,
                    priority="High",
                ),
                Recommendation(
                    factory_id=plant_a.id,
                    title="Optimize transport routes",
                    description="Consolidate deliveries and adjust vehicle loads to reduce fuel consumption.",
                    estimated_co2e_kg=8600,
                    estimated_savings_inr=260000,
                    implementation_cost_inr=220000,
                    payback_months=10,
                    priority="Medium",
                ),
                Recommendation(
                    factory_id=plant_b.id,
                    title="Rooftop solar feasibility review",
                    description="Assess rooftop solar capacity to offset peak electricity consumption.",
                    estimated_co2e_kg=9800,
                    estimated_savings_inr=320000,
                    implementation_cost_inr=640000,
                    payback_months=20,
                    priority="High",
                ),
            ])
            db.commit()
    finally:
        db.close()
