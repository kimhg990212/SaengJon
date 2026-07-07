import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import CORS_ORIGINS
from app.routers import business
from app import sangkwon_search

app = FastAPI(title="SaengJon API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(business.router)

@app.on_event("startup")
async def startup_event():
    if os.path.exists(sangkwon_search.DB_PATH):
        print(f"sangkwon.db 확인됨: {sangkwon_search.DB_PATH}")
    else:
        print(f"WARNING: sangkwon.db 없음 — 상호명 검색 불가")

@app.get("/")
def root():
    return {"status": "ok"}
