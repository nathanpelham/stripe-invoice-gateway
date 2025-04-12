const express = require('express');
const path = require('path'); // Correct the missing quote here
const fs = require('fs');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(helmet()); // Adds security-related HTTP headers
app.use(express.json({ limit: '10kb' })); // Limits request body size
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // For URL-encoded form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Validate public folder existence
const publicPath = path.join(__dirname, 'public');
if (!fs.existsSync(publicPath)) {
    console.warn('Public folder not found!');
}

// Routes
let invoiceRoutes;
try {
    invoiceRoutes = require('./routes/invoiceRoutes');
} catch (err) {
    console.error('Failed to load invoiceRoutes:', err);
    process.exit(1);
}

app.use('/api/invoice', invoiceRoutes); // Register invoice routes

// Root route - serve index.html
const indexPath = path.join(__dirname, 'public', 'index.html');
app.get('/', (req, res) => {
    fs.access(indexPath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Index file not found');
        }
        res.sendFile(indexPath); // Serve the index.html file
    });
});

// 404 Handler (catch-all for undefined routes)
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Error Handler (global error catcher)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Port
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    }
});
