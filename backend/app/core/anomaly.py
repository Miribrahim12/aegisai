import pandas as pd
from sklearn.ensemble import IsolationForest

model = IsolationForest(contamination=0.15, random_state=42)

def detect_anomaly(log):
    df = pd.DataFrame([{
        "requests_per_min": log.requests_per_min,
        "failed_logins": log.failed_logins
    }])

    prediction = model.fit_predict(df)[0]

    return {
        "status": "ANOMALY" if prediction == -1 else "NORMAL",
        "risk_score": 90 if prediction == -1 else 10
    }
