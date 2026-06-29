import express from "express";
import { getProducts, createProduct } from "../controller/productController";

const router = express.Router();

console.log("✅ Product Routes Loaded");
// GET all products
router.get("/", getProducts);

// (optional) create product
router.post("/", createProduct);

export default router;
