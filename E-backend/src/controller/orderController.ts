import Order from "../models/order";

export const createOrder = async (req: any, res: any) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      items,
      totalAmount,
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOrders = async (req: any, res: any) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
