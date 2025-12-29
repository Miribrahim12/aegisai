from fastapi import APIRouter
from app.models.schemas import LogData
from app.core.anomaly import detect_anomaly

router = APIRouter()

@router.post("/analyze")
def analyze_logs(data: LogData):
    result = detect_anomaly(data)
    return result
