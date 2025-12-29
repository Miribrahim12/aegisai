from pydantic import BaseModel

class LogData(BaseModel):
    requests_per_min: int
    failed_logins: int
