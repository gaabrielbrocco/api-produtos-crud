require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(cors());

const productRoutes = require('./routes/productRoutes')

app.use('/products', productRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Oi Express" });
});

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qfrtgzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
