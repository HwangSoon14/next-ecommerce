import auth from "../../../middleware/auth";
import connectDB from "../../../utils/connectDB";
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt'
connectDB();

const checkRequest = async (req, res) => {
    switch(req.method) {
        case "PATCH": 
            await changePassword(req,res);
            break;
    }
}
const changePassword = async (req, res) => {
    try {
        const result = await auth(req, res);
        const { id } = result;
        const { password } = req.body;
        const passwordHash = await bcrypt.hash(password , 12);
        await Users.findOneAndUpdate({_id: id} , {
            password: passwordHash,
        })
        res.json({msg: "Update password success !"})
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}
export default checkRequest;