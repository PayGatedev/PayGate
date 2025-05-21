import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { creatorRouter } from "./routes/creator"
import { contentRouter } from "./routes/content"
import { s3UploadRouter } from "./routes/upload"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI!

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
  })

// Routes
app.use("/api/creators", creatorRouter)

app.use("/api/content", contentRouter)

app.use("/api/s3", s3UploadRouter);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
