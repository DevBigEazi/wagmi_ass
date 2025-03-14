import React, { useState, useRef, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ChevronDown, LogOut, ExternalLink, CreditCard, Settings } from 'lucide-react';
import AddressDisplay from './AddressDisplay';

const AccountDropdown = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      label: 'View in Explorer',
      icon: <ExternalLink size={16} />,
      action: () => window.open(`https://explorer.lisk.com/address/${address}`, '_blank')
    },
    {
      label: 'Account Assets',
      icon: <CreditCard size={16} />,
      action: () => console.log('View assets')
    },
    {
      label: 'Settings',
      icon: <Settings size={16} />,
      action: () => console.log('Settings')
    },
    {
      label: 'Disconnect',
      icon: <LogOut size={16} />,
      action: () => disconnect(),
      className: 'text-red-600 hover:bg-red-50'
    }
  ];

  if (!address) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg border bg-white px-3 py-2 shadow-sm hover:bg-gray-50 transition-colors"
      >
        <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
          {address.substring(2, 4).toUpperCase()}
        </span>
        <AddressDisplay address={address} />
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="p-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className={`group flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 ${item.className || ''}`}
              >
                <span className="mr-3 text-gray-500 group-hover:text-current">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;