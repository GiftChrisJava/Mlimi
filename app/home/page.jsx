// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { fetchWeatherData } from '../lib/fetchWeather';
// import CropRecommendationForm from '../components/CropRecommendationForm';
// import CropRecommendationDashboard from '../components/CropRecommendationDashboard';
// import SeedQualityForm from '../components/SeedQualityForm';
// import SignInForm from '../components/SignInForm';
// import SignUpForm from '../components/Register';
// import CropMonitoring from '../components/CropMonitoring';
// import WeatherToday from '../components/WeatherToday';

// export default function Home() {
//   const [weatherData, setWeatherData] = useState(null);
//   const [selectedOption, setSelectedOption] = useState('personal');
//   const [formData, setFormData] = useState(null);
//   const [isSignIn, setIsSignIn] = useState(true);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const city = searchParams.get('city') || "blantyre";

//   useEffect(() => {
//     if (city) {
//       fetchWeatherData(city).then(data => setWeatherData(data));
//     }
//   }, [city]);

//   if (!weatherData) return <div>Loading...</div>;

//   const handleFormSave = (data) => {
//     setFormData(data);
//   };

//   const handleReset = () => {
//     setFormData(null);
//   };

//   return (
//     <div>
//       <div className="flex-1 p-4 flex justify-center items-center">
//         {selectedOption === 'crop' && !formData && <CropRecommendationForm onSave={handleFormSave} />}
//         {selectedOption === 'crop' && formData && <CropRecommendationDashboard formData={formData} city={city} onReset={handleReset} />}
//         {selectedOption === 'seed' && <SeedQualityForm />}
//         {selectedOption === 'personal' && isSignIn && <SignInForm onSwitchToSignUp={() => setIsSignIn(false)} />}
//         {selectedOption === 'personal' && !isSignIn && <SignUpForm onSwitchToSignIn={() => setIsSignIn(true)} />}
//         {selectedOption === 'plant' && <CropMonitoring />}
//         {selectedOption === 'weather' && <WeatherToday weatherData={weatherData} city={city}/>}

//         {/* Render other forms as needed */}
//       </div>
//     </div>
//   );
// }
