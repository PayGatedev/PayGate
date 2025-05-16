"use client"

import { Eye, Heart, MessageSquare, MoreVertical, Edit, Trash2, ExternalLink } from "lucide-react"
import { useState } from "react"

interface ContentCardProps {
  title: string
  type: "video" | "article" | "podcast" | "guide"
  status: "published" | "draft" | "scheduled"
  accessType: "free" | "one-time" | "recurring" | "nft"
  date: string
  views: number
  likes: number
  comments: number
  thumbnailUrl: string
}

export function ContentCard({
  title,
  type,
  status,
  accessType,
  date,
  views,
  likes,
  comments,
  thumbnailUrl,
}: ContentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const typeColors = {
    video: "bg-blue-500/20 text-blue-500",
    article: "bg-green-500/20 text-green-500",
    podcast: "bg-purple-500/20 text-purple-500",
    guide: "bg-yellow-500/20 text-yellow-500",
  }

  const statusColors = {
    published: "bg-green-500/20 text-green-500",
    draft: "bg-gray-500/20 text-gray-400",
    scheduled: "bg-blue-500/20 text-blue-500",
  }

  const accessColors = {
    free: "bg-green-500/20 text-green-500",
    "one-time": "bg-yellow-500/20 text-yellow-500",
    recurring: "bg-[#FF3366]/20 text-[#FF3366]",
    nft: "bg-purple-500/20 text-purple-500",
  }

  return (
    <div className="bg-[#161921] border border-gray-800 rounded-lg overflow-hidden">
      <div className="relative aspect-video bg-gray-800">
        <img src={thumbnailUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 flex gap-2">
          <span className={`text-xs px-2 py-1 rounded-md ${statusColors[status]}`}>{status}</span>
          <span className={`text-xs px-2 py-1 rounded-md ${accessColors[accessType]}`}>{accessType}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <span className={`text-xs px-2 py-1 rounded-md ${typeColors[type]}`}>{type}</span>
            <h3 className="font-medium mt-2 line-clamp-1">{title}</h3>
            <p className="text-xs text-gray-400 mt-1">{date}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-md hover:bg-[#0F1116] transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-[#0F1116] border border-gray-800 rounded-md shadow-lg z-10">
                <button className="flex items-center w-full gap-2 px-3 py-2 text-xs hover:bg-[#161921] transition-colors">
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                <button className="flex items-center w-full gap-2 px-3 py-2 text-xs hover:bg-[#161921] transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  View on Chain
                </button>
                <button className="flex items-center w-full gap-2 px-3 py-2 text-xs text-red-400 hover:bg-[#161921] transition-colors">
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Eye className="w-3 h-3" />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Heart className="w-3 h-3" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <MessageSquare className="w-3 h-3" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
