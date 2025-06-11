"use client"

import { useState, useEffect } from "react"
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import CodeBlock from "@tiptap/extension-code-block"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  X,
  Check,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  className?: string
  label?: string
  required?: boolean
  minHeight?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  error,
  className = "",
  label,
  required,
  minHeight = "400px",
}: RichTextEditorProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#FF3366] underline underline-offset-2",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md max-w-full",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-white/10 p-4 rounded-md font-mono text-sm my-4",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    onFocus: () => {
      setIsFocused(true)
    },
    onBlur: () => {
      setIsFocused(false)
    },
  })

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  const handleInsertLink = () => {
    if (!linkUrl) return

    editor?.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
    setIsLinkMenuOpen(false)
    setLinkUrl("")
  }

  const handleInsertImage = () => {
    const url = prompt("Enter image URL")
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-white/80 mb-2 text-sm font-medium">
          {label} {required && <span className="text-[#FF3366]">*</span>}
        </label>
      )}

      <div
        className={`relative bg-white/5 border ${
          error ? "border-red-500" : isFocused ? "border-[#FF3366]/50" : "border-white/10"
        } rounded-lg transition-all ${className}`}
      >
        {/* Main Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-white/5 rounded-t-lg">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("bold") ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Bold"
            type="button"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("italic") ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Italic"
            type="button"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("underline") ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Underline"
            type="button"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("strike") ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Strikethrough"
            type="button"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-white/10 mx-1"></div>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("heading", { level: 1 }) ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Heading 1"
            type="button"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("heading", { level: 2 }) ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Heading 2"
            type="button"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("heading", { level: 3 }) ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Heading 3"
            type="button"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-white/10 mx-1"></div>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("bulletList") ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Bullet List"
            type="button"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("orderedList") ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Ordered List"
            type="button"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("blockquote") ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Quote"
            type="button"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("codeBlock") ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Code Block"
            type="button"
          >
            <Code className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-white/10 mx-1"></div>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive({ textAlign: "left" }) ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Align Left"
            type="button"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive({ textAlign: "center" }) ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Align Center"
            type="button"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive({ textAlign: "right" }) ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Align Right"
            type="button"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-white/10 mx-1"></div>
          <button
            onClick={() => setIsLinkMenuOpen(true)}
            className={`p-1.5 rounded-md hover:bg-white/10 ${editor.isActive("link") ? "bg-white/10 text-white" : "text-white/70"}`}
            title="Insert Link"
            type="button"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleInsertImage}
            className={`p-1.5 rounded-md hover:bg-white/10 text-white/70`}
            title="Insert Image"
            type="button"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={`p-1.5 rounded-md hover:bg-white/10 text-white/70`}
            title="Horizontal Rule"
            type="button"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="flex-1"></div>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${!editor.can().undo() ? "opacity-30 cursor-not-allowed" : "text-white/70"}`}
            title="Undo"
            type="button"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={`p-1.5 rounded-md hover:bg-white/10 ${!editor.can().redo() ? "opacity-30 cursor-not-allowed" : "text-white/70"}`}
            title="Redo"
            type="button"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Link Menu */}
        {isLinkMenuOpen && (
          <div className="p-2 border-b border-white/10 bg-white/5 flex items-center gap-2">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              className="flex-1 bg-white/5 border border-white/10 rounded-md py-1 px-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#FF3366]/30"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleInsertLink()
                }
              }}
            />
            <button
              onClick={handleInsertLink}
              className="p-1 rounded-md bg-[#FF3366]/20 text-[#FF3366] hover:bg-[#FF3366]/30"
              title="Confirm"
              type="button"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsLinkMenuOpen(false)}
              className="p-1 rounded-md hover:bg-white/10 text-white/70"
              title="Cancel"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Editor Content */}
        <EditorContent
          editor={editor}
          className={`prose prose-invert max-w-none p-4 focus:outline-none`}
          style={{ minHeight }}
        />

        {/* Bubble Menu */}
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="bg-[#1A1D25] rounded-md shadow-lg border border-white/10 flex overflow-hidden"
          >
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1.5 hover:bg-white/10 ${editor.isActive("bold") ? "bg-white/10 text-white" : "text-white/70"}`}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1.5 hover:bg-white/10 ${editor.isActive("italic") ? "bg-white/10 text-white" : "text-white/70"}`}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-1.5 hover:bg-white/10 ${editor.isActive("underline") ? "bg-white/10 text-white" : "text-white/70"}`}
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsLinkMenuOpen(true)}
              className={`p-1.5 hover:bg-white/10 ${editor.isActive("link") ? "bg-white/10 text-white" : "text-white/70"}`}
            >
              <LinkIcon className="w-4 h-4" />
            </button>
          </BubbleMenu>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
