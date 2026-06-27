import Order from "../models/order";

export class OrderService {
  async createOrder(data: any) {
    console.log("📦 OrderService running");

    const order = await Order.create({
      items: data.items,

      totalAmount: data.totalAmount,

      developerAmount: data.developerAmount,
      shopkeeperAmount: data.shopkeeperAmount,

      // 🔗 important links
      paymentId: data.paymentId || null,
      couponCode: data.couponCode || null,

      paymentStatus: data.paymentStatus || "Success",

      settlementStatus: "Pending",

      status: "Confirmed",

      hiddenByUser: false,
    });

    return order;
  }

  async getAllOrders() {
    return await Order.find().sort({ createdAt: -1 });
  }

  async getOrderById(id: string) {
    return await Order.findById(id);
  }
}
