import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password || !username) {
      return res.status(422).json({ message: "Fill Complete Details" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(422).json({ error: "Email Already exists" });
    const encPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({
      username,
      email,
      password: encPassword,
    });
    const token = jwt.sign(
      { id: userData._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    userData.token = token;
    userData.password = undefined;
    return res.status(200).json({ message: "SignUp Successful", userData });
  } catch (error) {
    console.log("Error during signup:", error);
  }
};
// The routes are not being protected for now.I am storing the cookies as http cookies
// but for simplicity purposes accessing them in local storage. Ideally
// they should be fetched and authenticated from http cookies.
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      user.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res
        .status(200)
        .cookie("token", token, options)
        .json({ success: true, user });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.clearCookie("token");

      return res.status(200).json({ message: "Logout successful" });
    } else {
      return res.status(401).json({ message: "User not authenticated" });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
