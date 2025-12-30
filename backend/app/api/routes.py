from fastapi import APIRouter, UploadFile, File
import csv
import io

from app.models.schemas import LogData
from app.core.anomaly import detect_anomaly
from app.services.telegram_alert import send_telegram_alert

router = APIRouter()

@router.post("/analyze")
def analyze_logs(data: LogData):
    result = detect_anomaly(data)

    if result["status"] in ["WARNING", "CRITICAL"]:
        send_telegram_alert(
            f"""
🚨 AegisAI Security Alert
Status: {result['status']}
Risk Score: {result['risk_score']}
Reason: {result['explanation']}
"""
        )

    return result


@router.post("/analyze-csv")
async def analyze_csv(file: UploadFile = File(...)):
    content = await file.read()
    decoded = content.decode("utf-8")
    reader = csv.DictReader(io.StringIO(decoded))

    results = []

    for row in reader:
        data_obj = type(
            "LogObj",
            (),
            {
                "requests_per_min": int(row["requests_per_min"]),
                "failed_logins": int(row["failed_logins"]),
            },
        )

        result = detect_anomaly(data_obj)

        if result["status"] in ["WARNING", "CRITICAL"]:
            send_telegram_alert(
                f"""
🚨 AegisAI Security Alert
Status: {result['status']}
Risk Score: {result['risk_score']}
Reason: {result['explanation']}
"""
            )

        results.append(result)

    return {"results": results}
