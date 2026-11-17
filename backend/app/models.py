from __future__ import annotations

from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    admin_email = Column(String(255), nullable=True)
    factories = relationship("Factory", back_populates="company")


class Factory(Base):
    __tablename__ = "factories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    industry = Column(String(255), nullable=False, default="Manufacturing")
    company_id = Column(Integer, ForeignKey("companies.id"))
    company = relationship("Company", back_populates="factories")
    readings = relationship("MeterReading", back_populates="factory")
    recommendations = relationship("Recommendation", back_populates="factory")


class MeterReading(Base):
    __tablename__ = "meter_readings"

    id = Column(Integer, primary_key=True, index=True)
    factory_id = Column(Integer, ForeignKey("factories.id"))
    period = Column(String(50), nullable=False)
    electricity_kwh = Column(Float, nullable=False, default=0.0)
    diesel_liters = Column(Float, nullable=False, default=0.0)
    petrol_liters = Column(Float, nullable=False, default=0.0)
    natural_gas_m3 = Column(Float, nullable=False, default=0.0)
    water_liters = Column(Float, nullable=False, default=0.0)
    waste_kg = Column(Float, nullable=False, default=0.0)
    renewable_share_pct = Column(Float, nullable=False, default=0.0)
    total_co2e_kg = Column(Float, nullable=False, default=0.0)
    factory = relationship("Factory", back_populates="readings")


class EmissionFactor(Base):
    __tablename__ = "emission_factors"

    id = Column(Integer, primary_key=True, index=True)
    source_name = Column(String(255), nullable=False)
    factor_name = Column(String(255), nullable=False)
    units = Column(String(50), nullable=False)
    value = Column(Float, nullable=False)
    scope = Column(String(20), nullable=False)
    year = Column(Integer, nullable=False)
    source_url = Column(String(500), nullable=True)


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    factory_id = Column(Integer, ForeignKey("factories.id"))
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    estimated_co2e_kg = Column(Float, nullable=False, default=0.0)
    estimated_savings_inr = Column(Float, nullable=False, default=0.0)
    implementation_cost_inr = Column(Float, nullable=False, default=0.0)
    payback_months = Column(Float, nullable=False, default=0.0)
    priority = Column(String(50), nullable=False, default="Medium")
    factory = relationship("Factory", back_populates="recommendations")


class SustainabilityTarget(Base):
    __tablename__ = "sustainability_targets"

    id = Column(Integer, primary_key=True, index=True)
    factory_id = Column(Integer, ForeignKey("factories.id"))
    target_name = Column(String(255), nullable=False)
    target_value = Column(Float, nullable=False)
    current_value = Column(Float, nullable=False)
    unit = Column(String(50), nullable=False)
