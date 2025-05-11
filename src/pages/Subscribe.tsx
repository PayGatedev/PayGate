import React from 'react';
import SubscribeButton from '../components/SubscribeButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConnectWallet from '../components/ConnectWallet';

const Subscribe: React.FC = () => {
  const creatorAddress = 'введи_тут_адресу_твórcя'; // TODO: динамічно або хардкодом
  const handleSubscribe = () => {
    console.log('Subscribed to:', creatorAddress);
    // Тут буде логіка підписки
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-3xl font-bold">Subscribe to Cont</h1>
        <SubscribeButton
          creatorAddress={creatorAddress}
          onSubscribe={handleSubscribe}
        />
        <ConnectWallet />
      </main>
      <Footer />
    </div>
  );
};

export default Subscribe;

