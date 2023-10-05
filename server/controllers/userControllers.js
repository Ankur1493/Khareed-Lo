import generateToken from "../middlewares/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";


export const createNewUser = async(req,res)=>{

    const {name, email, password} = req.body;


    try{
        if(!name || !email || !password){
            throw new Error("add all fields properly");
        }

        const userExist = await User.findOne({email});

        if(userExist){
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if(user){
            generateToken(res,user._id)
            return res.status(200).json({
                status: "success",
                name: user.name,
                email: user.email
            })
        }else{
            throw new Error("Invalid user data")
        }
    }catch(err){
        res.status(400).json({
            status: "failed",
            err: err.message || "an error occured" ,
        })
    }

}

export const userLogin = async(req,res)=>{

    const {email,password} = req.body;

    try{
        if(!email || !password){
            throw new Error("enter all fields properly");
        }

        const userExists = await User.findOne({email});

        if(!userExists){
            throw new Error("user doesn't exist");
        }

        const credentialStatus = await bcrypt.compare(password,userExists.password);

        if(credentialStatus){
            generateToken(res,userExists._id);

            return res.status(200).json({
                status: "success",
                name: userExists.name,
                email: userExists.email
            })
        }else{
            throw new Error("invalid credentials");
        }
    }catch(err){
        return res.status(400).json({
            status: "failed",
            err: err.message
        })
    }

}

export const userLogout = async(req,res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: 'Logged out successfully' });
}

export const getAllUser = async(req,res)=>{

    try{

        const users = await User.findById({});
        
        if(users){
            return res.status(200).json({
                status: "success",
                users
            })
        }else{
            throw new Error("No Users are Active")
        }
    }catch(err){
        return res.status(400).json({
            status: "failed",
            err
        })
    }

}

export const getUserProfile = async(req,res)=>{

    try{
        const userId = req.user._id;
        const userProfile = await User.findById(userId).select("-password");

        if(!userProfile){
            throw new Error("No user found incorrect id")
        }
        return res.status(200).json({
            name: userProfile.name,
            email: userProfile.email,
            isAdmin: userProfile.isAdmin,
        })
    }catch(err){
        return res.status(400).json({
            err: err.message
        })
    }

}
export const updateUserProfile = async(req,res)=>{

    const{name,email,password} = req.body;

    try{
        const userId = req.user._id;

        const user = await User.findById(userId);        

        if(!user) throw new Error("user not found");

        user.name = name || user.name;
        user.email = email || user.email;

        if(password){
            user.password = password;
        }

        const updatedUser = await user.save();
    
        return res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }catch(err){
        return res.status(400).json({
            err: err.message
        })
    }
}