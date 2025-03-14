import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { lisk } from 'wagmi/chains';
import NetworkSwitcher from './components/NetworkSwitcher';
import WalletConnectModal from './components/WalletConnectModal';
import AutoNetworkSwitcher from './components/AutoNetworkSwitcher';
import Account from './components/Account';

const App = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { isConnected } = useAccount();

  const DEFAULT_CHAIN_ID = lisk.id;

  return (
    <AutoNetworkSwitcher defaultChainId={DEFAULT_CHAIN_ID}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Lisk Wallet Demo</h1>
          
          {isConnected ? (
            <div className="flex items-center space-x-4">
              <NetworkSwitcher />
            </div>
          ) : (
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
        
        {isConnected && (
          <div className="mb-8">
            <Account />
          </div>
        )}
        
        <WalletConnectModal
          isOpen={isWalletModalOpen} 
          onClose={() => setIsWalletModalOpen(false)} 
        />
      </div>
    </AutoNetworkSwitcher>
  );
};

export default App;