// components/ConnectWallet.tsx
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function ConnectWallet() {
  return (
    <div className="p-4">
      <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
    </div>
  )
}
