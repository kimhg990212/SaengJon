from pydantic import BaseModel, field_validator
from typing import Optional

class BusinessStatusResponse(BaseModel):
    b_no: str
    b_stt: str
    b_stt_cd: str
    tax_type: str
    end_dt: str | None = None
    cached: bool

class SangkwonResult(BaseModel):
    bizes_id: str
    bizes_nm: str
    branch_nm: Optional[str] = None
    indu_lclass_nm: Optional[str] = None
    indu_mclass_nm: Optional[str] = None
    indu_sclass_nm: Optional[str] = None
    indu_sclass_cd: Optional[str] = None
    sgg_nm: Optional[str] = None
    admdong_cd: Optional[str] = None
    admdong_nm: Optional[str] = None
    road_addr: Optional[str] = None
    lon: Optional[float] = None
    lat: Optional[float] = None


class BusinessStatusRequest(BaseModel):
    b_no: str

    @field_validator("b_no")
    @classmethod
    def validate_b_no(cls, v: str) -> str:
        digits = v.replace("-", "").strip()
        if not digits.isdigit() or len(digits) != 10:
            raise ValueError("사업자등록번호는 하이픈 제외 10자리 숫자여야 합니다.")
        return digits
