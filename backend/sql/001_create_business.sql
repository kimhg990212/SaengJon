-- 이 테이블은 이미 존재하던 테이블의 실제 스키마를 기록한 것이며, 신규 생성용이 아니다.
-- 운영 DB(saengjon)에는 공공데이터 적재 파이프라인이 먼저 이 테이블을 생성했다.
-- 국세청 NTS 조회 결과는 b_stt / b_stt_cd / tax_type / end_dt / last_checked_at 컬럼에 upsert된다.
CREATE TABLE IF NOT EXISTS business (
  biz_no          VARCHAR(30)  NOT NULL,           -- 사업자등록번호 (PK)
  biz_name        VARCHAR(100),                    -- 사업체명 (공공데이터)
  industry_cd     VARCHAR(20),                     -- 업종 코드
  admdong_cd      VARCHAR(10)  REFERENCES admdong(admdong_cd),  -- 행정동 코드 (FK)
  status          VARCHAR(20),                     -- 영업 상태 (공공데이터)
  open_date       DATE,                            -- 개업일
  close_date      DATE,                            -- 폐업일
  created_at      TIMESTAMP    DEFAULT now(),      -- 레코드 생성 시각
  bizes_id        VARCHAR(30),                     -- 상권 ID
  bizes_nm        VARCHAR(100),                    -- 상권명
  lon             NUMERIC,                         -- 경도
  lat             NUMERIC,                         -- 위도
  b_stt           VARCHAR(20),                     -- 국세청 사업자 상태 (예: 계속사업자)
  b_stt_cd        VARCHAR(5),                      -- 국세청 상태 코드 (01=계속, 02=휴업, 03=폐업)
  tax_type        VARCHAR(50),                     -- 납세 유형
  end_dt          VARCHAR(8),                      -- 국세청 폐업일 (YYYYMMDD)
  last_checked_at TIMESTAMP,                       -- 국세청 마지막 조회 시각
  PRIMARY KEY (biz_no)
);
