const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using JWT secret (process.env.JWT_SECRET should be set in your .env file)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user info to the request object (excluding the password)
      req.user = await User.findById(decoded.id).select('-password'); // Ensure password is not included

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle any errors related to token verification
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is provided in the Authorization header
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
