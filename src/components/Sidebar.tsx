'use client';
import Link from 'next/link';
import { useState } from 'react';
import { List, X } from 'lucide-react';


const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-gray-100 p-4 transition-all duration-300 shadow-md ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <List className="h-6 w-6" />
          )}
        </button>
      </div>
      <nav className="">
        <ul className="">
          <li className="mb-2">
            <Link
              href="/dashboard"
              className={`block py-2 px-4 hover:bg-gray-200 rounded ${
                !isExpanded && 'text-center'
              }`}
            >
              {isExpanded && 'Dashboard'}
            </Link>
          </li>
          <li className="">
            <Link href="/dashboard/subscriptions" className={`block py-2 px-4 hover:bg-gray-200 rounded ${!isExpanded && 'text-center'}`}>
              {isExpanded && 'Subscriptions'}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;