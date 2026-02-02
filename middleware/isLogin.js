import jwt from "jsonwebtoken";
import User from "../Models/userModels.js";

const isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res.status(401).send({
        success: false,
        message: "Unauthorized: No token provided",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).send({
        success: false,
        message: "Unauthorized: Invalid token",
      });

    const user = await User.findById(decoded.UserId).select("-password");


    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized: User not found",
      });

    req.user = user;

    next();
  } catch (error) {
    console.log(`error in isLogin middleware ${error.message}`);
    res.status(500).send({ success: false, message: error.message });
  }
};

export default isLogin; 
