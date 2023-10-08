import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (!token) {
    // No token present, so the user is not authenticated
    return res.status(400).json({
        error: "not authorized please login",
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    return res.status(400).json({
      error: "not authorized"
  })
  }
};

export const admin = (req,res,next)=>{

  if(req.user && req.user.isAdmin){
    next()
  }else{
    return res.status(401).json({
      error: "you can't access this page/ only for admins"
    }) 
  }

}