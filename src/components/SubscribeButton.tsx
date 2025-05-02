// components/SubscribeButton.tsx
import { useWallet } from '@solana/wallet-adapter-react'
import { FC } from 'react'

interface Props {
  creatorAddress: string
  onSubscribe: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SubscribeButton: FC<Props> = (  {onSubscribe, creatorAddress}) => {
  const { publicKey } = useWallet()

  return (
    <button
      onClick={onSubscribe}
      disabled={!publicKey}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      {publicKey ?  'Subscribe to'+ {creatorAddress}: 'Connect Wallet to Subscribe'}
    </button>
  )
}

export default SubscribeButton
