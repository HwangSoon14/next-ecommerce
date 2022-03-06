import connectDB from "../../../utils/connectDB";
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

class APIfeatures {
    constructor(query , queryString) {
        this.query = query; // Product.find();
        this.queryString = queryString; // {req.query}
    }

    filtering(){
        const queryObj = {...this.queryString};

        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(x => delete(queryObj[x]));

        if(queryObj.category !== 'all') this.query.find({category: queryObj.category});
        if(queryObj.name !== 'all') this.query.find({name: {$regex: queryObj.name}});
        this.query.find();
        return this;
    }
    sorting(){
        if(this.queryString.sort){
                const sortBy = this.queryString.sort.split(',').join('')
                this.query = this.query.sort(sortBy)
            }else{
            this.query = this.query.sort('-createdAt')  
        }

        return this;
    }

    paginating(){
        const limit = this.queryString.limit * 1 || 6;
        const page = this.queryString.page * 1 || 1;
        const skip = limit * (page - 1);
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }

}



connectDB();

const checkRequest = async (req, res) => {
    switch(req.method) {
        case "GET": 
            await getProducts(req,res);
            break;
        case "POST": 
            await createProduct(req,res);
            break;
    }
}



const getProducts = async(req, res) => {
    try {
        const features = new APIfeatures(Products.find() , req.query).filtering().sorting().paginating();

        const result = await Products.find().countDocuments();

        const products = await features.query;
        res.json({
            status: "success",
            totalCount: result,
            products
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
const createProduct = async(req, res) => {
    try {
        const result = await auth(req, res);
        if(result.role !== "admin") return res.status(400).json({err: "Invalid Authentication"})

        const {title, price, inStock, description, content, category, images} = req.body;

        const newProduct = new Products({
            name: title.toLowerCase(), price, inStock, description, content, category, images
        })
        await newProduct.save();
        res.json({msg: 'Create a new product success'});
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

export default checkRequest;