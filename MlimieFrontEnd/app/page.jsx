"use client";

import { useState } from 'react';
import LeftNavBar from '../components/LeftNavBar';
import RightSideNavBar from '../components/RightSideNavBar';

export default function Layout({ children }) {
  const [selectedOption, setSelectedOption] = useState('personal');

  return (
    <div className="flex h-screen">
      <LeftNavBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <main className="flex-1 overflow-auto p-4">
        {children}
      </main>
      <RightSideNavBar />
    </div>
  );
}
