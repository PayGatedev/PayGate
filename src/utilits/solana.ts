import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';
import { bundlrStorage, Metaplex, keypairIdentity } from '@metaplex-foundation/js';

// Створюємо підключення
const connection = new Connection(clusterApiUrl('devnet')); // або свій RPC
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(Keypair.generate())) // замінити на реального користувача
  .use(bundlrStorage());

export const mintNFT = async (ownerPublicKey: PublicKey) => {
  try {
    const { nft } = await metaplex.nfts().create({
      uri: "https://arweave.net/your-metadata-uri", // Тут має бути URI метаданих (JSON-файл)
      name: "My NFT",
      sellerFeeBasisPoints: 500, // 5% royalty
      symbol: "MYNFT",
      creators: [
        {
          address: ownerPublicKey,
          verified: false,
          share: 100,
        },
      ],
    });

    console.log('NFT minted:', nft);
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
};
