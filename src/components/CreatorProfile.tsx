import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getNFTsByCreator } from '../utilits/solanaUtils';
import { NFTItem } from '../utilits/types';
interface CreatorProfileProps {
  creatorAddress: string;
}
const CreatorProfile: React.FC<CreatorProfileProps> = () => {
  const wallet = useWallet();
 const [nfts, setNfts] = useState<NFTItem[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (wallet.connected && wallet.publicKey) {
        const creatorAddress = wallet.publicKey.toBase58();
        const creatorNfts = await getNFTsByCreator(creatorAddress);
        setNfts(creatorNfts);
      }
    };

    fetchNFTs();
  }, [wallet.connected, wallet.publicKey]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Creator's Profile</h1>
      {wallet.connected ? (
        <>
          <h2 className="text-xl mb-2">Creator's NFTs:</h2>
          <div>
            {nfts.length > 0 ? (
              nfts.map((nft, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{nft.name}</h3>
                  <img src={nft.image} alt={nft.name} className="w-32 h-32 object-cover rounded" />
                  <p>{nft.description}</p>
                </div>
              ))
            ) : (
              <p>This creator has no NFTs available.</p>
            )}
          </div>
        </>
      ) : (
        <p>Please connect your wallet to view the creator's content.</p>
      )}
    </div>
  );
};

export default CreatorProfile;
