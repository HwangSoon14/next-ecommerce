import auth from "../../../middleware/auth";
import connectDB from "../../../utils/connectDB";
import Users from '../../../models/userModel';
connectDB();

const checkRequest = async (req, res) => {
    switch(req.method) {
        case "PATCH": 
            await editUser(req,res);
            break;
        case "DELETE":
            await deleteUser(req, res)
            break;
    }
}
const editUser = async (req, res) => {
    try {
        const result = await auth(req,res);
        if(result.role !== 'admin' || !result.root)  return res.status(400).json({err: "Authentication is not valid"})
        const {role} = req.body;
        console.log(role);
        const {id} = req.query;
        await Users.findOneAndUpdate({_id: id}, {
            role
        })
        res.json({msg: 'Update Success!'})
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await auth(req, res);
        if(result.role !== 'admin' || !result.root)  return res.status(400).json({err: "Authentication is not valid"})
        const {id} = req.query;
        await Users.findOneAndDelete({_id: id});
        res.json({msg: "Delete success"})
    } catch (err) {
         return res.status(500).json({err: err.message})
     }
}
export default checkRequest;