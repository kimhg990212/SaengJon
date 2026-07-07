import sqlite3
import os
import requests
from typing import Optional

DB_PATH = "/tmp/sangkwon.db"
GDRIVE_FILE_ID = "1Q202Gg2hqj-rCE-DRP9rVRHE5sZtEJfq"

def download_db():
    if os.path.exists(DB_PATH):
        size = os.path.getsize(DB_PATH)
        if size > 10 * 1024 * 1024:
            print(f"sangkwon.db 이미 존재함 ({size / 1024 / 1024:.1f} MB)")
            return
        else:
            print(f"sangkwon.db 손상됨 ({size / 1024 / 1024:.1f} MB) — 재다운로드")
            os.remove(DB_PATH)

    print("sangkwon.db 다운로드 중...")
    FILE_ID = "1Q202Gg2hqj-rCE-DRP9rVRHE5sZtEJfq"

    session = requests.Session()

    response = session.get(
        "https://drive.google.com/uc",
        params={"export": "download", "id": FILE_ID},
        stream=True
    )

    confirm_token = None
    for key, value in response.cookies.items():
        if key.startswith("download_warning"):
            confirm_token = value
            break

    if not confirm_token:
        content = response.content.decode("utf-8", errors="ignore")
        import re
        match = re.search(r'confirm=([0-9A-Za-z_]+)', content)
        if match:
            confirm_token = match.group(1)

    if confirm_token:
        response = session.get(
            "https://drive.google.com/uc",
            params={"export": "download", "id": FILE_ID, "confirm": confirm_token},
            stream=True
        )

    with open(DB_PATH, 'wb') as f:
        downloaded = 0
        for chunk in response.iter_content(chunk_size=1024 * 1024):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)
                if downloaded % (20 * 1024 * 1024) == 0:
                    print(f"  {downloaded / 1024 / 1024:.0f} MB 다운로드 중...")

    size = os.path.getsize(DB_PATH)
    print(f"다운로드 완료! ({size / 1024 / 1024:.1f} MB)")

    if size < 10 * 1024 * 1024:
        print("ERROR: 파일이 너무 작음 — HTML 페이지가 저장됐을 가능성 있음")
        os.remove(DB_PATH)

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
