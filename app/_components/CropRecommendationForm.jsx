"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { africanCountries, countryCities } from '../data/africanCountries';

export default function CropRecommendationForm({ onSave }) {
  const [images, setImages] = useState([]);
  const [soilPH, setSoilPH] = useState('');
  const [soilMoisture, setSoilMoisture] = useState('');
  const [soilTemperature, setSoilTemperature] = useState('');
  const [soilType, setSoilType] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [knownSoilType, setKnownSoilType] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`);
        const data = await response.json();
        setCountry(data.country);
        setCity(data.city);
      });
    }
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      soilPH,
      soilMoisture,
      soilTemperature,
      soilType,
      images,
      country,
      city,
    };
    onSave(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="p-4 bg-white shadow-lg rounded-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4 text-center">Crop Recommendation</h2>

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

        <div className="mb-4">
          <label className="block text-gray-700">Soil pH</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border rounded" 
            placeholder="Enter soil pH" 
            value={soilPH} 
            onChange={(e) => setSoilPH(e.target.value)} 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Soil Moisture</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border rounded" 
            placeholder="Enter soil moisture" 
            value={soilMoisture} 
            onChange={(e) => setSoilMoisture(e.target.value)} 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Soil Temperature</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border rounded" 
            placeholder="Enter soil temperature" 
            value={soilTemperature} 
            onChange={(e) => setSoilTemperature(e.target.value)} 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Soil Type/Name</label>
          {knownSoilType ? (
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded" 
              placeholder="Enter soil type or name" 
              value={soilType} 
              onChange={(e) => setSoilType(e.target.value)} 
            />
          ) : (
            <input type="file" onChange={handleImageUpload} />
          )}
          <div className="flex items-center mt-2">
            <input 
              type="checkbox" 
              className="mr-2" 
              checked={knownSoilType} 
              onChange={() => setKnownSoilType(!knownSoilType)} 
            />
            <label className="text-gray-700">I know my soil type</label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative w-24 h-24 border">
              <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-full object-cover" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-green-700 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}





// "use client";

// import { useState, useEffect } from 'react';
// import { X } from 'lucide-react';
// import { africanCountries, countryCities } from '../data/africanCountries';

// export default function CropRecommendationForm({ onSave }) {
//   const [images, setImages] = useState([]);
//   const [soilPH, setSoilPH] = useState('');
//   const [soilMoisture, setSoilMoisture] = useState('');
//   const [soilTemperature, setSoilTemperature] = useState('');
//   const [soilType, setSoilType] = useState('');
//   const [country, setCountry] = useState('');
//   const [city, setCity] = useState('');
//   const [knownSoilType, setKnownSoilType] = useState(true);

//   useEffect(() => {
//     // Use geolocation API to get the user's current location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`);
//         const data = await response.json();
//         setCountry(data.country);
//         setCity(data.city);
//       });
//     }
//   }, []);

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setImages((prevImages) => [...prevImages, ...files]);
//   };

//   // Handle image removal
//   const handleRemoveImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       soilPH,
//       soilMoisture,
//       soilTemperature,
//       soilType,
//       images,
//       country,
//       city,
//     };
//     onSave(formData);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form className="p-4 bg-white shadow-lg rounded-lg w-full max-w-md" onSubmit={handleSubmit}>
//         <h2 className="text-xl font-semibold mb-4 text-center">Crop Recommendation</h2>

//         <div className="mb-4">
//           <label className="block text-gray-700">Select Country</label>
//           <select
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           >
//             <option value="" disabled>Select a country</option>
//             {africanCountries.map((c, index) => (
//               <option key={index} value={c}>{c}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Select City</label>
//           <select
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           >
//             <option value="" disabled>Select a city</option>
//             {country && countryCities[country]?.map((city, index) => (
//               <option key={index} value={city}>{city}</option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Soil pH</label>
//           <input 
//             type="text" 
//             className="w-full px-3 py-2 border rounded" 
//             placeholder="Enter soil pH" 
//             value={soilPH} 
//             onChange={(e) => setSoilPH(e.target.value)} 
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Soil Moisture</label>
//           <input 
//             type="text" 
//             className="w-full px-3 py-2 border rounded" 
//             placeholder="Enter soil moisture" 
//             value={soilMoisture} 
//             onChange={(e) => setSoilMoisture(e.target.value)} 
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Soil Temperature</label>
//           <input 
//             type="text" 
//             className="w-full px-3 py-2 border rounded" 
//             placeholder="Enter soil temperature" 
//             value={soilTemperature} 
//             onChange={(e) => setSoilTemperature(e.target.value)} 
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Soil Type/Name</label>
//           {knownSoilType ? (
//             <input 
//               type="text" 
//               className="w-full px-3 py-2 border rounded" 
//               placeholder="Enter soil type or name" 
//               value={soilType} 
//               onChange={(e) => setSoilType(e.target.value)} 
//             />
//           ) : (
//             <input type="file" onChange={handleImageUpload} />
//           )}
//           <div className="flex items-center mt-2">
//             <input 
//               type="checkbox" 
//               className="mr-2" 
//               checked={knownSoilType} 
//               onChange={() => setKnownSoilType(!knownSoilType)} 
//             />
//             <label className="text-gray-700">I know my soil type</label>
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {images.map((image, index) => (
//             <div key={index} className="relative w-24 h-24 border">
//               <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-full object-cover" />
//               <button
//                 type="button"
//                 className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
//                 onClick={() => handleRemoveImage(index)}
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//         </div>

//         <button type="submit" className="w-full bg-green-700 text-white px-4 py-2 rounded">Save</button>
//       </form>
//     </div>
//   );
// }
