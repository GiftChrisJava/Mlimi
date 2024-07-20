"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchWeatherData } from '../lib/fetchWeather';
import LeftNavBar from '../_components/LeftNavBar';
import WeatherToday from '../_components/WeatherToday';
import CropRecommendationForm from '../_components/CropRecommendationForm';
import CropRecommendationDashboard from '../_components/CropRecommendationDashboard';
import SeedQualityForm from '../_components/SeedQualityForm';
import SignInForm from '../_components/SignInForm';
import CropMonitoring from '../_components/CropMonitoring';
import RightSideNavBar from '../_components/RightSidebar';
import SignUpForm from '../_components/Register';
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('personal');
  const [formData, setFormData] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true); // State to toggle between SignIn and SignUp
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || "blantyre";

  useEffect(() => {
    if (city) {
      fetchWeatherData(city).then(data => setWeatherData(data));
    }
  }, [city]);

  if (!weatherData) return <div>Loading...</div>;

  const handleFormSave = (data) => {
    setFormData(data);
  };

  const handleReset = () => {
    setFormData(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className={`lg:w-64 w-full ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <LeftNavBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </div>
      
      <div className="lg:hidden w-full p-4 flex justify-between items-center bg-gray-100">
        <span className="font-bold text-xl">Mlimi App</span>
        <button onClick={toggleMenu} className="text-2xl">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      <div className="flex-1 p-4 flex justify-center items-center">
        {selectedOption === 'crop' && !formData && <CropRecommendationForm onSave={handleFormSave} />}
        {selectedOption === 'crop' && formData && <CropRecommendationDashboard formData={formData} city={city} onReset={handleReset} />}
        {selectedOption === 'seed' && <SeedQualityForm />}
        {selectedOption === 'personal' && isSignIn && <SignInForm onSwitchToSignUp={() => setIsSignIn(false)} />}
        {selectedOption === 'personal' && !isSignIn && <SignUpForm onSwitchToSignIn={() => setIsSignIn(true)} />}
        {selectedOption === 'plant' && <CropMonitoring />}
        {selectedOption === 'weather' && <WeatherToday weatherData={weatherData} city={city}/>}

        {/* Render other forms as needed */}
      </div>

      <div className="lg:w-64 w-full lg:fixed lg:right-0 lg:top-0 lg:bottom-0 lg:overflow-auto hidden lg:block">
        <RightSideNavBar />
      </div>
    </div>
  );
}
