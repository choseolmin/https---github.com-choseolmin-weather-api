// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import cache from 'memory-cache'; // ✅ 캐시 라이브러리 추가

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

async function fetchWeather({ city, id }) {
  const url = 'https://api.openweathermap.org/data/2.5/weather';
  const params = {
    units: 'metric',
    lang: 'kr',
    appid: process.env.OPENWEATHER_KEY,
  };

  if (id) params.id = id;
  else params.q = city || 'Seoul';

  const { data } = await axios.get(url, { params });

  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    icon: data.weather[0].icon,
    desc: data.weather[0].description,
  };

}

app.get('/api/weather', async (req, res) => {
  try {
    const { city = 'Seoul', id } = req.query;
    const key = id || city;
    const cacheKey = `weather:${key}`;

    // ✅ 1. 캐시 확인
    const cached = cache.get(cacheKey);
    if (cached) {
      console.log('📦 [CACHE HIT]', cacheKey);
      return res.json(cached);
    }

    // ✅ 2. 캐시가 없으면 API 요청
    const weather = await fetchWeather({ city, id });

    // ✅ 3. 캐시 저장 (300초 = 5분)
    cache.put(cacheKey, weather, 300 * 1000);

    console.log('📦 [CACHE MISS]', cacheKey);
    res.json(weather);
  } catch (e) {
    console.error('[ERROR]', e.message);
    res.status(500).json({ message: 'weather fetch error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
