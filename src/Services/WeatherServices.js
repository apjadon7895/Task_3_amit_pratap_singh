import { DateTime } from "luxon";

// API key and base URL for the OpenWeatherMap API
const API_KEY = "977a71b1a2eeadba58a9a6bedf43a438";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";


 // Fetches weather data from the OpenWeatherMap API.

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      throw error;
    });
};


 // Constructs the URL for the weather icon based on the icon code.
 
const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;


 // Formats a given timestamp to local time.
 
const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs, { zone: 'UTC' })
    .plus({ seconds: offset })
    .toFormat(format);
};


 // Formats current weather data for display.
 
const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    details,
    icon: iconUrlFromCode(icon),
    speed,
    formattedLocalTime,
    timezone,
  };
};


 // Formats forecast weather data for display.
 
const formatForecastWeather = (secs, offset, data) => {
  // Filter and format hourly forecast data
  const hourly = data
    .filter((f) => f.dt > secs)
    .slice(0, 5)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      data: f.dt_txt,
    }));

  // Filter and format daily forecast data
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      data: f.dt_txt,
    }));

  return { hourly, daily };
};


 // Fetches and formats both current and forecast weather data.
 
const getFormattedWeatherData = async (searchParams) => {
  try {
    // Fetch and format current weather data
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrent);

    const { dt, lat, lon, timezone } = formattedCurrentWeather;

    // Fetch and format forecast weather data
    const formattedForecastWeather = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    }).then((d) => formatForecastWeather(dt, timezone, d.list));

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error('Error getting formatted weather data:', error);
    throw error;
  }
};

export default getFormattedWeatherData;
