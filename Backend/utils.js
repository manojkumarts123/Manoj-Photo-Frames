import { validate } from 'deep-email-validator'
import { isValidPhoneNumber } from 'libphonenumber-js/mobile'
import { RESPONSE_CODES } from './constants.js'

/**
 * Rest API Response Format
 * @param {Object} res 
 * @param {string} type 2 types - error, success
 * @param {number} code Response Code
 * @param {any} clientInfo Client error or success message
 * @param {any} [devInfo=""] If provided, response will have extra info which aids in developer in bugging 
 * @param  {...Object} [params] should be objects containing additional info to be added in the response
 * @returns Response for the calling API
 */
const response = (res, type, code, clientInfo, devInfo = "", ...params) => {
    let resObj = {}
    resObj.code = code
    resObj.message = clientInfo
    
    if(devInfo){
        resObj.devInfo = devInfo
    }

    if(params.length){
        params.forEach(param => {
            resObj = { ...resObj, ...param }
        })
    }

    return (type == "error") ? res.status(RESPONSE_CODES.ERROR_STATUS_CODE).json(resObj) : res.status(RESPONSE_CODES.SUCCESS_STATUS_CODE).json(resObj)
}

/**
 * try catch Wrapper to avoid writing try/catch for every function
 * @param {function} func 
 * @returns wrapped function
 */
const tryCatchWrapper = func => (req, res, next) => 
    Promise.resolve(func(req, res, next)).catch(next)

/**
 * Name Validation
 * @param {string} name 
 * @returns {boolean|string[]} If Errors Present -> returns Error List, else false -> indicating no errors  
 */
const validateName = name => { 
    let message = []

    // Length Check - Atleast 3 Character
    if(name.length < 3) {
        message.push("Name Should Atleast Contain 3 Letters")
    }

    // First Character Check - 1st Char Should Be Alphabet
    if(!/[a-zA-Z]/.test(name.charAt(0))){
        message.push("First Letter Of Name Should Be Alphabet")
    }
    
    return message.length && message
}

/**
 * Email Validation -If Errors Present
 * @param {string} email 
 * @returns {boolean|string[]} If Errors Present -> returns Error List, else false -> indicating no errors
 */
const validateEmail = async email => { 
    let message = []
    const validationResult = await validate(email)
    
    if(!validationResult.valid){
        message.push(`Oops!! Invalid Email Address: ${validationResult.reason} => ${validationResult.validators[`${validationResult.reason}`].reason} `);
    }
    
    return message.length && message
}

/**
 * Phone No Validation  
 * @param {*} phoneNo 
 * @returns {boolean|string[]} If Errors Present -> returns Error List, else false -> indicating no errors
 */
const validatePhoneNo = phoneNo => { 
    let message = []

    if(!isValidPhoneNumber(phoneNo, "IN")){
        message.push("Phone No Is Invalid")
    }

    return message.length && message
}

/**
 * Password Validation 
 * @param {string} password 
 * @returns {boolean|string[]} If Errors Present -> returns Error List, else false -> indicating no errors
 */
const validatePassword = password => { 
    let message = []

    // Atleast 1 Capital Letter
    if(!/[A-Z]/.test(password)){
        message.push("Password Should Contain Atleast 1 Capital Letter")
    }

    // Atleast 1 Small Letter
    if(!/[a-z]/.test(password)){
        message.push("Password Should Contain Atleast 1 Small Letter")
    }

    // Atleast 1 digit
    if(!/[0-9]/.test(password)){
        message.push("Password Should Contain Atleast 1 Digit Letter")
    }

    // Atleast 1 Special Character
    if(!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)){
        message.push("Password Should Contain Atleast 1 Special Letter")
    }

    return message.length && message
}

export {
    response,
    tryCatchWrapper,
    validateName,
    validateEmail,
    validatePhoneNo,
    validatePassword
}