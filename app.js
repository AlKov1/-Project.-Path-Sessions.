const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const articleRoutes = require('./routes/articles');


app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/prods', productRoutes);
app.use('/post', articleRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
