import auth from "../../../middleware/auth";
import Categories from '../../../models/categoriesModel';
import connectDB from "../../../utils/connectDB";
connectDB();

const checkRequest = async (req, res) => {
    switch(req.method) {
        case "POST": 
            await createCategories(req,res);
            break;
        case "GET": 
            await getCategories(req,res);
            break;
    }
}

const createCategories = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'});       
        const {name} = req.body;
        if(!name) return res.status(400).json({err: "Name can not be left blank."})
        const newCategories = await Categories({name});
       
        await newCategories.save()
       
  
       res.json({msg: "Create new category success", newCategory: newCategories});
       
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}


const getCategories = async (req , res) => {
    try {
        const categories = await Categories.find()
        res.json({categories})
    } catch (err) {
        res.status(500).json({err: err.message})
    }

}
export default checkRequest;