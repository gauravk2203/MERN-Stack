import Data from '../Data.js';
import jwt from 'jsonwebtoken';

const Login = (req, res) => {
  const { email, password } = req.body;

  const user = Data.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, "your_jwt_secret_key", { expiresIn: "1h" });

  res.json({ token });
};

export default Login;
