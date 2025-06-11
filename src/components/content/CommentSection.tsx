"use client"

import type React from "react"
import { useState } from "react"
import { MessageSquare, ThumbsUp, MoreVertical, Users } from "lucide-react"

interface CommentSectionProps {
  contentId: string
  commentCount: number
}

const CommentSection: React.FC<CommentSectionProps> = ({ contentId, commentCount }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "CryptoEnthusiast",
      timeAgo: "2 days ago",
      content:
        "Great content! This really helped me understand the concepts better. Looking forward to more content like this.",
      likes: 24,
      isLiked: false,
    },
    {
      id: 2,
      author: "BlockchainDev",
      timeAgo: "1 week ago",
      content:
        "I have a question about the implementation details. Would you mind elaborating on how this works with existing protocols?",
      likes: 12,
      isLiked: false,
    },
  ])
  const [commentText, setCommentText] = useState("")

  const handleLikeComment = (id: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      }),
    )
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: comments.length + 1,
      author: "You",
      timeAgo: "Just now",
      content: commentText,
      likes: 0,
      isLiked: false,
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  return (
    <div className="bg-[#161921] border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-[#FF3366]" />
        Comments ({commentCount})
      </h2>

      <div className="flex gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex-shrink-0 flex items-center justify-center shadow-glow-sm">
          <Users className="w-5 h-5 text-[#FF3366]" />
        </div>
        <div className="flex-1">
          <textarea
            placeholder="Add a comment..."
            className="w-full bg-[#0F1116] border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:border-[#FF3366]/30 transition-all resize-none min-h-[80px]"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              className="bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white px-4 py-2 rounded-md hover:from-[#FF6699] hover:to-[#FF3366] transition-all shadow-glow-sm"
              onClick={handleAddComment}
              disabled={!commentText.trim()}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex-shrink-0 flex items-center justify-center shadow-glow-sm">
              <Users className="w-5 h-5 text-[#FF3366]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-gray-400 text-sm">{comment.timeAgo}</span>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-2 text-gray-300">{comment.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <button
                  className={`flex items-center gap-1 ${
                    comment.isLiked ? "text-[#FF3366]" : "text-gray-400 hover:text-white"
                  } transition-colors`}
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{comment.likes}</span>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection
