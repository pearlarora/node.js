import OrderRepository from "./order.repository.js";

export default class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async placeOrder(req, res) {
    const userId = req.userId;
    try {
      await this.orderRepository.createOrder(userId);
      res.status(201).send("Order is created");
    } catch (error) {
      console.log(error);
    }
  }
}
