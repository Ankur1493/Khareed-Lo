import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    // No token present, so the user is not authenticated
    return res.status(400).json({
        error: "not authorized please login"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    console.error(err);
    res.status(401);
    return next(new Error("not authorized"));
  }
};
