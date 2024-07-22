// "use client";

// import { useState, useEffect } from 'react';
// import { Thermometer, Wind, Droplet, Cloud } from 'lucide-react';
// import { fetchWeatherData, fetchWeeklyWeatherData, fetchMonthlyWeatherData } from '../lib/fetchWeather' // Adjust path as necessary

// export default function Weather({ city }) {
//   const [weatherData, setWeatherData] = useState(null);
//   const [weeklyWeatherData, setWeeklyWeatherData] = useState(null);
//   const [monthlyWeatherData, setMonthlyWeatherData] = useState([]);

//   useEffect(() => {
//     async function getData() {
//       try {
//         const currentWeather = await fetchWeatherData(city);
//         setWeatherData(currentWeather);

//         const { coord: { lat, lon } } = currentWeather;
//         const weeklyWeather = await fetchWeeklyWeatherData(lat, lon);
//         setWeeklyWeatherData(weeklyWeather);

//         const historicalData = [];
//         for (let i = 0; i < 5; i++) {
//           const date = new Date();
//           date.setDate(date.getDate() - i);
//           const historicalWeather = await fetchMonthlyWeatherData(lat, lon, date);
//           historicalData.push(historicalWeather);
//         }
//         setMonthlyWeatherData(historicalData);
//       } catch (error) {
//         console.error('Error fetching weather data:', error);
//       }
//     }

//     getData();
//   }, [city]);

//   if (!weatherData || !weeklyWeatherData || monthlyWeatherData.length === 0) {
//     console.log("failed to load");
//     return <div> no data from the weather api Loading...</div>;
//   }

//   const { main, wind, weather } = weatherData;
//   const tempCelsius = ((main.temp - 32) * 5) / 9;
//   const feelsLikeCelsius = ((main.feels_like - 32) * 5) / 9;

//   return (
//     <main className="p-4 flex flex-col items-center">
//       <h1 className="text-xl mb-4 font-semibold">Current Weather</h1>
//       <h3 className="text-md mb-4 font-semibold text-green-700">{city}</h3>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
//         <div className="bg-white shadow-lg rounded-lg p-4">
//           <div className="flex items-center mb-2">
//             <Thermometer className="w-6 h-6 text-green-700 mr-2" />
//             <div className="text-lg font-medium">Temperature</div>
//           </div>
//           <div className="text-gray-700 text-lg">{tempCelsius.toFixed(1)}°C</div>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-4">
//           <div className="flex items-center mb-2">
//             <Thermometer className="w-6 h-6 text-green-700 mr-2" />
//             <div className="text-lg font-medium">Feels Like</div>
//           </div>
//           <div className="text-gray-700 text-lg">{feelsLikeCelsius.toFixed(1)}°C</div>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-4">
//           <div className="flex items-center mb-2">
//             <Droplet className="w-6 h-6 text-green-700 mr-2" />
//             <div className="text-lg font-medium">Humidity</div>
//           </div>
//           <div className="text-gray-700 text-lg">{main.humidity}%</div>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-4">
//           <div className="flex items-center mb-2">
//             <Wind className="w-6 h-6 text-green-700 mr-2" />
//             <div className="text-lg font-medium">Wind Speed</div>
//           </div>
//           <div className="text-gray-700 text-lg">{wind.speed} m/s</div>
//         </div>
//         {weather.length > 0 && (
//           <div className="bg-white shadow-lg rounded-lg p-4">
//             <div className="flex items-center mb-2">
//               <Cloud className="w-6 h-6 text-green-700 mr-2" />
//               <div className="text-lg font-medium">Weather</div>
//             </div>
//             <div className="text-gray-700 text-lg capitalize">{weather[0].description}</div>
//           </div>
//         )}
//       </div>

//       <div className="bg-green-100 shadow-lg rounded-lg p-4 w-full max-w-3xl mt-4">
//         <h2 className="text-lg font-medium">Weather Advice</h2>
//         <p className="text-gray-700">{getWeatherAdvice()}</p>
//       </div>
//     </main>
//   );
// }
