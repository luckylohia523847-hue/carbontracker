from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analytics, factories
from app.seed import seed_demo_data

app = FastAPI(title="CarbonTrack API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "carbontrack-api"}

app.include_router(factories.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")

@app.on_event("startup")
def startup_event():
    seed_demo_data()
