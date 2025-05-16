"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { useState } from "react"
import {
  User,
  Shield,
  Bell,
  Wallet,
  Globe,
  Save,
  Pencil,
  Check,
  X,
  CreditCard,
  Languages,
  Lock,
  Zap,
  Sparkles,
  Copy,
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showSaved, setShowSaved] = useState(false)

  const handleSave = () => {
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 3000)
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400">Customize your profile and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Fixed Side Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-[#161921] border border-gray-800 rounded-lg sticky top-4">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-medium text-sm text-gray-400">SETTINGS</h3>
            </div>
            <div className="p-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 p-3 rounded-md transition-all ${
                  activeTab === "profile"
                    ? "bg-[#FF3366]/10 text-[#FF3366]"
                    : "text-gray-300 hover:bg-[#0F1116] hover:text-white"
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
                {activeTab === "profile" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF3366]"></div>}
              </button>
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full flex items-center gap-3 p-3 rounded-md transition-all ${
                  activeTab === "account"
                    ? "bg-[#FF3366]/10 text-[#FF3366]"
                    : "text-gray-300 hover:bg-[#0F1116] hover:text-white"
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Account</span>
                {activeTab === "account" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF3366]"></div>}
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 p-3 rounded-md transition-all ${
                  activeTab === "notifications"
                    ? "bg-[#FF3366]/10 text-[#FF3366]"
                    : "text-gray-300 hover:bg-[#0F1116] hover:text-white"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
                {activeTab === "notifications" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF3366]"></div>}
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`w-full flex items-center gap-3 p-3 rounded-md transition-all ${
                  activeTab === "privacy"
                    ? "bg-[#FF3366]/10 text-[#FF3366]"
                    : "text-gray-300 hover:bg-[#0F1116] hover:text-white"
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>Privacy</span>
                {activeTab === "privacy" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF3366]"></div>}
              </button>
              <button
                onClick={() => setActiveTab("wallet")}
                className={`w-full flex items-center gap-3 p-3 rounded-md transition-all ${
                  activeTab === "wallet"
                    ? "bg-[#FF3366]/10 text-[#FF3366]"
                    : "text-gray-300 hover:bg-[#0F1116] hover:text-white"
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span>Wallet</span>
                {activeTab === "wallet" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF3366]"></div>}
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="bg-[#161921] border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF3366]/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-[#FF3366]" />
                  </div>
                  <h2 className="font-medium">Profile Information</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-6 flex-col md:flex-row">
                  <div className="w-full md:w-32">
                    <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-[#1a1d25] to-[#0F1116] border-2 border-gray-800 flex items-center justify-center mb-4 group relative cursor-pointer overflow-hidden">
                      <User className="w-16 h-16 text-gray-600 group-hover:text-gray-400 transition-colors" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Pencil className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <button className="w-full bg-[#0F1116] hover:bg-[#0F1116]/80 text-white text-sm py-2 rounded-md border border-gray-700 transition-colors flex items-center justify-center gap-2">
                      <Pencil className="w-4 h-4" />
                      <span>Change Avatar</span>
                    </button>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">
                          Display Name
                        </label>
                        <input
                          type="text"
                          id="displayName"
                          defaultValue="CryptoCreator"
                          className="w-full bg-[#0F1116] border border-gray-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          defaultValue="crypto_creator"
                          className="w-full bg-[#0F1116] border border-gray-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        defaultValue="Web3 content creator specializing in Solana development tutorials and guides. Building the decentralized future one block at a time."
                        className="w-full bg-[#0F1116] border border-gray-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors resize-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                          Website
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-[#0A0A0B] text-gray-400 text-sm">
                            <Globe className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            id="website"
                            defaultValue="https://cryptocreator.dev"
                            className="flex-1 bg-[#0F1116] border border-gray-700 rounded-r-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-300 mb-1">
                          Twitter
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-[#0A0A0B] text-gray-400 text-sm">
                            @
                          </span>
                          <input
                            type="text"
                            id="twitter"
                            defaultValue="crypto_creator"
                            className="flex-1 bg-[#0F1116] border border-gray-700 rounded-r-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-4 py-2.5 rounded-md transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Settings */}
          {activeTab === "account" && (
            <div className="bg-[#161921] border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF3366]/20 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-[#FF3366]" />
                  </div>
                  <h2 className="font-medium">Account Settings</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#FF3366]" />
                    <span>Default Subscription Model</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className="flex items-center p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        id="recurring"
                        name="subscriptionModel"
                        defaultChecked
                        className="w-4 h-4 bg-[#0F1116] border border-gray-700 rounded focus:ring-[#FF3366] text-[#FF3366]"
                      />
                      <span className="ml-2 text-sm text-gray-300">Recurring Subscription</span>
                    </label>
                    <label className="flex items-center p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        id="one-time"
                        name="subscriptionModel"
                        className="w-4 h-4 bg-[#0F1116] border border-gray-700 rounded focus:ring-[#FF3366] text-[#FF3366]"
                      />
                      <span className="ml-2 text-sm text-gray-300">One-time Payment</span>
                    </label>
                    <label className="flex items-center p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        id="nft"
                        name="subscriptionModel"
                        className="w-4 h-4 bg-[#0F1116] border border-gray-700 rounded focus:ring-[#FF3366] text-[#FF3366]"
                      />
                      <span className="ml-2 text-sm text-gray-300">NFT Access Pass</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF3366]" />
                    <span>Content Defaults</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="defaultAccess" className="block text-sm font-medium text-gray-300 mb-1">
                        Default Access Level
                      </label>
                      <select
                        id="defaultAccess"
                        className="w-full bg-[#0F1116] border border-gray-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors appearance-none"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option value="premium">Premium (Paid)</option>
                        <option value="free">Free</option>
                        <option value="mixed">Mixed (Teaser + Premium)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="defaultContentType" className="block text-sm font-medium text-gray-300 mb-1">
                        Default Content Type
                      </label>
                      <select
                        id="defaultContentType"
                        className="w-full bg-[#0F1116] border border-gray-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors appearance-none"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                        <option value="podcast">Podcast</option>
                        <option value="guide">Guide</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#FF3366]" />
                    <span>Language & Region</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">
                        Language
                      </label>
                      <select
                        id="language"
                        className="w-full bg-[#0F1116] border border-gray-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors appearance-none"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">Japanese</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-1">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        className="w-full bg-[#0F1116] border border-gray-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors appearance-none"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option value="utc">UTC (Coordinated Universal Time)</option>
                        <option value="est">EST (Eastern Standard Time)</option>
                        <option value="pst">PST (Pacific Standard Time)</option>
                        <option value="cet">CET (Central European Time)</option>
                        <option value="jst">JST (Japan Standard Time)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-4 py-2.5 rounded-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <div className="bg-[#161921] border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF3366]/20 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-[#FF3366]" />
                  </div>
                  <h2 className="font-medium">Notification Settings</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-[#FF3366]" />
                      </div>
                      <div>
                        <p className="font-medium">New Subscribers</p>
                        <p className="text-xs text-gray-400">Get notified when someone subscribes to your content</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-[#FF3366]" />
                      </div>
                      <div>
                        <p className="font-medium">Content Engagement</p>
                        <p className="text-xs text-gray-400">Get notified about likes, comments, and shares</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-[#FF3366]" />
                      </div>
                      <div>
                        <p className="font-medium">Payment Notifications</p>
                        <p className="text-xs text-gray-400">Get notified about new payments and revenue</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-[#FF3366]" />
                      </div>
                      <div>
                        <p className="font-medium">DAO Proposals</p>
                        <p className="text-xs text-gray-400">Get notified about new proposals and voting results</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-[#FF3366]" />
                      </div>
                      <div>
                        <p className="font-medium">Platform Updates</p>
                        <p className="text-xs text-gray-400">Get notified about new features and updates</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-4 py-2.5 rounded-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === "privacy" && (
            <div className="bg-[#161921] border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF3366]/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-[#FF3366]" />
                  </div>
                  <h2 className="font-medium">Privacy Settings</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#FF3366]" />
                      </div>
                      <div>
                        <p className="font-medium">Public Profile</p>
                        <p className="text-xs text-gray-400">Allow others to view your profile and content</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#FF3366]" />
                      </div>
                      <div>
                        <p className="font-medium">Show Earnings</p>
                        <p className="text-xs text-gray-400">Display your earnings publicly on your profile</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#FF3366]" />
                      </div>
                      <div>
                        <p className="font-medium">Show Subscriber Count</p>
                        <p className="text-xs text-gray-400">Display your subscriber count publicly</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#FF3366]" />
                      </div>
                      <div>
                        <p className="font-medium">Content Analytics</p>
                        <p className="text-xs text-gray-400">Share content analytics with collaborators</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-4 py-2.5 rounded-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Settings */}
          {activeTab === "wallet" && (
            <div className="bg-[#161921] border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF3366]/20 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-[#FF3366]" />
                  </div>
                  <h2 className="font-medium">Wallet Settings</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6 p-4 bg-gradient-to-br from-[#0F1116] to-[#161921] border border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-[#FF3366]" />
                      </div>
                      <div>
                        <p className="font-medium">Connected Wallet</p>
                        <p className="text-xs text-gray-400">Your primary wallet for receiving payments</p>
                      </div>
                    </div>
                    <button className="bg-[#0A0A0B] hover:bg-[#0A0A0B]/80 text-white text-sm py-1.5 px-3 rounded-md border border-gray-700 transition-colors">
                      Disconnect
                    </button>
                  </div>
                  <div className="bg-[#0A0A0B] p-3 rounded-md border border-gray-700 mb-4">
                    <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm">8xGzr4NxJqH7aPV1tcWC5qrZeNmFtQf8QNPtUZYvd</p>
                      <button className="text-[#FF3366] hover:text-[#FF3366]/80 text-sm flex items-center gap-1">
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0A0A0B] p-3 rounded-md border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1">Balance</p>
                      <p className="font-medium">458.2 SOL</p>
                    </div>
                    <div className="bg-[#0A0A0B] p-3 rounded-md border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1">Network</p>
                      <p className="font-medium">Solana Mainnet</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#FF3366]" />
                    <span>Payment Settings</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="payoutThreshold" className="block text-sm font-medium text-gray-300 mb-1">
                        Automatic Payout Threshold
                      </label>
                      <div className="flex">
                        <input
                          type="number"
                          id="payoutThreshold"
                          defaultValue="100"
                          min="10"
                          className="flex-1 bg-[#0F1116] border border-gray-700 rounded-l-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors"
                        />
                        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-700 bg-[#0A0A0B] text-gray-400 text-sm">
                          SOL
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="payoutFrequency" className="block text-sm font-medium text-gray-300 mb-1">
                        Payout Frequency
                      </label>
                      <select
                        id="payoutFrequency"
                        className="w-full bg-[#0F1116] border border-gray-700 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-colors appearance-none"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly" selected>
                          Weekly
                        </option>
                        <option value="monthly">Monthly</option>
                        <option value="manual">Manual Only</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#FF3366]" />
                    <span>Smart Contract Settings</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                      <div>
                        <p className="font-medium">Auto-distribute to Collaborators</p>
                        <p className="text-xs text-gray-400">Automatically distribute revenue to collaborators</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                      <div>
                        <p className="font-medium">NFT Royalties</p>
                        <p className="text-xs text-gray-400">Collect royalties on NFT secondary sales</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#0F1116] rounded-md border border-gray-800 hover:border-[#FF3366]/30 transition-colors">
                      <div>
                        <p className="font-medium">Transaction Notifications</p>
                        <p className="text-xs text-gray-400">Receive notifications for all wallet transactions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF3366]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-4 py-2.5 rounded-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings saved notification */}
      <div
        className={`fixed bottom-4 right-4 bg-[#0F1116] border border-[#FF3366]/20 rounded-lg p-4 shadow-lg flex items-center gap-3 transform transition-all duration-300 ${
          showSaved ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-[#FF3366]/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-[#FF3366]" />
        </div>
        <div>
          <p className="font-medium">Settings Saved</p>
          <p className="text-xs text-gray-400">Your changes have been saved successfully</p>
        </div>
        <button className="ml-2" onClick={() => setShowSaved(false)}>
          <X className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
      </div>
    </DashboardLayout>
  )
}
