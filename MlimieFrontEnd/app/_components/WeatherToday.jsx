"use client";

import { useState, useEffect } from 'react';
import { Thermometer, Wind, Droplet, Cloud } from 'lucide-react';

export default function WeatherToday({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Dummy data for now
    const fetchWeatherData = async () => {
      const dummyData = {
        main: {
          temp: 86, // Fahrenheit
          feels_like: 88,
          humidity: 70
        },
        wind: {
          speed: 5 // m/s
        },
        weather: [
          {
            description: 'clear sky'
          }
        ]
      };
      setWeatherData(dummyData);
    };

    fetchWeatherData();
  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, wind, weather } = weatherData;

  const tempCelsius = ((main.temp - 32) * 5) / 9;
  const feelsLikeCelsius = ((main.feels_like - 32) * 5) / 9;

  const getWeatherAdvice = () => {
    let advice = "General farming advice: ";

    if (tempCelsius > 30) {
      advice += "It's quite hot today, ensure your crops are well-watered and consider mulching to retain soil moisture. ";
    } else if (tempCelsius < 10) {
      advice += "It's quite cold today, consider protecting young plants from frost. ";
    }

    if (main.humidity > 80) {
      advice += "High humidity can increase the risk of fungal diseases, ensure good air circulation around your plants. ";
    } else if (main.humidity < 30) {
      advice += "Low humidity can lead to plant dehydration, make sure to water your crops adequately. ";
    }

    if (wind.speed > 10) {
      advice += "High winds detected, secure any loose structures and protect young plants from wind damage. ";
    }

    if (weather[0].description.includes("rain")) {
      advice += "Rain is expected, make sure your irrigation systems are turned off to prevent overwatering. ";
    } else if (weather[0].description.includes("clear")) {
      advice += "Clear skies today, it's a good day for fieldwork and planting. ";
    }

    return advice;
  };

  return (
    <main className="p-4 flex flex-col items-center">
      <h1 className="text-xl mb-4 font-semibold">Current Weather</h1>
      <h3 className="text-md mb-4 font-semibold text-green-700">{city}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Thermometer className="w-6 h-6 text-green-700 mr-2" />
            <div className="text-lg font-medium">Temperature</div>
          </div>
          <div className="text-gray-700 text-lg">{tempCelsius.toFixed(1)}°C</div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Thermometer className="w-6 h-6 text-green-700 mr-2" />
            <div className="text-lg font-medium">Feels Like</div>
          </div>
          <div className="text-gray-700 text-lg">{feelsLikeCelsius.toFixed(1)}°C</div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Droplet className="w-6 h-6 text-green-700 mr-2" />
            <div className="text-lg font-medium">Humidity</div>
          </div>
          <div className="text-gray-700 text-lg">{main.humidity}%</div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Wind className="w-6 h-6 text-green-700 mr-2" />
            <div className="text-lg font-medium">Wind Speed</div>
          </div>
          <div className="text-gray-700 text-lg">{wind.speed} m/s</div>
        </div>
        {weather.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Cloud className="w-6 h-6 text-green-700 mr-2" />
              <div className="text-lg font-medium">Weather</div>
            </div>
            <div className="text-gray-700 text-lg capitalize">{weather[0].description}</div>
          </div>
        )}
      </div>

      <div className="bg-green-100 shadow-lg rounded-lg p-4 w-full max-w-3xl mt-4">
        <h2 className="text-lg font-medium">Weather Advice</h2>
        <p className="text-gray-700">{getWeatherAdvice()}</p>
      </div>
    </main>
  );
}
