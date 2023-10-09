import jwt  from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const generateToken = async (res, userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "10d",
    })

    res.cookie("jwt", token,{
        httpOnly: true,
        secure: false,
        sameSite: false,
        maxAge: 10 * 24 * 60 * 60 * 1000, 
    })

}

export default generateToken;
