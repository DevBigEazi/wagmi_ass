import React, { useState } from "react";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useBalance,
} from "wagmi";
import { CheckCircle, Copy, LogOut } from "lucide-react";
import { formatEther } from "viem";

export function Account() {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { data: balanceData } = useBalance({ address });

  const [copied, setCopied] = useState(false);

  const displayAddress = address
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : "";

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border bg-orange-100 p-6 shadow-sm">
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
              {ensAvatar ? (
                <img
                  src={ensAvatar}
                  alt="ENS Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-500">
                  {address ? address.substring(2, 4).toUpperCase() : ""}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium">{ensName || "Connected Wallet"}</p>
              <p className="text-sm text-gray-500">
                {connector?.name || "Wallet"}
              </p>
            </div>
          </div>
          <button
            onClick={() => disconnect()}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            title="Disconnect">
            <LogOut size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
            <span className="text-sm font-medium text-gray-900">
              {displayAddress}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={copyToClipboard}
                className="rounded p-1 hover:bg-gray-200"
                title="Copy address">
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
          </div>

          {balanceData && (
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-sm text-gray-500">Balance</div>
              <div className="font-medium">
                {formatEther(balanceData.value)} {balanceData.symbol}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
