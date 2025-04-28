import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { mintNFT } from '../utils/solana';

const SubscribeButton: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!connected) return;
    setLoading(true);
    try {
      await mintNFT(publicKey!);
      alert('Successfully subscribed and NFT minted!');
    } catch (error) {
      console.error(error);
      alert('An error occurred during subscription.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading || !connected}
      className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-all shadow-md ${loading || !connected ? 'opacity-50' : ''}`}
    >
      {loading ? 'Processing...' : 'Subscribe'}
    </button>
  );
};

export default SubscribeButton;
