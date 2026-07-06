-- Role: 소진공 상가 상권정보 테이블 및 인덱스 생성

CREATE TABLE IF NOT EXISTS sangkwon (
  bizes_id        VARCHAR(30) PRIMARY KEY,
  bizes_nm        VARCHAR(200),
  branch_nm       VARCHAR(200),
  indu_lclass_cd  VARCHAR(10),
  indu_lclass_nm  VARCHAR(100),
  indu_mclass_cd  VARCHAR(10),
  indu_mclass_nm  VARCHAR(100),
  indu_sclass_cd  VARCHAR(10),
  indu_sclass_nm  VARCHAR(100),
  sido_cd         VARCHAR(10),
  sido_nm         VARCHAR(50),
  sgg_cd          VARCHAR(10),
  sgg_nm          VARCHAR(100),
  admdong_cd      VARCHAR(10),
  admdong_nm      VARCHAR(100),
  lot_addr        VARCHAR(300),
  road_addr       VARCHAR(300),
  zip_cd          VARCHAR(10),
  lon             NUMERIC(15,10),
  lat             NUMERIC(15,10),
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sangkwon_bizes_nm     ON sangkwon(bizes_nm);
CREATE INDEX IF NOT EXISTS idx_sangkwon_admdong_cd   ON sangkwon(admdong_cd);
CREATE INDEX IF NOT EXISTS idx_sangkwon_sgg_cd       ON sangkwon(sgg_cd);
CREATE INDEX IF NOT EXISTS idx_sangkwon_indu_sclass_cd ON sangkwon(indu_sclass_cd);
