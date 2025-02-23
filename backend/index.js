const express = require('express');
const mongoose = require('mongoose');
const sellerRoutes = require('./routes/SellerRoutes');
const userRoutes = require('./routes/UserRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');  
require("dotenv").config();

const DB_URL = process.env.DB_URL || "mongodb+srv://liuch:Lazlo.258@cluster0.egrgn.mongodb.net/Craft-Connect?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware (Order matters!)
app.use(cookieParser()); 

app.use(cors({
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MongoDB Connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
});

// Routes
app.use('/api/v1/seller', sellerRoutes);
app.use('/api/v1/user', userRoutes);
app.get('/', (req, res) => {
    res.send("🔥 Craft Connect Backend is Running! 🔥");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
