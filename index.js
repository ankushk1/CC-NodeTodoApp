require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8002;
const db = require('./config/mongoose');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin:'*',
  methods:'GET,PUT,POST,DELETE,OPTIONS'
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

app.use('/user', userRoutes);
app.use('/', todoRoutes);
app.set('secretkey', process.env.SECRET_KEY);

app.get('/', function (req, res) {
  res.send('Node App working')
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
