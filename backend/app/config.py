# 환경변수 설정 — Railway는 시스템 환경변수 직접 주입, 로컬은 .env 파일 사용
import os
from dotenv import load_dotenv

load_dotenv()  # .env 없으면 조용히 무시됨

NTS_API_KEY = os.getenv("NTS_API_KEY")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
CORS_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")]
DATABASE_URL = os.getenv("DATABASE_URL")

if not NTS_API_KEY:
    print("WARNING: NTS_API_KEY가 설정되지 않았습니다.")
