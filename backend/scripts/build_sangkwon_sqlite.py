import csv
import sqlite3
import os

INPUT_FILES = [
    "backend/data/소상공인시장진흥공단_상가(상권)정보_경기_202603.csv",
]
OUTPUT_DB = "backend/data/sangkwon.db"

conn = sqlite3.connect(OUTPUT_DB)
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS sangkwon (
    bizes_id TEXT PRIMARY KEY,
    bizes_nm TEXT,
    branch_nm TEXT,
    indu_lclass_nm TEXT,
    indu_sclass_nm TEXT,
    sgg_nm TEXT,
    admdong_cd TEXT,
    admdong_nm TEXT,
    road_addr TEXT,
    lon REAL,
    lat REAL
)
""")
cur.execute("CREATE INDEX IF NOT EXISTS idx_bizes_nm ON sangkwon(bizes_nm)")
cur.execute("CREATE INDEX IF NOT EXISTS idx_admdong_cd ON sangkwon(admdong_cd)")
conn.commit()

total = 0

for INPUT_FILE in INPUT_FILES:
    print(f"처리 중: {os.path.basename(INPUT_FILE)}")
    batch = []
    file_count = 0
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if not row.get('상호명', '').strip():
                continue
            if not row.get('경도', '').strip() or not row.get('위도', '').strip():
                continue
            batch.append((
                row.get('상가업소번호', ''),
                row.get('상호명', ''),
                row.get('지점명', '') or None,
                row.get('상권업종대분류명', '') or None,
                row.get('상권업종소분류명', '') or None,
                row.get('시군구명', '') or None,
                row.get('행정동코드', '') or None,
                row.get('행정동명', '') or None,
                row.get('도로명주소', '') or None,
                float(row.get('경도', 0)) if row.get('경도') else None,
                float(row.get('위도', 0)) if row.get('위도') else None,
            ))
            if len(batch) >= 5000:
                cur.executemany("INSERT OR IGNORE INTO sangkwon VALUES (?,?,?,?,?,?,?,?,?,?,?)", batch)
                conn.commit()
                total += len(batch)
                file_count += len(batch)
                print(f"  {file_count:,}건...")
                batch = []
    if batch:
        cur.executemany("INSERT OR IGNORE INTO sangkwon VALUES (?,?,?,?,?,?,?,?,?,?,?)", batch)
        conn.commit()
        total += len(batch)
        file_count += len(batch)
    print(f"  → {file_count:,}건 완료")

conn.close()
print(f"\n전체 완료! 총 {total:,}건")
print(f"파일 크기: {os.path.getsize(OUTPUT_DB) / 1024 / 1024:.1f} MB")
