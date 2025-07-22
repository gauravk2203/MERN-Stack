import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from "../Models/user.model.js";


export const registerProfile = async (req, res) => {
  try {
    const formdata = req.body;

    console.log(formdata)

    if (!formdata || !formdata.name || !formdata.email || !formdata.password || !formdata.address || !formdata.phone_no) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const hashedPassword = await bcrypt.hash(formdata.password, 10);

    const newUser = new User({
      ...formdata,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error while registering user", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    console.log(req)
    const formdata = req.body;
    const id = req.user.id;
    console.log(formdata , id)

    if (!id) {
      return res.status(400).json({ message: "Id required for update" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    user.name = formdata.name || user.name;
    user.email = formdata.email || user.email;
    user.phone_no = formdata.phone_no || user.phone_no;
    user.address = formdata.address || user.address;
    user.image = formdata.image || user.image;

    await user.save();

    res.status(200).json({ message: "Profile updated", user });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};



export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const payload = {
      id: userFound._id,
      email: userFound.email,
      name: userFound.name,
      role: userFound.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // 🔥 FIXED OPTIONS
    const cookieOptions = {
      httpOnly: true, // ✅ Typo fixed from 'httpOmly'
      secure: false, // ✅ Boolean check
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000, // ✅ 1 day
    };

    // ✅ Send cookie and response
    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({ message: "Login Successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(400).json({ message: "Id required for getting user" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ Message: "User found sucessfully", user });
  } catch (error) {
    console.error("error while finding user:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};