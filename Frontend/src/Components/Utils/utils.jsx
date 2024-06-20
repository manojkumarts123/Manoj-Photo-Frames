import emailValidator from 'email-validator'
import { isValidPhoneNumber } from 'libphonenumber-js/mobile'

/**
 * Name Validation
 * @param {string} name 
 * @returns {boolean|string[]} If Error Present -> returns the error, else true -> indicating no errors  
 */
const isValidName = name => { 
    console.log("isVlidname", name);
    // Length Check - Atleast 3 Character
    if(name.length < 3) {
        return "Name Should Atleast Contain 3 Letters"
    }

    // First Character Check - 1st Char Should Be Alphabet
    if(!/[a-zA-Z]/.test(name.charAt(0))){
        return "First Letter Of Name Should Be Alphabet"
    }
    return true
}

/**
 * Email Validation -If Errors Present
 * @param {string} email 
 * @returns {boolean|string[]} If Error Present -> returns the error, else true -> indicating no errors
 */
const isValidEmail = email => {
    if(!emailValidator.validate(email)){
        return "Email is Invalid"
    }
    return true
}

/**
 * Phone No Validation  
 * @param {bigint} phoneNo 
 * @returns {boolean|string[]} If Error Present -> returns the Error, else true -> indicating no errors
 */
const isValidPhoneNo = phoneNo => {
    if(!isValidPhoneNumber(phoneNo, "IN")){
        return "Phone No is Invalid"
    }
    return true
}

/**
 * Password Validation 
 * @param {string} password 
 * @returns {boolean|string[]} If Errors Present -> returns Error List, else false -> indicating no errors
 */
const isValidPassword = password => {
    // Atleast 1 Capital Letter
    if(!/[A-Z]/.test(password)){
        return "Password Should Contain Atleast 1 Capital Letter"
    }

    // Atleast 1 Small Letter
    if(!/[a-z]/.test(password)){
        return "Password Should Contain Atleast 1 Small Letter"
    }

    // Atleast 1 digit
    if(!/[0-9]/.test(password)){
        return "Password Should Contain Atleast 1 Digit Letter"
    }

    // Atleast 1 Special Character
    if(!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)){
        return "Password Should Contain Atleast 1 Special Letter"
    }

    return true
}

/**
 * Converts the data Array to List 
 * @param {[string]} data 
 */
const displayAsList = data => {
    return (
        <ul className='list-[circle] pl-3'>
            {data.map((ele,index) => <li key={index}>{ele}</li>)}
        </ul>
    )
}

export {
    isValidName,
    isValidEmail,
    isValidPhoneNo,
    isValidPassword,
    displayAsList
}