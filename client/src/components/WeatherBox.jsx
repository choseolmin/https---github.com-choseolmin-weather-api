import useWeather from '../hooks/useWeather';
import WeatherIcon from './WeatherIcon';

export default function WeatherBox({ defaultCity = 'Seoul' }) {
  const { data, loading, error } = useWeather(defaultCity);

  if (loading) return <p>로딩 중...</p>;
  if (error)   return <p style={{ color: 'red' }}>⚠️ 존재하지 않는 도시입니다</p>;
  if (!data)   return null;

  return (
    <section>
      <h2>{data.city}</h2>
      <WeatherIcon icon={data.icon} />
      <p>{data.temp}°C · {data.desc}</p>
    </section>
  );
}
