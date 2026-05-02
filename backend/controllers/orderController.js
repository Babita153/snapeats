import Order from "../models/Order.js";

// PLACE ORDER
export const placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    const order = await Order.create({
      userId: req.user.uid,
      items,
      total,
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error placing order" });
  }
};

// GET USER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.uid,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};