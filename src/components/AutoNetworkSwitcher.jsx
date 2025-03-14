import { useEffect } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';

const AutoNetworkSwitcher = ({ defaultChainId, children }) => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();
  
  // Find if current chain is in our supported list
  const isCurrentChainSupported = chains.some(chain => chain.id === chainId);
  
  // Auto-switch network on connection
  useEffect(() => {
    const handleNetworkSwitch = async () => {
      if (isConnected && switchChain && defaultChainId) {
        // If no chain detected or current chain not in our supported list
        if (!chainId || !isCurrentChainSupported) {
          try {
            console.log(`Auto-switching to chain ID: ${defaultChainId}`);
          switchChain({ chainId: defaultChainId });
          } catch (error) {
            console.error('Failed to switch network:', error);
          }
        }
      }
    };
    
    handleNetworkSwitch();
  }, [isConnected, chainId, isCurrentChainSupported, switchChain, defaultChainId]);
  
  return <>{children}</>;
};

export default AutoNetworkSwitcher;