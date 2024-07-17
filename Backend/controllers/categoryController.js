import categoryModel from '../models/categoryModel.js'
import { CATEGORY_CODES } from "../constantCodes.js"
import { response } from '../utils.js'

class categoryController{
    /***********************
	 * Create Category *
	 **********************/
    static createCategory = async (req, res) => {
        const { category_name, category_code, category_description, category_icon, alias } = req.body
        
        /*** Validation ***/
        //Required Field Validation
        if(!category_name)
            return response(res, "error", CATEGORY_CODES.INVALID_CATEGORY_PARAMS, "Oops! Category Name Required")

        if(!category_code)
            return response(res, "error", CATEGORY_CODES.INVALID_CATEGORY_PARAMS, "Oops! Category Code Is Required")

        //Category Validation - Category Should Be Unique
        let duplicateCategoryCode = await categoryModel.findOne({ category_code }).lean()
        if(duplicateCategoryCode)
            return response(res, "error", CATEGORY_CODES.INVALID_CATEGORY_PARAMS, "Provided Category Code Already Exists")

        /*** Create Category ***/
        const createObj = {
            category_name,
            category_code,
            category_description,
            category_icon,
            alias
        }

        let category = await categoryModel.create(createObj)
        return category
            ? response(res, "success", CATEGORY_CODES.CATEGORY_API_SUCCESS, "Hurry!! Category Creation Success", "", { category })
            : response(res, "error", CATEGORY_CODES.CATEGORY_API_FAILED, "Oops!! Category Creation Failed", "Error Occured While Inserting The Data")
    }

    /***********************
	 * Create Category *
	 **********************/
    static getAllCategories = async (req, res) => {
        let categories = await categoryModel.find().sort({ createdAt: -1 }).lean()
        return categories 
            ? response(res, "success", CATEGORY_CODES.CATEGORY_API_SUCCESS, "Hurry!! All Category Fetched", "", { categories })
            : response(res, "error", CATEGORY_CODES.CATEGORY_API_FAILED, "Oops!! Category Fetch Failed")
    }
}

export default categoryController