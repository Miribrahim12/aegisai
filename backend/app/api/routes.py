from fastapi import APIRouter
from app.models.schemas import LogData
from app.core.anomaly import detect_anomaly
from app.services.telegram_alert import send_telegram_alert

router = APIRouter()

@router.post("/analyze")
def analyze_logs(data: LogData):
    result = detect_anomaly(data)

    # 🚨 TELEGRAM ALERT (PUL GƏTİRƏN FEATURE)
    if result.get("risk_score", 0) >= 50:
        send_telegram_alert(
            f"🚨 *AegisAI Security Alert*\n\n"
            f"*Risk Score:* {result['risk_score']}\n"
            f"*Status:* {result['status']}\n\n"
            f"_Immediate attention required._"
        )

    return result
