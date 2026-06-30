# 생존프로젝트 (SaengJon)

경기도 소상공인 폐업 선행 예측 서비스.

## 프로젝트 구조

```
SaengJon-main/
├── backend/          # FastAPI 백엔드
│   ├── app/
│   │   ├── apis/     # 외부 API 클라이언트 (국세청 NTS)
│   │   ├── routers/  # 라우터 (business)
│   │   ├── schemas/  # Pydantic 스키마
│   │   ├── config.py
│   │   ├── db.py
│   │   └── main.py
│   ├── sql/          # DB 스키마 기록
│   ├── .env          # 환경변수 (gitignore)
│   └── requirements.txt
└── frontend/         # React + Vite 프론트엔드
    ├── src/
    │   ├── api/      # API 클라이언트 (businessApi.js)
    │   ├── components/
    │   ├── pages/
    │   └── data/
    ├── .env.local    # 프론트 환경변수 (gitignore)
    └── package.json
```

## 실행 방법

### 백엔드
```bash
cd backend
python -m uvicorn app.main:app --reload
# → http://localhost:8000
```

### 프론트엔드 개발 서버
```bash
cd frontend
npm run dev
# → http://localhost:5173 (또는 5174)
```

### 프론트엔드 배포 (GitHub Pages)
```bash
cd frontend
npm run deploy
# predeploy: npm run build → dist/ 생성
# deploy: gh-pages -d dist → GitHub Pages 업로드
```

## 환경변수

### backend/.env
```
NTS_API_KEY=...
DB_HOST=localhost
DB_PORT=5432
DB_NAME=saengjon
DB_USER=postgres
DB_PASSWORD=...
CORS_ORIGINS=http://localhost:5173,http://localhost:5174,https://www.saengjon.site
```

### frontend/.env.local
```
VITE_API_URL=http://localhost:8000
```

## 주요 API

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/` | 서버 상태 확인 |
| POST | `/api/business/status` | 국세청 사업자 상태 조회 (24h 캐시) |
