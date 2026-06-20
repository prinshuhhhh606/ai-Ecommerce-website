import Order from "../models/order";

export const createOrder = async (req: any, res: any) => {
  try {
    const { items, totalAmount } = req.body;

    const platformCommission = totalAmount * 0.1; // 10%
    const shopkeeperAmount = totalAmount * 0.9; // 90%

    const order = await Order.create({
      items,
      totalAmount,
      platformCommission,
      shopkeeperAmount,
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

export const getEarnings = async (req:any, res:any) => {
  try {
    const orders = await Order.find();

    const totalSales = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    const totalCommission = orders.reduce(
      (sum, order) => sum + order.platformCommission,
      0,
    );

    const totalShopkeeperAmount = orders.reduce(
      (sum, order) => sum + order.shopkeeperAmount,
      0,
    );

    res.status(200).json({
      totalSales,
      totalCommission,
      totalShopkeeperAmount,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
