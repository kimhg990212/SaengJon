import requests
from app.config import NTS_API_KEY

NTS_URL = f"https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey={NTS_API_KEY}"

class NtsApiError(Exception):
    pass

def lookup_business_status(b_no: str) -> dict:
    """국세청 사업자등록 상태조회. b_no는 하이픈 없는 10자리 숫자 문자열."""
    try:
        res = requests.post(
            NTS_URL,
            json={"b_no": [b_no]},
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        res.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise NtsApiError(f"국세청 API 호출 실패: {e}")

    data = res.json()
    if data.get("status_code") != "OK":
        raise NtsApiError(f"국세청 API 비정상 응답: {data}")
    if data.get("match_cnt", 0) == 0:
        raise NtsApiError("일치하는 사업자번호가 없습니다.")

    return data["data"][0]
