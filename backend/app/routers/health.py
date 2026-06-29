# 서버 상태 확인용 헬스체크 라우터
from fastapi import APIRouter

from app.schemas.common import ApiResponse

router = APIRouter(prefix="/health", tags=["health"])


@router.get("", response_model=ApiResponse[str])
def check_health():
    return ApiResponse(data="ok")
