import auth from "../../../middleware/auth";
import connectDB from "../../../utils/connectDB";
import Orders from '../../../models/orderModel'
import Products from '../../../models/productModel'
connectDB();

const checkRequest = async (req, res) => {
    switch(req.method) {
        case "POST": 
            await createOrder(req,res);
            break;
        case "GET": 
            await getOrders(req,res);
            break;
    }
}

const createOrder = async (req, res) => {
    try {
        const result = await auth(req, res)
       const {id} = result;
       const {address , total , mobile , cart} = req.body;

       
       const newOrder = new Orders({
           user: id,address , total , mobile , cart
        })
        
        cart.filter(x => {
            return sold(x.product._id , x.quantity , x.product.inStock , x.product.sold);
        })
       await newOrder.save();
       res.json({msg: "Payment success! We will contact you to confirm the order.", order: newOrder});
       
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const sold = async (id , quantity , oldInStock , oldSold) => {
    await Products.findOneAndUpdate({_id: id}, {
        inStock: oldInStock - quantity,
        sold: oldSold + quantity
    })
}

const getOrders = async (req , res) => {
    try {
        const result = await auth(req, res);
        const {id , role , root} = result;
        let orders;
        if(role !== "admin") {
            orders = await Orders.find({user: id}).populate("user" , "-password");
        }else {
            orders = await Orders.find().populate("user" , "-password");
        }
        res.json({orders});
    } catch (err) {
        res.status(500).json({err: err.message})
    }

}
export default checkRequest;