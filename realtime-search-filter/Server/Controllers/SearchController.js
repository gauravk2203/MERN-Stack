import { Product } from '../Models/Product_model.js'

export const Serach = async(req , res) => {
    try {

    const search = req.query.text;

    if(!search || search.trim().length === 0){
        return res.status(400).json({Message : "Invalid request from user"})
    }

    const result = await Product.find({
        productName : {
            $regex : search , $options: 'i',
        }
    })
    
    if(result.length === 0){
        return res.status(404).json({Message : "object not found in database"})
    }

    res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({Message : "something went wrong"})
    }

}