"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { ArrowDownRight, ArrowUpRight, Copy, ExternalLink, Wallet } from "lucide-react"
import { useState } from "react"

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const walletAddress = "8xGzr4NxJqH7aPV1tcWC5qrZeNmFtQf8QNPtUZYvd"
  const balance = 458.2
  const usdValue = 45820
  const transactions = [
    {
      id: 1,
      type: "incoming",
      amount: "12.5",
      timestamp: "May 15, 2025 - 14:32",
      from: "3rTyH8NpQs2VbLmFxW9K",
      description: "Subscription payment",
      txHash: "5UxG7n2JqH7aPV1tcWC5qrZeNmFtQf8QNPtUZYvd",
    },
    {
      id: 2,
      type: "outgoing",
      amount: "2.8",
      timestamp: "May 12, 2025 - 16:45",
      to: "9zXcR6TyU4PqS3VdLmN",
      description: "Collaborator payment",
      txHash: "2AbC9m4KsL8bPW2ucXD6prZeNmFtQf8QNPtUZYvd",
    },
    {
      id: 3,
      type: "incoming",
      amount: "8.3",
      timestamp: "May 10, 2025 - 11:20",
      from: "5kLmN8PqR3SdFgH7jK",
      description: "NFT purchase",
      txHash: "8DeFgH1JkLmN2OpQrStUvWxYz3AbCd",
    },
  ]

  const nfts = [
    {
      id: 1,
      name: "Creator Pass #001",
      image: "/digital-art-collection.png",
      collection: "PayGate Creators",
      mintDate: "April 15, 2025",
    },
    {
      id: 2,
      name: "Premium Content Pass",
      image: "/premium-content-display.png",
      collection: "Content Access",
      mintDate: "March 20, 2025",
    },
    {
      id: 3,
      name: "Exclusive Member #042",
      image: "/placeholder-pxc6e.png",
      collection: "Member Collection",
      mintDate: "February 10, 2025",
    },
  ]

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="text-gray-400">Manage your wallet and transactions</p>
      </div>

      {/* Wallet Overview Card */}
      <div className="bg-[#161921] border border-gray-800 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
              <Wallet className="w-8 h-8 text-[#FF3366]" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Connected Wallet</h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-400 font-mono">{`${walletAddress.slice(0, 8)}...${walletAddress.slice(
                  -8,
                )}`}</p>
                <button className="text-[#FF3366] hover:text-[#FF3366]/80">
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={`https://explorer.solana.com/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold">{balance} SOL</div>
            <div className="text-sm text-gray-400">${usdValue.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#0F1116] rounded-md p-4 border border-gray-800">
            <p className="text-sm text-gray-400">Total Earned</p>
            <p className="text-xl font-bold">1,245.8 SOL</p>
            <p className="text-xs text-gray-400">$124,580</p>
          </div>
          <div className="bg-[#0F1116] rounded-md p-4 border border-gray-800">
            <p className="text-sm text-gray-400">This Month</p>
            <p className="text-xl font-bold">124.8 SOL</p>
            <p className="text-xs text-green-500">+27% from last month</p>
          </div>
          <div className="bg-[#0F1116] rounded-md p-4 border border-gray-800">
            <p className="text-sm text-gray-400">Pending Payouts</p>
            <p className="text-xl font-bold">62.3 SOL</p>
            <button className="text-xs text-[#FF3366] hover:underline mt-1">Withdraw now</button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-6 py-2 rounded-md transition-colors">
            <ArrowUpRight className="w-4 h-4" />
            <span>Send</span>
          </button>
          <button className="flex items-center gap-2 bg-[#0F1116] hover:bg-[#0F1116]/80 text-white px-6 py-2 rounded-md border border-gray-700 transition-colors">
            <ArrowDownRight className="w-4 h-4" />
            <span>Receive</span>
          </button>
          <button className="flex items-center gap-2 bg-[#0F1116] hover:bg-[#0F1116]/80 text-white px-6 py-2 rounded-md border border-gray-700 transition-colors">
            <ExternalLink className="w-4 h-4" />
            <span>View on Explorer</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "overview" ? "text-[#FF3366] border-b-2 border-[#FF3366]" : "text-gray-400 hover:text-white"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "transactions"
              ? "text-[#FF3366] border-b-2 border-[#FF3366]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("nfts")}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "nfts" ? "text-[#FF3366] border-b-2 border-[#FF3366]" : "text-gray-400 hover:text-white"
          }`}
        >
          NFTs
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-[#161921] border border-gray-800 rounded-lg p-4">
              <h3 className="font-bold mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="bg-[#0F1116] rounded-md p-3 border border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "incoming" ? "bg-green-500/10" : "bg-red-500/10"
                          }`}
                        >
                          {tx.type === "incoming" ? (
                            <ArrowDownRight className="w-5 h-5 text-green-500" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{tx.description}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            {tx.from && <span>From: {`${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`}</span>}
                            {tx.to && <span>To: {`${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${tx.type === "incoming" ? "text-green-500" : "text-red-500"}`}>
                          {tx.type === "incoming" ? "+" : "-"}
                          {tx.amount} SOL
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{tx.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button onClick={() => setActiveTab("transactions")} className="text-sm text-[#FF3366] hover:underline">
                  View all transactions
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[#161921] border border-gray-800 rounded-lg p-4">
              <h3 className="font-bold mb-4">Your NFTs</h3>
              <div className="space-y-3">
                {nfts.slice(0, 2).map((nft) => (
                  <div key={nft.id} className="bg-[#0F1116] rounded-md p-3 border border-gray-800 flex gap-3">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{nft.name}</p>
                      <p className="text-xs text-gray-400">{nft.collection}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button onClick={() => setActiveTab("nfts")} className="text-sm text-[#FF3366] hover:underline">
                  View all NFTs
                </button>
              </div>
            </div>

            <div className="bg-[#161921] border border-gray-800 rounded-lg p-4 mt-4">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-[#0F1116] hover:bg-[#0F1116]/80 text-white py-2 rounded-md border border-gray-700 transition-colors text-sm">
                  Create New NFT Access Pass
                </button>
                <button className="w-full bg-[#0F1116] hover:bg-[#0F1116]/80 text-white py-2 rounded-md border border-gray-700 transition-colors text-sm">
                  Set Up Recurring Payments
                </button>
                <button className="w-full bg-[#0F1116] hover:bg-[#0F1116]/80 text-white py-2 rounded-md border border-gray-700 transition-colors text-sm">
                  Connect Secondary Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div className="bg-[#161921] border border-gray-800 rounded-lg p-4">
          <h3 className="font-bold mb-4">All Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">From/To</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {[...transactions, ...transactions, ...transactions].map((tx, index) => (
                  <tr key={`${tx.id}-${index}`} className="border-b border-gray-800">
                    <td className="py-3 px-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === "incoming" ? "bg-green-500/10" : "bg-red-500/10"
                        }`}
                      >
                        {tx.type === "incoming" ? (
                          <ArrowDownRight className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">{tx.description}</td>
                    <td className="py-3 px-4">
                      {tx.from && <span>{`${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`}</span>}
                      {tx.to && <span>{`${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`}</span>}
                    </td>
                    <td className={`py-3 px-4 ${tx.type === "incoming" ? "text-green-500" : "text-red-500"}`}>
                      {tx.type === "incoming" ? "+" : "-"}
                      {tx.amount} SOL
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400">{tx.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">{`${tx.txHash.slice(0, 6)}...${tx.txHash.slice(
                          -4,
                        )}`}</span>
                        <a
                          href={`https://explorer.solana.com/tx/${tx.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="flex gap-2">
              <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 text-white px-3 py-1 rounded-md border border-gray-700 transition-colors text-sm">
                Previous
              </button>
              <button className="bg-[#FF3366]/10 text-[#FF3366] px-3 py-1 rounded-md border border-[#FF3366]/30 transition-colors text-sm">
                1
              </button>
              <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 text-white px-3 py-1 rounded-md border border-gray-700 transition-colors text-sm">
                2
              </button>
              <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 text-white px-3 py-1 rounded-md border border-gray-700 transition-colors text-sm">
                3
              </button>
              <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 text-white px-3 py-1 rounded-md border border-gray-700 transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NFTs Tab */}
      {activeTab === "nfts" && (
        <div className="bg-[#161921] border border-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Your NFTs</h3>
            <button className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-4 py-2 rounded-md transition-colors text-sm">
              Create New NFT
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...nfts, ...nfts].map((nft, index) => (
              <div
                key={`${nft.id}-${index}`}
                className="bg-[#0F1116] rounded-lg border border-gray-800 overflow-hidden"
              >
                <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="font-medium">{nft.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{nft.collection}</p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs text-gray-400">Minted: {nft.mintDate}</p>
                    <button className="text-xs text-[#FF3366] hover:underline">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
