import jwt  from "jsonwebtoken";

const generateToken = async (res, userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "10d",
    })

    res.cookie("jwt", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development" ,
        sameSite: true,
        maxAge: 10 * 24 * 60 * 60 * 1000, 
    })
}

export default generateToken;