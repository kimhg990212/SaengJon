from pydantic import BaseModel, field_validator

class BusinessStatusResponse(BaseModel):
    b_no: str
    b_stt: str
    b_stt_cd: str
    tax_type: str
    end_dt: str | None = None
    cached: bool

class BusinessStatusRequest(BaseModel):
    b_no: str

    @field_validator("b_no")
    @classmethod
    def validate_b_no(cls, v: str) -> str:
        digits = v.replace("-", "").strip()
        if not digits.isdigit() or len(digits) != 10:
            raise ValueError("사업자등록번호는 하이픈 제외 10자리 숫자여야 합니다.")
        return digits
