import sqlite3
import os
from typing import Optional

DB_PATH = os.path.normpath(os.path.join(os.path.dirname(__file__), '..', 'data', 'sangkwon.db'))

def search(q: str, sgg: Optional[str] = None, limit: int = 10) -> list[dict]:
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
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM sangkwon WHERE admdong_cd = ?", (admdong_cd,))
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return rows
