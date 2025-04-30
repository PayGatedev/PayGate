// utils/nftStorage.ts
import { NFTStorage, File } from 'nft.storage'

const NFT_STORAGE_TOKEN = 'YOUR_NFT_STORAGE_API_KEY' // 🔐 Заміни на свій токен

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

export async function uploadMetadata(name: string, description: string, imageFile: File) {
  const metadata = await client.store({
    name,
    description,
    image: imageFile,
  })

  return metadata.url
}
