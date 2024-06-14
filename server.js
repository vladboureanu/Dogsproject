const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const breedsRouter = require('./routes/breeds');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/dogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount breedsRouter at /breeds
app.use('/breeds', breedsRouter);

// Root route handler
app.get('/', (req, res) => {
  res.redirect('/breeds'); // Redirect to /breeds or render another view
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
