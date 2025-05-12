import Order from '../models/Order.js';
import Customer from '../models/Customer.js';

export const createOrder = async (req, res) => {
  try {
    const { customerId, amount, orderDate } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    const order = new Order({ customerId, amount, orderDate });
    await order.save();

    customer.totalSpend += amount;
    customer.lastActive = orderDate;
    customer.visits += 1;
    await customer.save();

    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
