import React, { useState } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useBalance } from 'wagmi';
import { Copy, ExternalLink, LogOut } from 'lucide-react';
import NetworkSwitcher from './NetworkSwitcher';

export function Account() {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { data: balanceData } = useBalance({ address });
  
  const [copied, setCopied] = useState(false);

  const displayAddress = address ? 
    `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openBlockExplorer = () => {
    window.open(`https://explorer.lisk.com/address/${address}`, '_blank');
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
              {ensAvatar ? (
                <img src={ensAvatar} alt="ENS Avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-500">
                  {address ? address.substring(2, 4).toUpperCase() : ''}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium">
                {ensName || 'Connected Wallet'}
              </p>
              <p className="text-sm text-gray-500">
                {connector?.name || 'Wallet'}
              </p>
            </div>
          </div>
          <button
            onClick={() => disconnect()}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            title="Disconnect"
          >
            <LogOut size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
            <span className="text-sm font-medium text-gray-900">{displayAddress}</span>
            <div className="flex space-x-1">
              <button
                onClick={copyToClipboard}
                className="rounded p-1 hover:bg-gray-200"
                title="Copy address"
              >
                <Copy size={16} />
                {copied && <span className="absolute ml-1 text-xs">Copied!</span>}
              </button>
              <button
                onClick={openBlockExplorer}
                className="rounded p-1 hover:bg-gray-200"
                title="View on explorer"
              >
                <ExternalLink size={16} />
              </button>
            </div>
          </div>

          {balanceData && (
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-sm text-gray-500">Balance</div>
              <div className="font-medium">
                {balanceData.formatted} {balanceData.symbol}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;