import { Request, Response } from "express";
import Product from "../models/productModel";

// ✅ GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Failed to fetch products",
      error,
    });
  }
};


export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Failed to create product",
      error,
    });
  }
};
