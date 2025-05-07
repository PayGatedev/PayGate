import React from 'react'

type NFTCardProps = {
  name: string
  image: string
  description: string
  mintAddress: string
}

const NFTCard: React.FC<NFTCardProps> = ({ name, image, description, mintAddress }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>
      <div className="mt-4">
        <a href={`https://explorer.solana.com/address/${mintAddress}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          View on Explorer
        </a>
      </div>
    </div>
  )
}

export default NFTCard
