import  express  from "express";
const router = express.Router();
import {getProducById,getProducts,deleteProduct,updateProduct, createProduct, createProductReview,getTopProduct} from '../controllers/productController.js'
import {protect , admin} from '../middleware/authmiddleware.js'

router.route('/top').get(getTopProduct)
router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id').get(getProducById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct,createProductReview)
router.route('/:id/reviews').post(protect,createProductReview)

export default router
