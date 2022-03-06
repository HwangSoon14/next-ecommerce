import auth from "../../../middleware/auth";
import connectDB from "../../../utils/connectDB";
import Users from '../../../models/userModel';
connectDB();

const checkRequest = async (req, res) => {
    switch(req.method) {
        case "PATCH": 
            await uploadInfo(req,res);
            break;
        case "GET":
            await getUsers(req, res)
            break;
    }
}
const uploadInfo = async (req, res) => {
    try {
        const result = await auth(req, res);
        const { id } = result;
        const {avatar} = req.body;
        const newUser = await Users.findOneAndUpdate({_id: id}, {avatar})
        
        res.json({
            msg: "Update Success!",
            user: {
                name: newUser.name,
                avatar,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}

const getUsers = async (req, res) => {
    try {
        const result = await auth(req, res);
        if(result.role !== "admin") return res.status(400).json({err: "Authentication is not valid"})

        const users = await Users.find().select("-password")
        res.json({users})
        
     } catch (err) {
         return res.status(500).json({err: err.message})
     }
}
export default checkRequest;