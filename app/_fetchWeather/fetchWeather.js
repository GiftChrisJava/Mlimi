"use client"
import axios from 'axios';

const keyToUse = '8976a318109bf631f6afef1f7e704867';

export async function fetchWeatherData(city) {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: keyToUse,
        units: 'imperial'
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
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/onecall`, {
      params: {
        lat: lat,
        lon: lon,
        exclude: 'hourly,minutely',
        appid: keyToUse,
        units: 'imperial'
      }
    });
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weekly weather data:', error);
    throw error;
  }
}
