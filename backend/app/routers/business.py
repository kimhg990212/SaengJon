from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from app.db import get_conn, release_conn
from app.apis.nts_api import lookup_business_status, NtsApiError
from app.schemas.business import BusinessStatusRequest, BusinessStatusResponse, SangkwonResult
from app import sangkwon_search

router = APIRouter(prefix="/api/business", tags=["business"])

CACHE_HOURS = 24

@router.post("/status", response_model=BusinessStatusResponse)
def get_business_status(req: BusinessStatusRequest):
    b_no = req.b_no
    conn = get_conn()
    try:
        cur = conn.cursor()

        cur.execute(
            "SELECT biz_no, b_stt, b_stt_cd, tax_type, end_dt, last_checked_at "
            "FROM business WHERE biz_no = %s", (b_no,)
        )
        row = cur.fetchone()

        if row and row[5] and row[5] > datetime.now() - timedelta(hours=CACHE_HOURS):
            return BusinessStatusResponse(
                b_no=row[0], b_stt=row[1], b_stt_cd=row[2],
                tax_type=row[3], end_dt=row[4], cached=True
            )

        try:
            result = lookup_business_status(b_no)
        except NtsApiError as e:
            raise HTTPException(status_code=502, detail=str(e))

        cur.execute("""
            INSERT INTO business (biz_no, b_stt, b_stt_cd, tax_type, end_dt, last_checked_at)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (biz_no) DO UPDATE SET
                b_stt = EXCLUDED.b_stt,
                b_stt_cd = EXCLUDED.b_stt_cd,
                tax_type = EXCLUDED.tax_type,
                end_dt = EXCLUDED.end_dt,
                last_checked_at = EXCLUDED.last_checked_at
        """, (
            result["b_no"], result["b_stt"], result["b_stt_cd"],
            result["tax_type"], result.get("end_dt") or None, datetime.now()
        ))
        conn.commit()

        return BusinessStatusResponse(
            b_no=result["b_no"], b_stt=result["b_stt"], b_stt_cd=result["b_stt_cd"],
            tax_type=result["tax_type"], end_dt=result.get("end_dt") or None, cached=False
        )
    finally:
        release_conn(conn)


@router.get("/search")
def search_store(q: str, sgg: str | None = None):
    """임시 비활성화 — 빈 결과 반환"""
    return []
