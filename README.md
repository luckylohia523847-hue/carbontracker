# CarbonTrack

Industrial energy and carbon management SaaS platform for factories, manufacturing plants, and industrial operations.

## Overview

CarbonTrack helps organisations track electricity, fuel, water, waste, and process emissions; identify hotspots; generate reduction recommendations; and build sustainability reports for ESG and compliance workflows.

## MVP scope

- Organization and multi-factory management
- Role-based access control and secure auth foundation
- Factory dashboard with KPI cards and charts
- Consumption and utility data ingestion
- Emissions calculations with configurable and source-traceable factors
- Recommendations engine and benchmarking
- PDF and Excel export foundation
- IoT-ready architecture for future smart meters and sensors
- Docker-based local deployment

## Stack

Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- Recharts
- Lucide icons

Backend:
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pandas

## Local development

```bash
docker-compose up --build
```

Then access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API docs: http://localhost:8000/docs

## Project structure

```text
backend/
frontend/
```

## Notes

Design choices intentionally separate manual data entry from future IoT integrations so the platform can evolve from spreadsheet-driven monitoring to sensor-based monitoring with minimal disruption.
