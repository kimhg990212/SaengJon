const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchBusinessStatus(bNo) {
  const res = await fetch(`${API_BASE_URL}/api/business/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ b_no: bNo }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || '사업자 상태 조회에 실패했습니다.');
  }
  return res.json();
}
