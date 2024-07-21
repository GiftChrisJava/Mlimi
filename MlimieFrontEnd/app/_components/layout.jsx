// components/layout.js
import LeftNavBar from './LeftNavBar';
import RightSideNavBar from './RightSideNavBar';
import { useState } from 'react';

export default function Layout({ children }) {
  const [selectedOption, setSelectedOption] = useState('personal');

  return (
    <div className="flex h-screen">
      <LeftNavBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

      <main className="flex-1 overflow-auto p-4">
        {children(selectedOption)}
      </main>

      <RightSideNavBar />
    </div>
  );
}
