import auth from "../../../middleware/auth";
import Categories from '../../../models/categoriesModel';
import connectDB from "../../../utils/connectDB";
connectDB();

const checkRequest = async (req, res) => {
    switch(req.method) {
        case "PUT": 
            await updateCategory(req,res);
            break;
        case "DELETE": 
            await deleteCategory(req,res);
            break;
    }
}

const updateCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'});       
        const {name} = req.body;
        const {id} = req.query;
        if(!name) return res.status(400).json({err: "Name can not be left blank."})
        
        const updatedCategory = await Categories.findOneAndUpdate({_id: id} , {name})
       
       res.json({msg: "Update category success", category: {
           ...updatedCategory._doc,
           name
       }});
       
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}


const deleteCategory = async (req , res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'});
        const {id} = req.query
        await Categories.findByIdAndDelete({_id: id});
        res.json({msg: "Success! Deleted a category"})
    } catch (err) {
        res.status(500).json({err: err.message})
    }

}
export default checkRequest;