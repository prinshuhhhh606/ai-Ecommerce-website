import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

import connectDB from "../src/config/db";
import axios from "axios";
import Product from "../src/models/productModel";

async function importProducts() {
  try {
    await connectDB();

    const response = await axios.get(
      "https://dummyjson.com/products?limit=194",
    );

    const products = response.data.products;

    await Product.deleteMany({});

    await Product.insertMany(
      products.map((p: any) => ({
        title: p.title,
        description: p.description,
        price: p.price,
        category: p.category,
        image: p.thumbnail,
        stock: p.stock,
      })),
    );

    console.log(`${products.length} Products Imported Successfully`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

importProducts();
