export const BUSINESSES = [
  { id:1, name:"수원갈비집", loc:"수원시 팔달구", cat:"한식", score:92, trend:[55,62,71,78,85,92] },
  { id:2, name:"성남PC방", loc:"성남시 분당구", cat:"기타서비스", score:88, trend:[60,65,70,75,80,88] },
  { id:3, name:"의정부 치킨나라", loc:"의정부시", cat:"닭·오리", score:85, trend:[50,58,65,72,78,85] },
  { id:4, name:"부천 꽃집", loc:"부천시 원미구", cat:"소매업", score:83, trend:[70,72,74,76,80,83] },
  { id:5, name:"안양 미용실", loc:"안양시 만안구", cat:"미용업", score:81, trend:[55,60,65,70,75,81] },
  { id:6, name:"평택 카센터", loc:"평택시", cat:"자동차", score:78, trend:[40,50,58,64,70,78] },
  { id:7, name:"고양 편의점", loc:"고양시 일산동구", cat:"편의점", score:75, trend:[60,62,65,68,72,75] },
  { id:8, name:"시흥 세탁소", loc:"시흥시", cat:"세탁업", score:73, trend:[55,58,60,63,68,73] },
  { id:9, name:"남양주 카페", loc:"남양주시", cat:"카페·제과", score:70, trend:[45,50,55,60,65,70] },
  { id:10, name:"화성 옷가게", loc:"화성시", cat:"의류소매", score:68, trend:[50,52,55,58,63,68] },
  { id:11, name:"파주 식당", loc:"파주시", cat:"한식", score:64, trend:[40,45,50,55,58,64] },
  { id:12, name:"광명 노래방", loc:"광명시", cat:"오락", score:62, trend:[55,56,58,59,61,62] },
  { id:13, name:"군포 떡볶이", loc:"군포시", cat:"분식", score:58, trend:[40,42,45,48,52,58] },
  { id:14, name:"하남 피시방", loc:"하남시", cat:"기타서비스", score:54, trend:[48,48,50,51,52,54] },
  { id:15, name:"용인 약국", loc:"용인시 수지구", cat:"의약", score:48, trend:[50,49,48,47,47,48] },
  { id:16, name:"이천 마트", loc:"이천시", cat:"슈퍼마켓", score:42, trend:[45,44,43,43,42,42] },
  { id:17, name:"여주 빵집", loc:"여주시", cat:"카페·제과", score:36, trend:[40,39,38,37,36,36] },
  { id:18, name:"양주 문구점", loc:"양주시", cat:"소매업", score:30, trend:[35,33,32,31,30,30] },
  { id:19, name:"구리 서점", loc:"구리시", cat:"소매업", score:24, trend:[30,28,27,26,25,24] },
  { id:20, name:"포천 정육점", loc:"포천시", cat:"식품소매", score:18, trend:[25,23,22,21,19,18] },
];

export const ALERTS = [
  { id:1, name:"수원갈비집", reason:"매출 3개월 연속 30% 이상 감소", score:92, color:"red" },
  { id:2, name:"성남PC방", reason:"임차료 연체 2회 + 유동인구 급감", score:88, color:"red" },
  { id:3, name:"의정부 치킨나라", reason:"동종업 밀집도 임계치 초과", score:85, color:"red" },
  { id:4, name:"부천 꽃집", reason:"계절 요인 + 경쟁업체 신규 입점", score:83, color:"orange" },
  { id:5, name:"안양 미용실", reason:"방문객 수 전월 대비 -28%", score:81, color:"orange" },
];

export const DISTRICTS = [
  { name:"수원시", cnt:42 },
  { name:"성남시", cnt:38 },
  { name:"고양시", cnt:35 },
  { name:"부천시", cnt:29 },
  { name:"안양시", cnt:24 },
  { name:"의정부시", cnt:18 },
];

export function getRisk(score) {
  if (score >= 80) return { label:"위험", color:"red" };
  if (score >= 60) return { label:"경고", color:"orange" };
  if (score >= 40) return { label:"주의", color:"yellow" };
  return { label:"안전", color:"green" };
}

export function getMonths() {
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return (d.getMonth() + 1) + '월';
  });
}