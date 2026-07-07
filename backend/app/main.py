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
    sangkwon_search.download_db()

@app.get("/")
def root():
    return {"status": "ok"}
