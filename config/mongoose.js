const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Error connecting to db', err.message);
});

db.on('open', () => {
  console.log('Successfully Connected to DB');
});
