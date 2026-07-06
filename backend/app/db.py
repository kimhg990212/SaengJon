import os
from psycopg2 import pool

def create_pool():
    database_url = os.environ.get("DATABASE_URL")
    if database_url:
        return pool.SimpleConnectionPool(1, 10, dsn=database_url)
    host = os.environ.get("DB_HOST", "localhost")
    port = os.environ.get("DB_PORT", "5432")
    dbname = os.environ.get("DB_NAME", "saengjon")
    user = os.environ.get("DB_USER", "postgres")
    password = os.environ.get("DB_PASSWORD", "")
    return pool.SimpleConnectionPool(
        1, 10,
        host=host, port=port, dbname=dbname,
        user=user, password=password
    )

connection_pool = create_pool()

def get_conn():
    return connection_pool.getconn()

def release_conn(conn):
    connection_pool.putconn(conn)
