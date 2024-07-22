"use client"
import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY; // Ensure this API key is correctly set

export async function fetchWeatherData(city) {
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: apiKey,
        q: city,
        aqi: 'no'
      }
    });
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function fetchWeeklyWeatherData(lat, lon) {
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json`, {
      params: {
        key: apiKey,
        q: `${lat},${lon}`,
        days: 7,
        aqi: 'no',
        alerts: 'no'
      }
    });
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weekly weather data:', error);
    throw error;
  }
}
