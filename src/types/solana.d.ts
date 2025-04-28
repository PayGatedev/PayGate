import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

declare global {
  interface Window {
    solana?: PhantomWalletAdapter;
  }
}
