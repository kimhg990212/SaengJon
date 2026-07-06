# Role: 소진공 상가 상권정보 CSV → PostgreSQL 배치 적재 스크립트
import csv
import os
import sys
import psycopg2
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

FILES = [
    "backend/data/소상공인시장진흥공단_상가(상권)정보_경기_202603.csv",
    "backend/data/소상공인시장진흥공단_상가(상권)정보_인천_202603.csv",
    "backend/data/소상공인시장진흥공단_상가(상권)정보_서울_202603.csv",
]

COL_MAP = {
    "상가업소번호": "bizes_id",
    "상호명":       "bizes_nm",
    "지점명":       "branch_nm",
    "상권업종대분류코드": "indu_lclass_cd",
    "상권업종대분류명":   "indu_lclass_nm",
    "상권업종중분류코드": "indu_mclass_cd",
    "상권업종중분류명":   "indu_mclass_nm",
    "상권업종소분류코드": "indu_sclass_cd",
    "상권업종소분류명":   "indu_sclass_nm",
    "시도코드":     "sido_cd",
    "시도명":       "sido_nm",
    "시군구코드":   "sgg_cd",
    "시군구명":     "sgg_nm",
    "행정동코드":   "admdong_cd",
    "행정동명":     "admdong_nm",
    "지번주소":     "lot_addr",
    "도로명주소":   "road_addr",
    "신우편번호":   "zip_cd",
    "경도":         "lon",
    "위도":         "lat",
}

UPSERT_SQL = """
INSERT INTO sangkwon (
    bizes_id, bizes_nm, branch_nm,
    indu_lclass_cd, indu_lclass_nm,
    indu_mclass_cd, indu_mclass_nm,
    indu_sclass_cd, indu_sclass_nm,
    sido_cd, sido_nm, sgg_cd, sgg_nm,
    admdong_cd, admdong_nm,
    lot_addr, road_addr, zip_cd, lon, lat
) VALUES (
    %(bizes_id)s, %(bizes_nm)s, %(branch_nm)s,
    %(indu_lclass_cd)s, %(indu_lclass_nm)s,
    %(indu_mclass_cd)s, %(indu_mclass_nm)s,
    %(indu_sclass_cd)s, %(indu_sclass_nm)s,
    %(sido_cd)s, %(sido_nm)s, %(sgg_cd)s, %(sgg_nm)s,
    %(admdong_cd)s, %(admdong_nm)s,
    %(lot_addr)s, %(road_addr)s, %(zip_cd)s, %(lon)s, %(lat)s
)
ON CONFLICT (bizes_id) DO UPDATE SET
    bizes_nm       = EXCLUDED.bizes_nm,
    indu_sclass_nm = EXCLUDED.indu_sclass_nm,
    road_addr      = EXCLUDED.road_addr,
    lon            = EXCLUDED.lon,
    lat            = EXCLUDED.lat
"""

BATCH = 2000


def v(s):
    """빈 문자열 → None"""
    return s.strip() if s and s.strip() else None


def to_float(s):
    try:
        return float(s)
    except (TypeError, ValueError):
        return None


def load_file(cur, path):
    count = 0
    batch = []
    with open(path, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            record = {}
            for csv_col, db_col in COL_MAP.items():
                raw = row.get(csv_col, "")
                if db_col in ("lon", "lat"):
                    record[db_col] = to_float(raw)
                else:
                    record[db_col] = v(raw)

            if not record["bizes_id"]:
                continue

            batch.append(record)
            if len(batch) >= BATCH:
                cur.executemany(UPSERT_SQL, batch)
                count += len(batch)
                batch.clear()
                if count % 10000 == 0:
                    print(f"  {count:,}건 처리 중...")

    if batch:
        cur.executemany(UPSERT_SQL, batch)
        count += len(batch)

    return count


def main():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        dbname=os.getenv("DB_NAME", "saengjon"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD"),
    )
    conn.autocommit = False
    cur = conn.cursor()

    total = 0
    for fpath in FILES:
        if not os.path.exists(fpath):
            print(f"[SKIP] 파일 없음: {fpath}", file=sys.stderr)
            continue
        fname = os.path.basename(fpath)
        print(f"\n[{fname}] 적재 시작...")
        cnt = load_file(cur, fpath)
        conn.commit()
        print(f"[{fname}] 완료 → {cnt:,}건")
        total += cnt

    cur.close()
    conn.close()
    print(f"\n전체 합계: {total:,}건 적재 완료")


if __name__ == "__main__":
    main()
