const express = require("express");
const mongoose = require("mongoose");
const app = express();

const mongoURI = "mongodb://localhost:27017/test";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Đã kết nối với MongoDB");
  })
  .catch((error) => {
    console.error("Lỗi kết nối MongoDB:", error);
  });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  stock: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách sản phẩm" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: "Lỗi khi thêm sản phẩm" });
  }
});

app.get("/", (req, res) => {
  res.send("abc");
});

app.listen(8080, () => {
  console.log("Đang chạy");
});
