import React, { useState } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { ChevronDown } from 'lucide-react';

const NetworkSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chainId = useChainId();
  const { chains, error, isLoading, pendingChainId, switchChain } = useSwitchChain();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border shadow-sm hover:bg-gray-50 transition-colors"
      >
        {chainId && (
          <>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="font-medium">
              {chains.find(c => c.id === chainId)?.name || 'Unknown Network'}
            </span>
          </>
        )}
        {!chainId && (
          <>
            <span className="w-3 h-3 rounded-full bg-gray-300"></span>
            <span className="font-medium">Not Connected</span>
          </>
        )}
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-10 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {chains.map((x) => (
              <button
                key={x.id}
                onClick={() => {
                  switchChain({ chainId: x.id });
                  setIsOpen(false);
                }}
                disabled={!switchChain || x.id === chainId}
                className={`w-full text-left block px-4 py-2 text-sm ${
                  x.id === chainId ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{x.name}</span>
                  {isLoading && pendingChainId === x.id && <span>Switching...</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <div className="text-red-500 text-sm mt-2">{error.message}</div>}
    </div>
  );
};

export default NetworkSwitcher;