import connectDB from "../../../utils/connectDB";
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt';

connectDB();

const checkRequest = async (req, res) => {
    switch(req.method) {
        case "POST": 
            await register(req,res);
            break;
    }
}

const register = async(req, res) => {
    try {
        const { email , name , password , cf_password} = req.body;

        const user = await Users.findOne({email})
        if(user) return res.status(400).json({err: "This account already exists"})
        const passwordHash = await bcrypt.hash(password,12);
        const newUser = new Users({
            name, email, password: passwordHash , cf_password
        })
         await newUser.save();
         res.json({msg: "Register Successfully"})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

export default checkRequest;