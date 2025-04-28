import React from 'react';
import { PublicKey } from '@solana/web3.js';

interface SubscribeButtonProps {
  creatorWalletAddress: string;
  onSubscribe: (creatorPublicKey: PublicKey) => void;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ creatorWalletAddress, onSubscribe }) => {
  const handleSubscribe = () => {
    try {
      const creatorPublicKey = new PublicKey(creatorWalletAddress);
      onSubscribe(creatorPublicKey);
    } catch (error) {
      console.error('Invalid creator wallet address:', error);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
    >
      Subscribe
    </button>
  );
};

export default SubscribeButton;
