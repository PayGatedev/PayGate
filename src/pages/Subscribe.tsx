import React from 'react';
import SubscribeButton from '../components/SubscribeButton';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
        <h1 className="text-3xl font-bold">Subscribe to Content</h1>
        <SubscribeButton
          creatorAddress={creatorAddress}
          onSubscribe={handleSubscribe}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Subscribe;

