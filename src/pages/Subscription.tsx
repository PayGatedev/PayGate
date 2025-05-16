import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { mintNftWithMetadata } from '../utilits/solanaUtils'

const Subscription: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const wallet = useWallet()

  const handleSubscribe = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      alert('Please connect your wallet')
      return
    }

    setLoading(true)
    try {
      const metadata = {
        name: 'PayGate Access Pass',
        description: 'This NFT grants access to exclusive content from your creator.',
        image: 'https://placehold.co/600x400.png?text=NFT+Subscription', // Це місце для зображення за замовчуванням
      }

      // Додаємо файл зображення для NFT
      const imageFile = new File(
        [await fetch(metadata.image).then((res) => res.blob())],
        'image.png',
        { type: 'image/png' }
      )

      // Відправляємо запит на сервер для мінтингу NFT
      const tx = await mintNftWithMetadata(metadata, imageFile);

      console.log('NFT Minted! TX:', tx)

      setSuccess(true)
    } catch (error) {
      console.error('Error minting subscription NFT:', error)
      alert('Mint failed. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Subscribe to Premium Content</h1>
      {success ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">
          🎉 Subscription successful! NFT minted to your wallet.
        </div>
      ) : (
        <>
          <p className="mb-4">
            Mint an NFT to unlock exclusive content from this creator.
          </p>
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
  )
}

export default Subscription
