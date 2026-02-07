const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const reviewsRoutes = require('./routes/reviews');

const app = express();

connectDB();


app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', process.env.FRONTEND_URL],
  credentials: true
}));


app.get('/api/test', (req, res) => {
  res.json({ message: "API WORKING " });
});


app.use('/api/reviews', reviewsRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
