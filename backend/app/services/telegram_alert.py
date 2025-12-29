import os
import requests

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

def send_telegram_alert(message: str):
    if not BOT_TOKEN or not CHAT_ID:
        return  # prod-da print YOX

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    payload = {
        "chat_id": CHAT_ID,
        "text": message,
        "parse_mode": "Markdown"
    }

    try:
        response = requests.post(url, json=payload, timeout=5)
        response.raise_for_status()
    except Exception:
        pass  # alert system heç vaxt crash etməməlidir
