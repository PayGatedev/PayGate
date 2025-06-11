"use client"

import { useState } from "react"
import { Video, FileText, Headphones, BookOpen, Play, Users } from "lucide-react"

interface RelatedContentProps {
  relatedContent: any[]
}

const RelatedContentSidebar = ({ relatedContent }: RelatedContentProps) => {
  const [autoplay, setAutoplay] = useState(true)

  // Function to get content type icon
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-8 h-8 text-gray-600" />
      case "article":
        return <FileText className="w-8 h-8 text-gray-600" />
      case "podcast":
        return <Headphones className="w-8 h-8 text-gray-600" />
      case "guide":
        return <BookOpen className="w-8 h-8 text-gray-600" />
      default:
        return <Video className="w-8 h-8 text-gray-600" />
    }
  }

  // Function to get small content type icon
  const getSmallContentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-3 h-3" />
      case "article":
        return <FileText className="w-3 h-3" />
      case "podcast":
        return <Headphones className="w-3 h-3" />
      case "guide":
        return <BookOpen className="w-3 h-3" />
      default:
        return <Video className="w-3 h-3" />
    }
  }

  // Trending tags
  const trendingTags = ["NFTs", "DeFi", "Web3", "Gaming", "DAOs", "Metaverse", "Solana", "Ethereum"]

  return (
    <div className="h-full overflow-y-auto hide-scrollbar border-l border-gray-800 bg-gradient-to-b from-[#0A0A0B] to-[#0F1116]">
      <div className="p-4">
        {/* Auto-play toggle */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Up next</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Autoplay</span>
            <div
              className={`relative inline-block w-10 h-5 rounded-full ${
                autoplay ? "bg-[#FF3366]/20" : "bg-[#161921]"
              } cursor-pointer shadow-glow-sm transition-colors`}
              onClick={() => setAutoplay(!autoplay)}
            >
              <input type="checkbox" className="sr-only" checked={autoplay} readOnly />
              <span
                className={`absolute top-1 w-3 h-3 rounded-full bg-[#FF3366] transition-all duration-200 ${
                  autoplay ? "left-6" : "left-1"
                }`}
              ></span>
            </div>
          </div>
        </div>

        {/* Trending tags */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Trending Tags</h3>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#161921] text-gray-300 px-2 py-1 rounded-full text-xs hover:bg-[#FF3366]/10 hover:text-[#FF3366] hover:border-[#FF3366]/30 cursor-pointer transition-all duration-200 border border-gray-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related videos list */}
        <div className="space-y-3">
          {relatedContent.map((item) => (
            <div
              key={item.id}
              className="flex gap-2 hover:bg-[#161921] rounded-lg p-1 cursor-pointer transition-colors group"
            >
              {/* Thumbnail */}
              <div className="relative w-40 h-20 bg-gradient-to-br from-[#0F1116] to-[#161921] rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden shadow-glow-sm group-hover:shadow-glow">
                {getContentTypeIcon(item.type)}

                {/* Play button overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#FF3366]/80 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" fill="white" />
                  </div>
                </div>

                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                  {item.type === "video" && item.duration}
                  {item.type === "article" && item.readTime}
                  {item.type === "podcast" && item.duration}
                  {item.type === "guide" && item.chapters}
                </div>
              </div>

              {/* Content info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h4>
                <p className="text-gray-400 text-xs mb-1 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {item.creator}
                </p>
                <div className="flex items-center text-gray-400 text-xs">
                  <span>{item.views} views</span>
                  <span className="mx-1">•</span>
                  <span>{item.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Creator's other content */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <h3 className="font-medium mb-3">More from this creator</h3>
          <div className="grid grid-cols-2 gap-2">
            {relatedContent.slice(0, 4).map((item) => (
              <div key={`creator-${item.id}`} className="group cursor-pointer">
                <div className="relative aspect-video bg-gradient-to-br from-[#0F1116] to-[#161921] rounded-md flex items-center justify-center mb-1 overflow-hidden shadow-glow-sm group-hover:shadow-glow">
                  {getSmallContentTypeIcon(item.type)}

                  {/* Play button overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#FF3366]/80 flex items-center justify-center">
                      <Play className="w-3 h-3 text-white" fill="white" />
                    </div>
                  </div>

                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 py-0.5 rounded">
                    {item.type === "video" && item.duration}
                    {item.type === "article" && item.readTime}
                    {item.type === "podcast" && item.duration}
                    {item.type === "guide" && item.chapters}
                  </div>
                </div>
                <h5 className="text-xs font-medium line-clamp-1">{item.title}</h5>
                <p className="text-gray-400 text-[10px]">{item.views} views</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelatedContentSidebar
