import { useConnect } from 'wagmi';
import { X } from 'lucide-react';

const WalletConnectModal = ({ isOpen, onClose }) => {
  const { connectors, connect, isLoading, pendingConnector } = useConnect();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-96 max-w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Connect with one of the available wallet providers.
          </p>
          
          <div className="space-y-3">
            {connectors.map((connector) => {
              const isPending = isLoading && pendingConnector?.id === connector.id;
              
              return (
                <button
                  key={connector.uid}
                  onClick={() => {
                    connect({ connector });
                    onClose();
                  }}
                  disabled={isPending}
                  className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-colors 
                    ${!isPending ? 'hover:bg-gray-50' : 'opacity-50'}
                    ${isPending ? 'bg-gray-50' : ''}
                  `}
                >
                  <span className="font-medium">
                    {connector.name}
                    {isPending && ' (connecting...)'}
                  </span>
                  
                  {connector.icon && (
                    <img
                      src={connector.icon}
                      alt={`${connector.name} logo`}
                      className="w-6 h-6"
                    />
                  )}
                  {!connector.icon && (
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectModal;