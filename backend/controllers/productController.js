import Product from '../models/productModel.js '
import asyncHandler from 'express-async-handler'


//@desc fetch all product 
//@route GET/api/product
//@access public

const getProducts= asyncHandler(async(req,res) =>{

    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword? {
       name:{
        $regex:req.query.keyword,
        $options:'i'
       } 
    }:{}


    const count = await Product.countDocuments({...keyword})


    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))

    res.json({products, page , pages: Math.ceil(count/pageSize)})
})

    //@desc fetch single product 
    //@route GET/api/product/:id
    //@access public
const getProducById= asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)
        
       if(product){
        res.json(product)
       }else{
        res.status(404)
        throw new Error('Product not found')
       }
})



    //@desc delete a  product 
    //@route DELETE/api/product/:id
    //@access private/admin
const deleteProduct= asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)
        
       if(product){
        await product.remove()
        res.json({message:'product Removed'})
       }else{
        res.status(404)
        throw new Error('Product not found')
       }
})



//@desc   create product
//@routes POST api/products
//@access private/admin

const createProduct =  asyncHandler( async (req , res ) => {

    const product= new Product ({
        name         : 'Sample name', 
        description  : 'Sample description ',
        price        : 0,
        user         : req.user._id, 
        image        : "/images/sample.jpeg", 
        brand        : 'sample brand', 
        category     : 'sample category', 
        countInStock : 0, 
        numReviews   : 0
    })
    
    const createdProduct = await product.save()
    res.status(201) 
    res.json(createdProduct)

 }) 



 //@desc   update product
//@routes PUT api/products/:id
//@access private/admin

const updateProduct =  asyncHandler( async (req , res ) => {


    const product= await Product.findById(req.params.id)
    const {name , price , description , image , brand , category , countInStock } = req.body
    
    if(product) 
    {
        product.name           = name || product.name
        product.price          = price  || product.price
        product.description    = description  || product.description
        product.image          = image  || product.image
        product.brand          = brand  || product.brand
        product.category       = category  || product.category
        product.countInStock   = countInStock  || product.countInStock
    

        const  updatedProduct = await product.save()
        res.status(201) 
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error ('Product not found ')
    }


 
 }) 

 //@desc   create new review 
//@routes PUT api/products/:id/reviews
//@access private

const createProductReview =  asyncHandler( async (req , res ) => {

    const product= await Product.findById(req.params.id)
    const {rating , comment } = req.body

    
    if(product) 
    {
        const alreadyReviewed = product.reviews.find(r=>r.user.toString()===req.user._id.toString())
       
        if(alreadyReviewed) {
          
            res.status(400)
             throw new Error ('Product alerady reviewed ')
        }
            const  review =  {
                name : req.user.name ,
                rating :parseInt(rating),
                comment, 
                user :  req.user._id, 
                
            }

            

            product.reviews.push(review)
            product.numReviews = product.reviews.length 
            product.rating  = product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length;
             await product.save()
             res.status(201).json({message:'Review added'}) 
        }else{
        res.status(404)
        throw new Error ('Product not found ')
    }


 
 })   

//@desc   Get top rated product
//@routes GET api/products/top
//@access Public
const getTopProduct =  asyncHandler( async (req , res ) => {
    const products = await Product.find({}).sort({rating :-1}).limit(3)
    console.log(products);
    if(products)
    { 
        res.json(products);
    }
    else
    {
        res.status(404)
        throw new Error ('Product not found')
    }
}) 




export { getProducById,getProducts,deleteProduct,updateProduct,createProduct,createProductReview,getTopProduct}