require('dotenv').config()
const express = require("express");
const PORT = process.env.PORT || 8000;
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const userRouter = require("./routes/user");
const productRouter = require("./routes/products");
const wishRouter = require("./routes/whishlist");
const cartRouter = require("./routes/mycart");
const payRouter = require("./routes/payment");
const adminRouter = require("./routes/admin");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

app.use(
  cors({
    origin:["https://tim-ex-zone.vercel.app",
      process.env.CLIENT_URI
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log("error while connecting");
  });

app.set('view engine',"ejs")
app.set('views', path.join(__dirname, "views"))

app.get("/test", (req, res) => {
  res.render("test", { name: "Arjun" });
});

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/pay", payRouter);
app.use("/admin", adminRouter);
app.use("/wishlist", checkForAuthenticationCookie('token'),wishRouter);
app.use("/pimages", express.static(path.join(__dirname, "pimages")));


app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
