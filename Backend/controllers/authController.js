import userModel from "../models/userModel.js"
import { PORTAL_CODES } from "../constantCodes.js"
import { ROLES } from '../constants.js'
import { response, validateName, validateEmail, validatePhoneNo, validatePassword } from '../utils.js'
import bcrypt from 'bcrypt'

export default class authController {
    /***********************
	 * User Login *
	 **********************/
    static userLogin = async (req, res, next) => {
        // Validation
        if (!req.body.user || !req.body.password) {
            return response(res, "error", PORTAL_CODES.INVALID_LOGIN_PARAMS, "Oops! Required Login Input Missing")
        }

        const { user, password }  = req.body
        let isEmail = isNaN(user)

        // Fetch User Data
        let hashedPassword, userData
        try {
            let searchObj = isEmail ? { email: user } : { phone_number: parseInt(user) };
            userData = await userModel.findOne(searchObj).lean()
        } catch (error) {
            return response(res, "error", PORTAL_CODES.LOGIN_FAILED, "Oops!! Something Went Wrong", `Error Occured While Fetching User Data: ${error.message}`)
        }
        
        // Check Password
        if(userData){
            ({ password: hashedPassword, ...userData} = userData)
            const match = await bcrypt.compare(password, hashedPassword);

            if(match){
                return response(res, "success", PORTAL_CODES.LOGIN_SUCCESS, "Hurry!! Login Success", "", { userData: { ...userData } })
            }else{
                return response(res, "error", PORTAL_CODES.LOGIN_FAILED, "Oops!! Password is Incorrect")
            }
        }
        return response(res, "error", PORTAL_CODES.LOGIN_FAILED, `Oops!! User With The ${ isEmail ? `Email`: `Phone No` } Provided Not Found`)
    }

    /***********************
	 * User Signup - Only Customers Are Allowed *
	 **********************/
    static userSignup = async (req, res) => {
        const { name, email, phone_number, address, gender, password, role } = req.body
        
        // Validation
        if (!name || !email || !phone_number || !gender || !password) {
            return response(res, "error", PORTAL_CODES.INVALID_SIGNUP_PARAMS, "Oops! Required Signup Input Missing")
        } else {
            let message = []

            // Name Validation
            let nameErrors = validateName(name)
            message = nameErrors ? message.concat(nameErrors) : message

            // Email Validation
            let emailErrors = await validateEmail(email)
            message = emailErrors ? message.concat(emailErrors) : message

            // Phone Validation
            let phoneNoErrors = validatePhoneNo(phone_number)
            message = phoneNoErrors ? message.concat(phoneNoErrors) : message

            // Password Validation
            let passwordErrors = validatePassword(password)
            message = passwordErrors ? message.concat(passwordErrors) : message
            
            if(message.length){
                return response(res, "error", PORTAL_CODES.INVALID_SIGNUP_PARAMS, message)
            }
        }

        // Check If User Already Exists With The Data Provided
        let duplicateUser = await userModel.findOne().or([{ email }, { phone_number }])
        if(duplicateUser){
            return response(res, "error", PORTAL_CODES.INVALID_SIGNUP_PARAMS, "User With Provided Email/Phone No Already Exists")
        }
        
        // Hash the password
        let hashedPassword
        let salt = await bcrypt.genSalt(10);
        if(salt){
            hashedPassword = await bcrypt.hash(password, salt);
            if(!hashedPassword){
                return response(res, "error", PORTAL_CODES.HASH_ERROR, "Oops!! Something Went Wrong. Please Contact Admin", "Error Occurred While Hashing Password")
            }
        }else{
            return response(res, "error", PORTAL_CODES.HASH_ERROR, "Oops!! Something Went Wrong. Please Contact Admin", "Error Occurred While Generating Salt")
        }

        // Create User in MongoDB
        let userObj = {
            name,
            email,
            phone_number,
            address: address ? address : [],
            gender,
            password: hashedPassword,
            role: role ? role : ROLES.CUSTOMER
        }
        
        try{
            let user = await userModel.create(userObj)
            let {password, ...userData} = user._doc
            return user
                ? response(res, "success", PORTAL_CODES.SIGNUP_SUCCESS, "Hurry!! User Registration Success", "", { userData })
                : response(res, "error", PORTAL_CODES.SIGNUP_FAILED, "Oops!! User Registration Failed", "Error Occured While Inserting The Data")
        }catch(err){
            return response(res, "error", PORTAL_CODES.SIGNUP_FAILED, "Oops!! User Registration Failed", `Error Occured While Inserting The Data: ${err.message}`)
        }
    }
}