import jwt from "jsonwebtoken";

export const Validation = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token required" });
    }

    const validatedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = validatedToken; 

    next();
  } catch (error) {
    console.error("Token validation error:", error.message);
    res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};
