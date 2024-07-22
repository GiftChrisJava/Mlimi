import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function SignInForm({ onSwitchToSignUp }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') setPhoneNumber(value);
    if (name === 'password') setPassword(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert('Form submitted');
  };

  return (
    <div className="flex items-center justify-center min-h-screen -mt-8">
      <form 
        onSubmit={handleSubmit} 
        className="p-6 bg-white shadow-lg rounded-lg max-w-sm w-full"
      >
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input 
            type="tel" 
            name="phoneNumber" 
            value={phoneNumber} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded"
            minLength="6"
            maxLength="8"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-green-700 text-white px-4 py-2 rounded w-full mb-2"
        >
          Sign In
        </button>
        
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToSignUp();
          }}
          className="text-blue-500 text-center block"
        >
          Register or Sign Up
        </a>
      </form>
    </div>
  );
}
