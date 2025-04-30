// pages/Mint.tsx
// pages/Mint.tsx
import { useState } from 'react'

import { useWallet } from '@solana/wallet-adapter-react'
import { uploadMetadata } from '../utilits/nftStorage'
import { mintNFT } from '../utilits/mintNFT'


export default function Mint() {
  const wallet = useWallet()
  const [formData, setFormData] = useState({ name: '', description: '', image: null as File | null })
  const [minted, setMinted] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!formData.image || !wallet.publicKey) return

    try {
      const uri = await uploadMetadata(formData.name, formData.description, formData.image)
      const nft = await mintNFT(wallet, uri, formData.name)
      setMinted(nft.address.toBase58())
    } catch (err) {
      console.error('Error minting NFT:', err)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Mint Your Content</h2>
      <input type="text" placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} className="border p-2 w-full" />
      <input type="text" placeholder="Description" onChange={e => setFormData({ ...formData, description: e.target.value })} className="border p-2 w-full" />
      <input type="file" onChange={e => setFormData({ ...formData, image: e.target.files?.[0] || null })} className="border p-2 w-full" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Upload & Mint</button>
      {minted && <p className="text-green-600">NFT Minted! Address: {minted}</p>}
    </div>
  )
}
