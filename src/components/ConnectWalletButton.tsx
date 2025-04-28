import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const ConnectWalletButton: React.FC = () => {
  const { connected, connect, disconnect, publicKey } = useWallet();

  useEffect(() => {
    if (connected) {
      console.log('Wallet connected:', publicKey?.toBase58());
    }
  }, [connected, publicKey]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {connected ? (
        <button
          onClick={disconnect}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition-all shadow-md"
        >
          Disconnect Wallet
        </button>
      ) : (
        <button
          onClick={() => connect()}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-all shadow-md"
        >
          Connect Wallet
        </button>
      )}
      {connected && <p className="text-green-500">Connected: {publicKey?.toBase58()}</p>}
    </div>
  );
};

export default ConnectWalletButton;
