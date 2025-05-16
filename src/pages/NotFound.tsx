import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0F1116] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link to="/" className="bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-6 py-2 rounded-md transition-colors">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
