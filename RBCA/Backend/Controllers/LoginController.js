import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../Models/User.model.js';

dotenv.config();

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email, password });

    if (!userFound) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const payload = {
      id: userFound._id,
      email: userFound.email,
      role: userFound.role
    };

    const token = jwt.sign(payload, process.env.your_jwt_secret_key, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const Register = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already registered with this email." });
        }

        const user = new User({
            email: email,
            password: password,
        })

        await user.save()
        return res.status(201).json({ message: "Registered successfully." });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server error." });
    }

}


