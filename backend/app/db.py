from psycopg2 import pool
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
