import React from 'react';
import SubscribeButton from '../components/SubscribeButton';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Subscribe: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-3xl font-bold">Subscribe to Content</h1>
        <SubscribeButton />
      </main>
      <Footer />
    </div>
  );
};

export default Subscribe;
