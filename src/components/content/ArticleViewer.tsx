import type React from "react"
import { Bookmark, Share2, ThumbsUp, MessageSquare, Copy } from "lucide-react"

interface ArticleViewerProps {
  content: any
  theme?: any
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({ content, theme }) => {
  // Default theme if not provided
  const currentTheme = theme || {
    primary: "green-500",
    primaryLight: "green-400",
    primaryDark: "green-600",
    gradient: "from-green-500 to-green-600",
    gradientLight: "from-green-400 to-green-500",
    gradientSubtle: "from-green-500/20 to-green-600/10",
    gradientHover: "from-green-400 to-green-600",
    bg: "green-500/10",
    bgLight: "green-500/5",
    border: "green-500/30",
    icon: "text-green-400",
    text: "text-green-400",
    hover: "hover:text-green-400",
    ring: "ring-green-500/30",
  }

  return (
    <div className="bg-[#161921] border border-gray-800 rounded-xl overflow-hidden">
      {/* Article header image */}
      <div className="aspect-[2/1] bg-gradient-to-br from-[#0F1116] to-[#161921] flex items-center justify-center border-b border-gray-800">
        <div className="text-center">
          <div
            className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${currentTheme.gradientSubtle} flex items-center justify-center mb-2 border border-${currentTheme.border}`}
          >
            <svg
              className={`w-8 h-8 ${currentTheme.icon}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <span className="text-gray-400">Article Header Image</span>
        </div>
      </div>

      {/* Article content */}
      <div className="p-8">
        {/* Mobile share buttons */}
        <div className="flex items-center justify-center gap-3 mb-6 lg:hidden">
          <button className="w-10 h-10 rounded-full bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white">
            <ThumbsUp className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#0F1116] hover:bg-[#1e212b] border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Article body */}
        <div className="prose prose-invert max-w-none lg:max-w-3xl mx-auto">
          <p className="text-xl leading-relaxed mb-6 text-gray-300">
            Web3 represents the next evolution of the internet, built on blockchain technology and decentralized
            protocols. This comprehensive guide breaks down the core concepts, technologies, and potential impact of
            Web3 on our digital future.
          </p>

          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
            nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam auctor, nisl eget ultricies aliquam, nunc nisl
            aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Key Concepts of Web3
          </h2>

          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
            nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>

          {/* Highlighted section */}
          <div
            className={`bg-gradient-to-r ${currentTheme.gradientSubtle} border-l-4 border-${currentTheme.primary} p-4 my-6 rounded-r-lg`}
          >
            <p className="italic text-gray-300 m-0">
              "Web3 is not just a technological shift, but a fundamental reimagining of how we interact with digital
              systems and each other."
            </p>
          </div>

          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
            nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3 text-white">Decentralization and its importance</h3>

          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
            nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>

          {/* Code block */}
          <div className="bg-[#0F1116] border border-gray-800 p-4 rounded-lg my-6 overflow-x-auto">
            <pre className="text-gray-300 text-sm">
              <code>
                {`// Example of a simple smart contract
contract SimpleStorage {
    uint storedData;
    
    function set(uint x) public {
        storedData = x;
    }
    
    function get() public view returns (uint) {
        return storedData;
    }
}`}
              </code>
            </pre>
            <div className="flex justify-end mt-2">
              <button
                className={`text-gray-400 hover:text-white ${currentTheme.hover} flex items-center gap-1 text-xs transition-colors`}
              >
                <Copy className="w-3 h-3" />
                Copy code
              </button>
            </div>
          </div>

          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
            nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3 text-white">Blockchain technology fundamentals</h3>

          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
            nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>

          <ul className="list-disc pl-6 my-4 space-y-2 text-gray-300">
            <li>Decentralization and its importance</li>
            <li>Blockchain technology fundamentals</li>
            <li>Smart contracts and their applications</li>
            <li>Web3 infrastructure and protocols</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3 text-white">Smart contracts and their applications</h3>

          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
            nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>

          {/* Image placeholder */}
          <div className="bg-[#0F1116] border border-gray-800 aspect-video rounded-lg flex items-center justify-center my-6">
            <div className="text-center">
              <div
                className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${currentTheme.gradientSubtle} flex items-center justify-center mb-2 border border-${currentTheme.border}`}
              >
                <svg
                  className={`w-6 h-6 ${currentTheme.icon}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <span className="text-gray-400 text-sm">Diagram: Web3 Architecture</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3 text-white">Web3 infrastructure and protocols</h3>

          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
            nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Conclusion
          </h2>

          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc
            nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
          </p>
        </div>

        {/* Author info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentTheme.gradientSubtle} flex-shrink-0 flex items-center justify-center border border-${currentTheme.border}`}
            >
              <svg
                className={`w-8 h-8 ${currentTheme.icon}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Written by {content.creator?.username || "Author"}</h3>
              <p className="text-gray-400 mt-1 mb-2">Web3 Developer & Educator</p>
              <p className="text-gray-300 text-sm">
                Creating educational content about blockchain technology, Web3 development, and decentralized
                applications. Join me on this journey to explore the future of the internet.
              </p>
            </div>
          </div>
        </div>

        {/* Article footer */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {(content.tags || ["web3", "blockchain", "development"]).map((tag, index) => (
              <span
                key={index}
                className={`bg-[#0F1116] text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gradient-to-r hover:${currentTheme.gradientSubtle} ${currentTheme.hover} hover:border-${currentTheme.border} cursor-pointer transition-all duration-200 border border-gray-800`}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="text-gray-400 text-sm">
            Published on {new Date(content.createdAt).toLocaleDateString() || "May 15, 2025"} • 5 min read
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleViewer
