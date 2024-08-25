import { useEffect, useState, useCallback } from 'react';
import TopButtons from './Components/TopButtons';
import Search from './Components/Search';
import TimeAndLocation from './Components/TimeAndLocation';
import TempAndDetails from './Components/TempAndDetails';
import Forecast from './Components/Forecast';
import getFormattedWeatherData from './Services/WeatherServices';

const App = () => {
  // State to manage the search query (city name or geolocation)
  const [query, setQuery] = useState({ q: 'India' });

  // State to manage the temperature units (metric or imperial)
  const [units, setUnits] = useState('metric');

  // State to store weather data fetched from the API
  const [weather, setWeather] = useState(null);

  
   // Fetches the weather data based on the current query and units.
   
  const getWeather = useCallback(async () => {
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [query, units]);

  // Fetch weather data whenever query or units change
  useEffect(() => {
    getWeather();
  }, [getWeather]);

  
   // Determines the background gradient based on the current temperature.
   
  const formatBackground = () => {
    if (!weather) return 'from-cyan-600 to-blue-700';
    const threshold = units === 'metric' ? 20 : 60;
    if (weather.temp <= threshold) return 'from-cyan-600 to-blue-700';
    return 'from-yellow-600 to-orange-700';
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-10 md:px-20 lg:px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <h1 className="text-center font-bold text-3xl">Weather Forecast</h1>

      {/* Components for interacting with the app */}
      <TopButtons setQuery={setQuery} />
      <Search setQuery={setQuery} setUnits={setUnits} />

      {/* Render weather details only if weather data is available */}
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title="3 Hour Step Forecast" data={weather.hourly} />
          <Forecast title="Daily Forecast" data={weather.daily} />
        </>
      )}
    </div>
  );
};

export default App;
