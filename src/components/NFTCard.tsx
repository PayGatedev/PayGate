import React from 'react';

const NFTCard: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-xl font-semibold">Your NFT</h2>
      <p className="text-gray-700 mt-2">This is the NFT you received after subscribing!</p>
      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-500">NFT Content Preview</p>
      </div>
    </div>
  );
};

export default NFTCard;
