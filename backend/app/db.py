# Role: DB 연결 풀 - DATABASE_URL 우선, 없으면 개별 환경변수 사용
import os
from psycopg2 import pool
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    connection_pool = pool.SimpleConnectionPool(1, 10, dsn=DATABASE_URL)
else:
    from app.config import DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
    connection_pool = pool.SimpleConnectionPool(
        1, 10,
        host=DB_HOST, port=DB_PORT, dbname=DB_NAME,
        user=DB_USER, password=DB_PASSWORD
    )

def get_conn():
    return connection_pool.getconn()

def release_conn(conn):
    connection_pool.putconn(conn)
