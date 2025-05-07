import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import ConnectWallet from '../components/ConnectWallet';

const Home: React.FC = () => {
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      alert('Please connect your wallet');
      return;
    }

    setLoading(true);
    try {
      const metadata = {
        name: 'PayGate Access Pass',
        description: 'This NFT grants access to exclusive content from your creator.',
        image: 'https://placehold.co/600x400.png?text=NFT+Subscription',
      };

      const response = await fetch('http://localhost:5000/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: metadata.name,
          description: metadata.description,
          imageUrl: metadata.image,
          walletAddress: wallet.publicKey.toBase58(),
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSuccess(true);
        console.log('NFT Minted! TX:', result.tx);
      } else {
        console.error('Minting failed');
      }
    } catch (error) {
      console.error('Error minting subscription NFT:', error);
      alert('Mint failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Subscribe to Premium Content</h1>

    
        <ConnectWallet />
 

      {success ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">
          🎉 Subscription successful! NFT minted to your wallet.
        </div>
      ) : (
        <>
          <p className="mb-4">Mint an NFT to unlock exclusive content from this creator.</p>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
