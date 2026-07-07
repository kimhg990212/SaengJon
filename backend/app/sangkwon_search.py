import sqlite3
import os
import requests
from typing import Optional

DB_PATH = "/tmp/sangkwon.db"
GDRIVE_FILE_ID = "1Q202Gg2hqj-rCE-DRP9rVRHE5sZtEJfq"

def download_db():
    if os.path.exists(DB_PATH):
        print(f"sangkwon.db 이미 존재함 ({os.path.getsize(DB_PATH) / 1024 / 1024:.1f} MB)")
        return
    print("sangkwon.db 다운로드 중...")
    url = f"https://drive.google.com/uc?export=download&id={GDRIVE_FILE_ID}"
    session = requests.Session()
    response = session.get(url, stream=True)
    token = None
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            token = value
    if token:
        url = f"https://drive.google.com/uc?export=download&id={GDRIVE_FILE_ID}&confirm={token}"
        response = session.get(url, stream=True)
    with open(DB_PATH, 'wb') as f:
        for chunk in response.iter_content(chunk_size=32768):
            if chunk:
                f.write(chunk)
    print(f"다운로드 완료! ({os.path.getsize(DB_PATH) / 1024 / 1024:.1f} MB)")

def search(q: str, sgg: Optional[str] = None, limit: int = 10) -> list[dict]:
    if not os.path.exists(DB_PATH):
        return []
    if len(q.strip()) < 2:
        return []
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    sql = "SELECT * FROM sangkwon WHERE bizes_nm LIKE ? "
    params: list = [f"%{q.strip()}%"]
    if sgg:
        sql += "AND sgg_nm LIKE ? "
        params.append(f"%{sgg.strip()}%")
    sql += "LIMIT ?"
    params.append(limit)
    cur.execute(sql, params)
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return rows

def get_by_admdong(admdong_cd: str) -> list[dict]:
    if not os.path.exists(DB_PATH):
        return []
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM sangkwon WHERE admdong_cd = ?", (admdong_cd,))
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return rows
