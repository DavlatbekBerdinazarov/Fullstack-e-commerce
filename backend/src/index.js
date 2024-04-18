const express = require('express');
const cors = require('cors');
const app = express();
const pagesRoute = require('./routes/pages/allproducts');
const mongoose = require('mongoose');
require("dotenv").config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api',pagesRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const port = process.env.PORT || 4545;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});