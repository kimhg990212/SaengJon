import psycopg2
import psycopg2.extras
import csv
import time

SUPABASE_URL = "postgresql://postgres.ldvhjzyjiqwkbzakunye:khg401564!!@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres"
CSV_PATH = "backend/data/sangkwon_dump.csv"

def connect():
    conn = psycopg2.connect(SUPABASE_URL, connect_timeout=30,
                            keepalives=1, keepalives_idle=30,
                            keepalives_interval=10, keepalives_count=5,
                            sslmode='require')
    conn.autocommit = False
    return conn

def insert_batch(conn, cur, batch, retries=3):
    sql = """
        INSERT INTO sangkwon (
            bizes_id, bizes_nm, branch_nm,
            indu_lclass_cd, indu_lclass_nm,
            indu_mclass_cd, indu_mclass_nm,
            indu_sclass_cd, indu_sclass_nm,
            sido_cd, sido_nm, sgg_cd, sgg_nm,
            admdong_cd, admdong_nm,
            lot_addr, road_addr, zip_cd, lon, lat
        ) VALUES %s
        ON CONFLICT (bizes_id) DO NOTHING
    """
    for attempt in range(retries):
        try:
            psycopg2.extras.execute_values(cur, sql, batch, page_size=5000)
            conn.commit()
            return conn, cur
        except (psycopg2.OperationalError, psycopg2.InterfaceError) as e:
            print(f"  연결 오류 ({attempt+1}/{retries}): {e} — 재연결 중...", flush=True)
            time.sleep(5)
            try:
                conn.close()
            except Exception:
                pass
            conn = connect()
            cur = conn.cursor()
    raise RuntimeError("재연결 후에도 삽입 실패")

conn = connect()
cur = conn.cursor()

batch = []
total = 0

with open(CSV_PATH, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        batch.append((
            row['bizes_id'], row['bizes_nm'], row['branch_nm'] or None,
            row['indu_lclass_cd'] or None, row['indu_lclass_nm'] or None,
            row['indu_mclass_cd'] or None, row['indu_mclass_nm'] or None,
            row['indu_sclass_cd'] or None, row['indu_sclass_nm'] or None,
            row['sido_cd'] or None, row['sido_nm'] or None,
            row['sgg_cd'] or None, row['sgg_nm'] or None,
            row['admdong_cd'] or None, row['admdong_nm'] or None,
            row['lot_addr'] or None, row['road_addr'] or None,
            row['zip_cd'] or None,
            float(row['lon']) if row['lon'] else None,
            float(row['lat']) if row['lat'] else None
        ))
        if len(batch) >= 5000:
            conn, cur = insert_batch(conn, cur, batch)
            total += len(batch)
            print(f"{total:,}건 완료...", flush=True)
            batch = []

    if batch:
        conn, cur = insert_batch(conn, cur, batch)
        total += len(batch)

print(f"마이그레이션 완료! 총 {total:,}건", flush=True)
cur.close()
conn.close()
