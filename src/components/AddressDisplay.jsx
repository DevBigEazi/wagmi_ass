import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

const AddressDisplay = ({ address }) => {
  const [copied, setCopied] = useState(false);
  
  if (!address) return null;
  
  const shortenedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 text-sm">
      <span className="font-medium text-blue-800">{shortenedAddress}</span>
      <button
        onClick={copyToClipboard}
        className="ml-2 p-1 rounded hover:bg-blue-100 text-blue-600 transition-colors"
        aria-label="Copy address to clipboard"
      >
        {copied ? (
          <div className="flex items-center text-green-600">
            <CheckCircle size={16} />
            <span className="ml-1 text-xs">Copied</span>
          </div>
        ) : (
          <Copy size={16} />
        )}
      </button>
    </div>
  );
};

export default AddressDisplay;