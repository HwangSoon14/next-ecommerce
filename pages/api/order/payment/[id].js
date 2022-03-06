import auth from "../../../../middleware/auth"
import connectDB from "../../../../utils/connectDB"
import Orders from '../../../../models/orderModel'
connectDB();

const checkRequest = async (req, res) => {
    switch(req.method) {
        case "PATCH": 
            await patchOrder(req,res);
            break;
    }
}

const patchOrder = async (req, res) => {
    try {
        const result = await auth(req,res);
        const {id} = req.query;
        const {paymentId} = req.body;
        await Orders.findOneAndUpdate({_id: id}, {
            paymentId,
            paid: true,
            dateOfPayment: new Date().toISOString(),
            method: "Paypal",
        })
        res.json({msg: "Payment success"});
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}


export default checkRequest;