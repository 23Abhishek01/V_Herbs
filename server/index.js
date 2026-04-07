const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();

// import require configs
const dbConnect = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');

// import all routes
const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const herbRoutes = require('./routes/Herbs');
const noteRoutes = require('./routes/Note');
const contactRoutes = require('./routes/Contact');
const chatBotRoutes = require('./routes/ChatBot');

// database connect
dbConnect();
// connect with cloudinary
cloudinaryConnect();

// --- MIDDLEWARES (Sahi Order) ---

// 1. CORS Setup (Sabse upar)
const cors = require("cors");

app.use(
    cors({
        origin: "https://v-herbs-three.vercel.app", // Aapki Vercel site ka link
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
);

app.options("*", cors()); // Ye line options request ko handle karne ke liye zaroori hai

// Pre-flight request handle karne ke liye
app.options("*", cors());

// 2. Baki body parsers
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// --- ROUTES MAPPING ---
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/herb', herbRoutes);
app.use('/api/v1/note', noteRoutes);
app.use('/api/v1', contactRoutes);
app.use('/api/v1/ai', chatBotRoutes);

// testing route
app.get('/', (req, res) => res.send(`<h1>VHerbs Backend is Running!</h1>`));

// get port and start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started at ${PORT}`));