import Customer from '../models/Customer.js';

export const createCustomer = async (req, res) => {
  try {
    const { name, email, totalSpend, visits, lastActive } = req.body;

    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Customer already exists' });

    const customer = new Customer({ name, email, totalSpend, visits, lastActive });
    await customer.save();
    res.status(201).json({ message: 'Customer created', customer });
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};
