const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Stripe Gateway is running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
console.log('Stripe Gateway Running');

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const invoiceRoutes = require('./routes/invoiceRoutes');
app.use('/api/invoice', invoiceRoutes);

// Root route - show HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
