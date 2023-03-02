require("dotenv").config();
const express = require("express");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connection");
// routes
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const productRoute = require("./routes/product");

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.status(200).json("Amazon-clone-API")
})

app.use("/api/user",userRoute);
app.use("/api/admin",adminRoute);
app.use("/api/product",productRoute);

//Middlewares
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log("server listining on port:"+port))
  } catch (error) {
    console.log(error);
  }
}

start();