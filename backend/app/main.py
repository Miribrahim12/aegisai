from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="AegisAI",
    description="AI-powered Anomaly Detection Platform",
    version="1.0"
)

app.include_router(router)