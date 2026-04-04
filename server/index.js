import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Database Connection
import connectDB from './config/db.js';

// Route Imports
import heroRoutes from './routes/heroRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import visionRoutes from './routes/visionRoutes.js';
import chairmanRoutes from './routes/chairmanRoutes.js';
import boardRoutes from './routes/boardRoutes.js';
import committeeRoutes from './routes/committeeRoutes.js';
import programmeRoutes from './routes/programmeRoutes.js';
import productRoutes from './routes/productRoutes.js';
import postRoutes from './routes/postRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import footerRoutes from './routes/footerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import mapRoutes from './routes/mapRoutes.js';
import contactPageRoutes from './routes/contactPageRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import aboutSnippetRoutes from './routes/aboutSnippetRoutes.js';
import statRoutes from './routes/statRoutes.js';
import mapSettingRoutes from './routes/mapSettingRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes

// Home & About
app.use('/api/hero-sliders', heroRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/vision-mission', visionRoutes);
app.use('/api/chairman-message', chairmanRoutes);

// Team
app.use('/api/board-members', boardRoutes);
app.use('/api/committees', committeeRoutes);
app.use('/api/programmes', programmeRoutes);

// Products & Content
app.use('/api/products', productRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/reviews', reviewRoutes);

// Footer
app.use('/api/footer-links', footerRoutes);

// Contact & Location
app.use('/api/contact-info', contactRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/map-location', mapRoutes);
app.use('/api/contact-page-settings', contactPageRoutes);
app.use('/api/map-settings', mapSettingRoutes);

// Careers & Docs
app.use('/api/jobs', jobRoutes);
app.use('/api/documents', documentRoutes);

// Misc
app.use('/api/about-snippet', aboutSnippetRoutes);
app.use('/api/stats', statRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Start server
const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});