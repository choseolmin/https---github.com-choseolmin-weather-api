import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useWeather(city) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  // ⬅️ 에러 상태 추가

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError(false);

    axios.get('http://localhost:4000/api/weather', { params: { city } })
      .then(res => setData(res.data))
      .catch(err => {
        console.error(err);
        setError(true);         // ⬅️ 에러 발생 시
        setData(null);          // 이전 데이터 제거
      })
      .finally(() => setLoading(false));
  }, [city]);

  return { data, loading, error };
}
