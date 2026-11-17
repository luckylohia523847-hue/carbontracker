from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models import Company, Factory, MeterReading, Recommendation, EmissionFactor
from app.schemas import FactoryCreate, MeterReadingCreate
from app.services.emissions import calculate_emissions

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/factories")
def list_factories(db: Session = Depends(get_db)):
    factories = db.query(Factory).all()
    return [{
        "id": item.id,
        "name": item.name,
        "location": item.location,
        "industry": item.industry,
        "company_id": item.company_id,
    } for item in factories]


@router.post("/factories")
def create_factory(payload: FactoryCreate, db: Session = Depends(get_db)):
    factory = Factory(**payload.dict())
    db.add(factory)
    db.commit()
    db.refresh(factory)
    return {"id": factory.id, "message": "Factory created"}


@router.get("/factories/{factory_id}/readings")
def get_readings(factory_id: int, db: Session = Depends(get_db)):
    readings = db.query(MeterReading).filter(MeterReading.factory_id == factory_id).all()
    return [{
        "id": item.id,
        "period": item.period,
        "electricity_kwh": item.electricity_kwh,
        "diesel_liters": item.diesel_liters,
        "petrol_liters": item.petrol_liters,
        "natural_gas_m3": item.natural_gas_m3,
        "water_liters": item.water_liters,
        "waste_kg": item.waste_kg,
        "renewable_share_pct": item.renewable_share_pct,
        "total_co2e_kg": item.total_co2e_kg,
    } for item in readings]


@router.post("/consumption")
def create_reading(payload: MeterReadingCreate, db: Session = Depends(get_db)):
    reading = MeterReading(**payload.dict())
    reading.total_co2e_kg = calculate_emissions(reading)
    db.add(reading)
    db.commit()
    db.refresh(reading)
    return {"id": reading.id, "total_co2e_kg": reading.total_co2e_kg}


@router.get("/emission-factors")
def list_factors(db: Session = Depends(get_db)):
    factors = db.query(EmissionFactor).all()
    return [{
        "id": item.id,
        "source_name": item.source_name,
        "factor_name": item.factor_name,
        "units": item.units,
        "value": item.value,
        "scope": item.scope,
        "year": item.year,
        "source_url": item.source_url,
    } for item in factors]


@router.get("/recommendations")
def list_recommendations(db: Session = Depends(get_db)):
    recommendations = db.query(Recommendation).all()
    return [{
        "id": item.id,
        "factory_id": item.factory_id,
        "title": item.title,
        "description": item.description,
        "estimated_co2e_kg": item.estimated_co2e_kg,
        "estimated_savings_inr": item.estimated_savings_inr,
        "implementation_cost_inr": item.implementation_cost_inr,
        "payback_months": item.payback_months,
        "priority": item.priority,
    } for item in recommendations]
