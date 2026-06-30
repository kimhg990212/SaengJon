import os
from dotenv import load_dotenv

load_dotenv()

NTS_API_KEY = os.getenv("NTS_API_KEY")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "").split(",")

if not NTS_API_KEY:
    raise RuntimeError("NTS_API_KEY가 .env에 없습니다.")
