import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// Database Connection
import connectDB from './config/db.js';

// Route Imports
import aboutSnippetRoutes from './routes/aboutSnippetRoutes.js';
dotenv.config();
connectDB();

const app = express();


// Middleware
// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "https://vil-cms.vercel.app"], // Add your Next.js URL
  credentials: true, // This allows cookies to be sent back and forth
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());


app.use(cookieParser());

// Static Folders for Uploads (Images/PDFs)

app.use('/api/about-snippet', aboutSnippetRoutes);


// ... existing code ...



app.get("/", (req, res) => {
  res.send("API running...");
});
const PORT = process.env.PORT || 1337;

// Only run server in local environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app; 