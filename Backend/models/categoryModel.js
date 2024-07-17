import mongoose from 'mongoose'
import { DEFAULT_CATEGORY_ICON } from '../constants.js'

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    category_code: {
        type: String,
        required: true,
        unique: true
    },
    category_description: {
        type: String,
        default: ""
    },
    category_icon: {
        type: String,
        default: DEFAULT_CATEGORY_ICON
    },
    alias: [String]
}, 
{ 
    timestamps: true 
})

const categoryModel = mongoose.model('Categories', categorySchema)

export default categoryModel