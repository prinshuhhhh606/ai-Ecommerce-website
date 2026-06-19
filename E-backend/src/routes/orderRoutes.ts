import { Router } from "express";
import Order from "../models/order";

const router = Router();

/*

CREATE ORDER
POST /api/orders
================

*/
router.post("/orders", async (req, res) => {
try {
const { items, totalAmount } = req.body;

const order = await Order.create({
  items,
  totalAmount,
  status: "Pending",
});

console.log("ORDER SAVED =>", order);

res.status(201).json({
  success: true,
  order,
});


} catch (error) {
console.log("ORDER ERROR =>", error);


res.status(500).json({
  success: false,
  message: "Failed to create order",
});


}
});

/*

GET ALL ORDERS
GET /api/orders
===============

*/
router.get("/orders", async (req, res) => {
try {
const orders = await Order.find().sort({
createdAt: -1,
});


res.status(200).json({
  success: true,
  orders,
});


} catch (error) {
console.log("GET ORDERS ERROR =>", error);


res.status(500).json({
  success: false,
  message: "Failed to fetch orders",
});


}
});

/*

GET SINGLE ORDER
GET /api/orders/:id
===================

*/
router.get("/orders/:id", async (req, res) => {
try {
const order = await Order.findById(req.params.id);


if (!order) {
  return res.status(404).json({
    success: false,
    message: "Order not found",
  });
}

res.status(200).json({
  success: true,
  order,
});


} catch (error) {
console.log("GET ORDER ERROR =>", error);


res.status(500).json({
  success: false,
  message: "Failed to fetch order",
});

}
});

 /*

UPDATE ORDER STATUS
PUT /api/orders/:id/status
==========================

*/
router.put("/orders/:id/status", async (req, res) => {
try {
const { status } = req.body;


const order = await Order.findByIdAndUpdate(
  req.params.id,
  {
    status,
  },
  {
    new: true,
  }
);

if (!order) {
  return res.status(404).json({
    success: false,
    message: "Order not found",
  });
}

console.log("STATUS UPDATED =>", order);

res.status(200).json({
  success: true,
  order,
});


} catch (error) {
console.log("UPDATE STATUS ERROR =>", error);


res.status(500).json({
  success: false,
  message: "Failed to update status",
});


}
});

/*

DELETE ORDER
DELETE /api/orders/:id
======================

*/
router.delete("/orders/:id", async (req, res) => {
try {
const order = await Order.findByIdAndDelete(
req.params.id
);


if (!order) {
  return res.status(404).json({
    success: false,
    message: "Order not found",
  });
}

res.status(200).json({
  success: true,
  message: "Order deleted successfully",
});


} catch (error) {
console.log("DELETE ORDER ERROR =>", error);

res.status(500).json({
  success: false,
  message: "Failed to delete order",
});


}
});

export default router;
