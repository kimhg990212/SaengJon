# 환경변수를 한 곳에서 로드/관리하는 설정 모듈
from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "SaengJon API"
    database_url: str = "postgresql://postgres:postgres@localhost:5432/saengjon"
    cors_origins: list[str] = ["http://localhost:5173"]

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()
