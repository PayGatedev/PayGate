import { Connection, PublicKey } from '@solana/web3.js';
import {
  Metaplex,
  walletAdapterIdentity,
  Metadata
} from '@metaplex-foundation/js';
import { NFTItem } from '../utilits/types'; // Імпортуй звідки ти створив тип
import { WalletAdapter } from '@solana/wallet-adapter-base';
let metaplex: Metaplex | null = null;

export const initMetaplex = (connection: Connection, wallet:WalletAdapter) => {
  metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));
};

export const getNFTsByCreator = async (creatorAddress: string): Promise<NFTItem[]> => {
  if (!metaplex) throw new Error('Metaplex not initialized');

  const nfts = await metaplex.nfts().findAllByCreator({ creator: new PublicKey(creatorAddress) });

  const results: NFTItem[] = [];

  for (const metadata of nfts) {
    if ('mintAddress' in metadata) {
      const nft = await metaplex.nfts().load({ metadata: metadata as Metadata });

      if (nft.json) {
        results.push({
          name: nft.name,
          image: nft.json.image ?? '',
          description: nft.json.description ?? '',
          mintAddress: nft.address.toBase58()
        });
      }
    }
  }

  return results;
};



export interface MetadataInput {
  name: string;
  description: string;
}

export interface MintResult {
  success: boolean;
  message?: string;
  mintAddress?: string;
}
interface MintResponse {
  txSignature: string;
  mintAddress: string;
}
export const mintNftWithMetadata = async (
  metadata: { name: string; description: string },
  imageFile: File
): Promise<MintResponse> => {
  const formData = new FormData();
  formData.append('name', metadata.name);
  formData.append('description', metadata.description);
  formData.append('imageFile', imageFile);

  try {
    const response = await fetch('http://localhost:5000/mint-nft', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    console.log(result)
    if (!response.ok) throw new Error('Minting failed');
    return await response.json();
  } catch (error) {
    console.error('Error minting NFT on server:', error);
    throw error;
  }
};
