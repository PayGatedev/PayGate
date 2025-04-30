import { Connection, PublicKey } from '@solana/web3.js'

const connection = new Connection('https://api.devnet.solana.com')

export const checkNFTOwnership = async (wallet: string, mint: string) => {
  const accounts = await connection.getParsedTokenAccountsByOwner(
    new PublicKey(wallet),
    { mint: new PublicKey(mint) }
  )

  return accounts.value.some(account => {
    const amount = account.account.data.parsed.info.tokenAmount.uiAmount
    return amount > 0
  })
}
