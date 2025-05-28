import { useState } from 'react';
import WeatherBox from './WeatherBox';

export default function WeatherApp() {
  const [input, setInput] = useState('Seoul');   // 입력된 텍스트
  const [city, setCity] = useState('Seoul');     // 실제 요청용 도시

  const handleSearch = () => {
    setCity(input);  // 버튼 클릭 or 엔터 시 도시 적용
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',      // 가로 가운데 정렬
      justifyContent: 'center',  // 세로 가운데 정렬
      minHeight: '100vh',        // 화면 전체 높이
      textAlign: 'center',
    }}>
      <h1>🌦 날씨 확인기</h1>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="도시 이름을 입력하세요 (예: Busan)"
          style={{ fontSize: '1.2rem', padding: '0.5rem', flex: 1 }}
        />
        <button
          onClick={handleSearch}
          style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}
        >
          조회
        </button>
      </div>
      <WeatherBox defaultCity={city} />
    </main>
  );
}
