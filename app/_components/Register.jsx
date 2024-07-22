"use client"

import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function SignUpForm({ onSwitchToSignIn }) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fullName') setFullName(value);
    if (name === 'phoneNumber') setPhoneNumber(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
      // Check if passwords match
      setPasswordMatch(value === password);
    }
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
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input 
            type="text" 
            name="fullName" 
            value={fullName} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
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
        
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            value={confirmPassword} 
            onChange={handleChange} 
            className={`w-full px-3 py-2 border rounded ${passwordMatch ? 'border-green-500' : 'border-red-500'}`}
            minLength="6"
            maxLength="8"
            required
          />
          {passwordMatch && confirmPassword && (
            <div className="text-green-500 mt-2 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" /> Passwords match
            </div>
          )}
          {!passwordMatch && confirmPassword && (
            <div className="text-red-500 mt-2">Passwords do not match</div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="bg-green-700 text-white px-4 py-2 rounded w-full mb-2"
        >
          Sign Up
        </button>
        
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToSignIn();
          }}
          className="text-blue-500 text-center block"
        >
          Go To Sign In
        </a>
      </form>
    </div>
  );
}
