import productModel from '../models/productModel.js'
import categoryModel from '../models/categoryModel.js'
import userModel from '../models/userModel.js'
import { PRODUCT_CODES } from '../constantCodes.js'
import { DEFAULT_PHOTO_ICON } from '../constants.js'
import { response } from '../utils.js'

class productController {
    /***********************
     * Create Product *
     **********************/
    static createProduct = async (req, res) => {
        const { product_name, product_code, product_description, product_img, category_codes, no_of_gods, stock } = req.body

        /*** Validation ***/
        //Required Field Validation
        if (!product_name || !product_code || !category_codes) {
            return response(res, "error", PRODUCT_CODES.INVALID_PRODUCT_PARAMS, "Oops! Please Provide all Required Params")
        }

        //Category Validation
        let invalidCategory = []
        for (let index = 0; index < category_codes.length; index++) {
            const category = category_codes[index];
            let isCategoryExists = await categoryModel.findOne({ category_code: category }).lean()
            if (!isCategoryExists)
                invalidCategory.push(category)
        }

        if (invalidCategory.length)
            return response(res, "error", PRODUCT_CODES.INVALID_PRODUCT_PARAMS, `Provide Category ${invalidCategory.join(", ")} Doesn't Exists`, "Category Code Doesn't Exist In The DB")

        //Product Code Validation
        let duplicateProductCode = await productModel.findOne({ product_code }).lean()
        if (duplicateProductCode)
            return response(res, "error", PRODUCT_CODES.INVALID_PRODUCT_PARAMS, "Provided Product Code Already Exists")

        /*** Product Creation ***/
        let productObj = {
            product_name,
            product_code,
            product_description,
            product_img,
            product_category_codes: category_codes,
            no_of_gods,
            stock
        }

        let product = await productModel.create(productObj)

        return product
            ? response(res, "success", PRODUCT_CODES.PRODUCT_API_SUCCESS, "Hurry!! Product Creation Success", "", { product })
            : response(res, "error", PRODUCT_CODES.PRODUCT_API_FAILED, "Oops!! Product Creation Failed", "Error Occured While Inserting The Data")
    }

    /***********************
     * Get Product List *
     **********************/
    static getProductList = async (req, res) => {
        const productList = await productModel.find().lean()
        return response(res, "success", PRODUCT_CODES.PRODUCT_API_SUCCESS, "Hurry!! Product List Fetched", "", { productList })
    }

    /***********************
     * Get Product Details *
     **********************/
    static getProductDetails = async (req, res) => {
        const { productId } = req.params

        //Fetching Product Details
        const productDetails = await productModel.findOne({ _id: productId }).lean()
        return productDetails
            ? response(res, "success", PRODUCT_CODES.PRODUCT_API_SUCCESS, "Hurry!! Product Details Fetched", "", { productDetails })
            : response(res, "error", PRODUCT_CODES.PRODUCT_API_FAILED, "Oops!! Product Details Fetch Failed.", "Seems product_id is Incorrect")
    }

    /***********************
     * Create Review *
     **********************/
    static createProductReview = async (req, res) => {
        const { product_id, user_id, rating, review } = req.body

        //Validation
        if (!product_id || !user_id)
            return response(res, "error", PRODUCT_CODES.PRODUCT_API_FAILED, "Oops!! Missing Required Params. Please Contact Support Team", "Missing product_id or user_id")

        //Checking If User Exists
        const user = await userModel.findOne({ _id: user_id }).lean()
        if (!user)
            return response(res, "error", PRODUCT_CODES.PRODUCT_API_FAILED, "Oops!! Something Went Wrong. Contact Support Team", "User With The Provided user_id Doesn't Exist")

        //Checking If Product Exists
        const product = await productModel.findOne({ _id: product_id })
        if(!product)
            return response(res, "error", PRODUCT_CODES.PRODUCT_API_FAILED, "Oops!! Something Went Wrong. Contact Support Team", "Provided product_id Doesn't Exist")

        //Check If User Already Added Review, If So Then Update The Review Else Add The Review
        const userReviewIndex = product.reviews.findIndex(review => review.user_id == user_id)
        if(userReviewIndex != -1){
            product.reviews[userReviewIndex].rating = 4
            product.reviews[userReviewIndex].review = 'modified hiren123' 
        }else{
            let reviewObj = {
                user_id,
                rating,
                review
            }
            product.reviews.push(reviewObj)
        }

        const updatedProduct = await product.save()
        return updatedProduct
            ? response(res, "success", PRODUCT_CODES.PRODUCT_API_SUCCESS, "Hurry!! Review Added Successfully", "", { updatedProduct })
            : response(res, "error", PRODUCT_CODES.PRODUCT_API_FAILED, "Oops!! Failed To Add Review. Please Contact Support Team", "Seems product_id is Incorrect")
    }
}

export default productController