"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  BookOpen,
  ChevronRight,
  CheckCircle,
  Clock,
  Download,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageSquare,
} from "lucide-react"

interface GuideViewerProps {
  content: any
  theme?: any
}

const GuideViewer: React.FC<GuideViewerProps> = ({ content, theme }) => {
  const [activeChapter, setActiveChapter] = useState(0)
  const [completedChapters, setCompletedChapters] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showTOC, setShowTOC] = useState(true)

  // Default theme if not provided
  const currentTheme = theme || {
    primary: "yellow-500",
    primaryLight: "yellow-400",
    primaryDark: "yellow-600",
    gradient: "from-yellow-500 to-yellow-600",
    gradientLight: "from-yellow-400 to-yellow-500",
    gradientSubtle: "from-yellow-500/20 to-yellow-600/10",
    gradientHover: "from-yellow-400 to-yellow-600",
    bg: "yellow-500/10",
    bgLight: "yellow-500/5",
    border: "yellow-500/30",
    icon: "text-yellow-400",
    text: "text-yellow-400",
    hover: "hover:text-yellow-400",
    ring: "ring-yellow-500/30",
  }

  // Default chapters if none provided
  const chapters = content.chapterList || [
    { title: "Setting Up Your Environment", content: "Lorem ipsum..." },
    { title: "Understanding Core Concepts", content: "Lorem ipsum..." },
    { title: "Implementation Basics", content: "Lorem ipsum..." },
    { title: "Advanced Techniques", content: "Lorem ipsum..." },
    { title: "Best Practices", content: "Lorem ipsum..." },
  ]

  // Mark chapter as completed
  const markAsCompleted = (index: number) => {
    if (!completedChapters.includes(index)) {
      const newCompleted = [...completedChapters, index]
      setCompletedChapters(newCompleted)
      setProgress(Math.round((newCompleted.length / chapters.length) * 100))
    }
  }

  // Update progress when active chapter changes
  useEffect(() => {
    setProgress(Math.round((completedChapters.length / chapters.length) * 100))
  }, [completedChapters, chapters.length])

  return (
    <div className="bg-[#161921] border border-gray-800 rounded-xl overflow-hidden">
      {/* Guide header */}
      <div className="bg-gradient-to-r from-[#0F1116] to-[#161921] p-6">
        <div className="flex items-center gap-6">
          <div
            className={`w-20 h-20 bg-gradient-to-br ${currentTheme.gradientSubtle} rounded-xl flex items-center justify-center flex-shrink-0 border border-${currentTheme.border}`}
          >
            <BookOpen className={`w-10 h-10 ${currentTheme.icon}`} />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">{content.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{chapters.length} chapters</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Estimated reading time: 25 min</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-3 bg-[#0F1116] rounded-full overflow-hidden border border-gray-800">
                <div
                  className={`h-full bg-gradient-to-r ${currentTheme.gradient} rounded-full transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className={`text-sm font-medium ${currentTheme.text}`}>{progress}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className={`p-2 rounded-lg transition-all duration-200 ${
                isBookmarked
                  ? `bg-gradient-to-r ${currentTheme.gradientSubtle} ${currentTheme.text} border border-${currentTheme.border}`
                  : "bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 text-gray-300 hover:text-white"
              }`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 transition-colors text-gray-300 hover:text-white">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 transition-colors text-gray-300 hover:text-white">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Table of contents - Sidebar */}
        <div className={`md:w-64 border-r border-gray-800 ${showTOC ? "block" : "hidden md:block"}`}>
          <div className="p-4 border-b border-gray-800">
            <h3 className="font-bold text-lg">Table of Contents</h3>
            <div className="text-sm text-gray-400 mt-1">
              {completedChapters.length} of {chapters.length} chapters completed
            </div>
          </div>

          <div className="p-2 max-h-[calc(100vh-300px)] overflow-y-auto">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className={`rounded-lg p-3 mb-2 cursor-pointer transition-all duration-200 ${
                  activeChapter === index
                    ? `bg-gradient-to-r ${currentTheme.gradientSubtle} border border-${currentTheme.border}`
                    : "hover:bg-[#0F1116]/80 hover:border-gray-700 border border-transparent"
                }`}
                onClick={() => setActiveChapter(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                        completedChapters.includes(index)
                          ? `bg-gradient-to-r ${currentTheme.gradientSubtle} ${currentTheme.text} border border-${currentTheme.border}`
                          : "bg-[#0F1116] text-gray-400 border border-gray-800"
                      }`}
                    >
                      {completedChapters.includes(index) ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-sm transition-colors ${
                        completedChapters.includes(index)
                          ? "text-gray-400 line-through"
                          : activeChapter === index
                            ? currentTheme.text
                            : "text-gray-300"
                      }`}
                    >
                      {chapter.title}
                    </span>
                  </div>

                  {activeChapter === index && <ChevronRight className={`w-4 h-4 ${currentTheme.text}`} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chapter content */}
        <div className="flex-1 p-6">
          {/* Mobile TOC toggle */}
          <button
            className="w-full flex items-center justify-between p-3 bg-[#0F1116] rounded-lg mb-4 md:hidden border border-gray-800 hover:border-gray-700 transition-colors"
            onClick={() => setShowTOC(!showTOC)}
          >
            <span className="font-medium">Table of Contents</span>
            <ChevronRight className={`w-5 h-5 transition-transform ${showTOC ? "rotate-90" : ""}`} />
          </button>

          <div className="prose prose-invert max-w-none">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold m-0 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Chapter {activeChapter + 1}: {chapters[activeChapter].title}
              </h2>

              <button
                className={`flex items-center gap-1 text-sm ${currentTheme.text} ${currentTheme.hover} transition-colors px-3 py-1.5 rounded-lg bg-gradient-to-r ${currentTheme.gradientSubtle} border border-${currentTheme.border}`}
                onClick={() => markAsCompleted(activeChapter)}
              >
                <CheckCircle className="w-4 h-4" />
                Mark as completed
              </button>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
              nisl aliquet nunc, quis aliquam nisl nunc, quis nisl.
            </p>

            <p className="text-gray-300">
              This guide will walk you through everything you need to know about building on Web3 platforms. We'll cover
              setup, architecture, development best practices, and deployment strategies.
            </p>

            <h3 className="text-xl font-bold text-white">Getting Started</h3>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
              nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
            </p>

            {/* Pro tip box */}
            <div
              className={`bg-gradient-to-r ${currentTheme.gradientSubtle} border-l-4 border-${currentTheme.primary} rounded-r-lg p-4 my-6`}
            >
              <h4 className={`${currentTheme.text} font-medium mb-2 flex items-center gap-2`}>
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Pro Tip
              </h4>
              <p className="text-gray-300 text-sm m-0">
                When working with Web3 technologies, always test your applications on testnets before deploying to
                mainnet. This will save you from potential costly mistakes.
              </p>
            </div>

            {/* Code block */}
            <div className="bg-[#0F1116] border border-gray-800 rounded-lg p-4 my-6 overflow-x-auto">
              <pre className="text-gray-300 text-sm">
                <code>
                  {`// Example Web3 connection code
import Web3 from 'web3';

// Connect to a Web3 provider
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

// Get the current network ID
const networkId = await web3.eth.net.getId();
console.log(\`Connected to network: \${networkId}\`);

// Get accounts
const accounts = await web3.eth.getAccounts();
console.log(\`Available accounts: \${accounts}\`);`}
                </code>
              </pre>
            </div>

            <h3 className="text-xl font-bold text-white">Key Concepts</h3>
            <ul className="text-gray-300 space-y-2">
              <li>Decentralization and its importance</li>
              <li>Blockchain technology fundamentals</li>
              <li>Smart contracts and their applications</li>
              <li>Web3 infrastructure and protocols</li>
            </ul>

            {/* Interactive exercise */}
            <div className="bg-[#0F1116] border border-gray-800 rounded-lg p-4 my-6">
              <h4 className="font-medium mb-3 text-white">Interactive Exercise</h4>
              <p className="text-gray-300 mb-3">
                Try to complete the following code snippet to connect to a smart contract:
              </p>
              <div className="bg-black/30 border border-gray-700 p-3 rounded-lg mb-3">
                <pre className="text-gray-300 text-sm">
                  <code>
                    {`// Complete the code
const contractAddress = '0x...';
const contractABI = [...];

// Create contract instance
const contract = new web3.eth.Contract(
  /* Your code here */
);

// Call a read-only function
const result = await contract.methods
  /* Your code here */
  .call();`}
                  </code>
                </pre>
              </div>
              <button
                className={`bg-gradient-to-r ${currentTheme.gradient} hover:bg-gradient-to-r hover:${currentTheme.gradientHover} text-white px-4 py-2 rounded-lg text-sm transition-all duration-200`}
              >
                Check Answer
              </button>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-800">
            <button
              className={`px-4 py-2 rounded-lg border border-gray-800 flex items-center gap-2 transition-all duration-200 ${
                activeChapter === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#0F1116] hover:border-gray-700 cursor-pointer text-gray-300 hover:text-white"
              }`}
              onClick={() => activeChapter > 0 && setActiveChapter(activeChapter - 1)}
              disabled={activeChapter === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Previous Chapter
            </button>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 transition-colors text-gray-300 hover:text-white">
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 transition-colors text-gray-300 hover:text-white">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 transition-colors text-gray-300 hover:text-white">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>

            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                activeChapter === chapters.length - 1
                  ? "opacity-50 cursor-not-allowed border border-gray-800 text-gray-500"
                  : `bg-gradient-to-r ${currentTheme.gradient} hover:bg-gradient-to-r hover:${currentTheme.gradientHover} text-white cursor-pointer`
              }`}
              onClick={() => {
                if (activeChapter < chapters.length - 1) {
                  markAsCompleted(activeChapter)
                  setActiveChapter(activeChapter + 1)
                }
              }}
              disabled={activeChapter === chapters.length - 1}
            >
              Next Chapter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideViewer
