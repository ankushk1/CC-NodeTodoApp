require('dotenv').config()
const express = require('express');
const app = express();
const port = 8002;
const db = require('./config/mongoose');
const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoutes);
app.use("/", todoRoutes);
app.set('secretkey', process.env.SECRET_KEY)



app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});