import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// Database Connection
import connectDB from "./config/db.js";

// Route Imports
import heroRoutes from "./routes/heroRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import visionRoutes from "./routes/visionRoutes.js";
import chairmanRoutes from "./routes/chairmanRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import committeeRoutes from "./routes/committeeRoutes.js";
import programmeRoutes from "./routes/programmeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import mapRoutes from "./routes/mapRoutes.js";
import contactPageRoutes from "./routes/contactPageRoutes.js"; // FAQ & Map Settings
import jobRoutes from "./routes/jobRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import aboutSnippetRoutes from "./routes/aboutSnippetRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import mapSettingRoutes from "./routes/mapSettingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
// Middleware
app.use(
  cors({
    // Yahan Frontend ka URL hona chahiye, Backend ka nahi!
    origin: [
      "http://localhost:3000",
      "https://vil-cms.vercel.app",
      "http://localhost:3001", // Aapka actual frontend domain
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());



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
