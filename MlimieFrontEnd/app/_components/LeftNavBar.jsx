import { CheckSquare, Cloud, Search, LeafIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LeftNavBar({ selectedOption, setSelectedOption }) {
  const menuItems = [
    { label: "Weather Forcasting", icon: Cloud, value: 'weather' },
    { label: "Personalized Recommendation", icon: Cloud, value: 'personal' },
    { label: 'Crop Recommendation', icon: CheckSquare, value: 'crop' },
    { label: 'Seed Quality', icon: Search, value: 'seed' },
    { label: 'Plant Monitor', icon: LeafIcon, value: 'plant' },
  ];

  return (
    <nav className="bg-gray-100 text-gray-800 w-64 h-full p-4 shadow-2xl flex flex-col">
      <Link className="font-bold text-2xl text-gray-900 mb-6" href="/options">{"Mlimi App"}</Link>
      <hr className="text-xl" />

      <ul className="text-xl px-6">
        {menuItems.map((item) => (
          <li
            key={item.value}
            className={`flex items-center mb-6 cursor-pointer ${selectedOption === item.value ? 'text-green-700' : ''}`}
            onClick={() => setSelectedOption(item.value)}
          >
            <item.icon className="mr-2 w-5" />
            {item.label}
            {selectedOption === item.value && <ArrowRight className="ml-auto w-5" />}
          </li>
        ))}
      </ul>
    </nav>
  );
}
