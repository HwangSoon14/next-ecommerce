import connectDB from "../../../utils/connectDB";
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'
connectDB();

const checkRequest = async (req, res) => {
    switch(req.method) {
        case "GET": 
            await getProduct(req,res);
            break;
        case "PUT": 
        await updateProduct(req,res);
            break;
        case "DELETE": 
        await deleteProduct(req,res);
            break;
    }
}

const getProduct = async(req, res) => {
    try {
        const {id} = req.query;
        
        const product = await Products.findById(id);
        if(!product) res.status(400).json({err: "This product doesn't exist"})

        res.json({product});
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
const updateProduct = async(req, res) => {
    try {
        const result = await auth(req, res);
        if(result.role !== "admin") return res.status(400).json({err: "Invalid Authentication"})
        const {id} = req.query;
        const {title, price, inStock, description, content, category, images} = req.body;

        await Products.findOneAndUpdate({_id: id} , {
            name: title.toLowerCase(), price, inStock, description, content, category, images
        })
        res.json({msg: 'Update product success'});
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
const deleteProduct = async(req, res) => {
    try {
        const result = await auth(req, res);
        if(result.role !== "admin") return res.status(400).json({err: "Invalid Authentication"})
        const {id} = req.query;
      

        await Products.findOneAndDelete({_id: id});
        res.json({msg: 'Delete product success'});
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}


export default checkRequest;