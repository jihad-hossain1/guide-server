const jwt = require('jsonwebtoken');
const Client = require('../models/Client');


const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, 'your-secret-key');
    const client = await Client.findById(decoded.id);

    if (!client) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.client = client;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};


module.exports = {
  authenticate,
};