import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const validation = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.your_jwt_secret_key);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default validation;
