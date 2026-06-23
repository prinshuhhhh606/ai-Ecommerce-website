import Order from "../models/order";

export const createOrder = async (req: any, res: any) => {
  try {
    const { items, totalAmount } = req.body;

    const platformCommission = totalAmount * 0.1; // 10%
    const shopkeeperAmount = totalAmount - platformCommission;

    const order = await Order.create({
      items,
      totalAmount,

      platformCommission,
      shopkeeperAmount,

      paymentStatus: "Success", // testing
      settlementStatus: "Pending",

      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

export const getOrders = async (req: any, res: any) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

export const getEarnings = async (req: any, res: any) => {
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

    const totalOrders = orders.length;

    const successfulPayments = orders.filter(
      (order) => order.paymentStatus === "Success",
    ).length;

    const pendingSettlements = orders.filter(
      (order) => order.settlementStatus === "Pending",
    ).length;

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      totalSales,
      totalOrders,
      totalCommission,
      totalShopkeeperAmount,
      successfulPayments,
      pendingSettlements,
      recentOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch dashboard data",
    });
  }
};
