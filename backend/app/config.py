import os

NTS_API_KEY = os.environ.get("NTS_API_KEY")
DB_HOST = os.environ.get("DB_HOST")
DB_PORT = os.environ.get("DB_PORT")
DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
CORS_ORIGINS = [origin.strip() for origin in os.environ.get("CORS_ORIGINS", "http://localhost:5173").split(",")]
DATABASE_URL = os.environ.get("DATABASE_URL")

if not NTS_API_KEY:
    print("WARNING: NTS_API_KEY가 설정되지 않았습니다.")
