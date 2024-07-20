const db = require("../models/db");

exports.createOrder = async (req, res) => {
    const { userId, status } = req.body;
    try {
      const order = await db.order.create({
        data: {
          userId,
          status,
        },
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
