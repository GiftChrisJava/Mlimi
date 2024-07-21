"use client";
import store from 'store2';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {africanCountries, countryCities} from '../data/africanCountries';

export default function CityCountryForm() {
  const [country, setCountry] = useState('');
  let [city, setCity] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e) => {
    city = store.set("city", city)
    e.preventDefault();
    // Redirect to the dashboard with query parameters
    router.push(`/dashboard`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="my-8 font-semibold text-xl">
        Select <span className="text-green-700">Your Location</span>
      </h2>
      <form 
        onSubmit={handleSubmit}
        className="max-w-md w-sm bg-white shadow-xl p-8 rounded-lg flex flex-col space-y-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Select Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="" disabled>Select a country</option>
            {africanCountries.map((c, index) => (
              <option key={index} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Select City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="" disabled>Select a city</option>
            {country && countryCities[country]?.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}
