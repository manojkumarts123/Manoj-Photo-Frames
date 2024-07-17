import mongoose, { Mongoose } from 'mongoose'
import { DEFAULT_PHOTO_ICON } from '../constants.js'

const reviewSchema = mongoose.Schema({
    user_id: String,
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        default: ''
    }
})

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_code: {
        type: String,
        required: true,
        unique: true
    },
    product_description: {
        type: String,
        default: ""
    },
    product_img: {
        type: String,
        default: DEFAULT_PHOTO_ICON
    },
    product_category_codes: {
        type: [String],
        required: true
    },
    no_of_gods: {
        type: Number,
        default: 1
    },
    stock: {
        type: Number,
        default: 0
    },
    reviews : [reviewSchema]
}, 
{ 
    timestamps: true 
})

const productModel = mongoose.model('Products', productSchema)

export default productModel