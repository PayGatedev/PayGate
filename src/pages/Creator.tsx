// src/pages/Creator.tsx
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import CreatorProfile from '../components/CreatorProfile'

const Creator = () => {
  const { publicKey } = useWallet()
  const [creatorAddress, setCreatorAddress] = useState<string | null>(null)
  console.log('Subscribed to', creatorAddress);
  useEffect(() => {
    if (publicKey) {
      setCreatorAddress(publicKey.toBase58())
    }
  }, [publicKey])

  if (!publicKey) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Please connect your wallet to view your creator profile.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Your Creator Profile</h1>
      {creatorAddress && <CreatorProfile creatorAddress={creatorAddress} />}
    </div>
  )
}

export default Creator
