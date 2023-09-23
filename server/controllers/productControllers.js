import Product from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import isValidObjectId from "../utils/validId.js";

export const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
  
      if (!products) {
        throw new Error("no product found")
      }
  
      return res.status(200).json({
        status: 'success',
        products,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  };
  
  export const createProduct = async (req, res) => {
    const { name, brand, category, description, price } = req.body;
    //as of now there is no user
    try {
      if (req.file) {
        cloudinary.uploader.upload(req.file.path, async (err, result) => {
          if (err) {
            throw new Error("couldn't upload image try again later")
          }
  
          const product = new Product({
            name,
            image: result.secure_url,
            brand,
            category,
            description,
            price,
          });
  
          await product.save();
  
          return res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            product,
          });
        });
      } else {
        throw new Error("no image found")
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        status: 'failed',
        message: err.message,
      });
    }
  };
  
export const getProductById = async(req,res)=>{
    
    try{
        const productId = req.params.id;
        const validId = isValidObjectId(productId)
        if(!validId) throw new Error("this is a wrong id format")
        
        const product = await Product.findById(productId);

        if(!product){
            throw new Error("no product with this id");
        }

        return res.status(200).json({
            status: "success",
            product
        })

    }catch(err){
        res.status(404).json({
            error: err.message || "no product found",
            status: "bolo tarararara"
        });
    }
    
}

export const deleteProduct = async(req,res)=>{

    try{

        const productId = req.params.id;
        
        const isvalidId = isValidObjectId(productId);

        if(!isvalidId) throw new Error("invalid Id");

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct) throw new Error("no product found");

        return res.status(200).json({
            status: "success",
            deletedProduct
        })

    }catch(err){
        return res.status(404).json({
            status: "failed",
            error: err.message
        });
    } 
}

export const updateProduct = async(req,res)=>{
    
    try {
        const productId = req.params.id;
        
        const isvalidId = isValidObjectId(productId);

        if(!isvalidId) throw new Error("invalid Id");

        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true});
        
        if(!updatedProduct) throw new Error("no product found");

        return res.status(200).json({
            status: "success",
            updatedProduct
        })
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            error: err.message
        })
    }

}