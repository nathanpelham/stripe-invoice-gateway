console.log('Stripe Gateway Running');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Stripe Gateway is running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
