import csv
import os

INPUT_FILES = [
    "backend/data/소상공인시장진흥공단_상가(상권)정보_경기_202603.csv",
    "backend/data/소상공인시장진흥공단_상가(상권)정보_서울_202603.csv",
]

KEEP_COLS = [
    '상가업소번호', '상호명', '지점명',
    '상권업종대분류명', '상권업종소분류명',
    '시도명', '시군구명', '행정동코드', '행정동명',
    '도로명주소', '경도', '위도'
]

COL_MAP = {
    '상가업소번호': 'bizes_id',
    '상호명': 'bizes_nm',
    '지점명': 'branch_nm',
    '상권업종대분류명': 'indu_lclass_nm',
    '상권업종소분류명': 'indu_sclass_nm',
    '시도명': 'sido_nm',
    '시군구명': 'sgg_nm',
    '행정동코드': 'admdong_cd',
    '행정동명': 'admdong_nm',
    '도로명주소': 'road_addr',
    '경도': 'lon',
    '위도': 'lat'
}

with open('backend/data/sangkwon_index.csv', 'w', newline='', encoding='utf-8') as out:
    writer = csv.DictWriter(out, fieldnames=list(COL_MAP.values()))
    writer.writeheader()
    for f in INPUT_FILES:
        print(f"처리 중: {os.path.basename(f)}")
        with open(f, 'r', encoding='utf-8') as inp:
            reader = csv.DictReader(inp)
            for row in reader:
                writer.writerow({v: row.get(k, '') for k, v in COL_MAP.items()})

print("완료")
