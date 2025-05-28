// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

async function fetchWeather({ city, id }) {
  const url = 'https://api.openweathermap.org/data/2.5/weather';
  const params = {
    units: 'metric',
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
    const { city, id } = req.query;
    const weather = await fetchWeather({ city, id });
    res.json(weather);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: 'weather fetch error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
