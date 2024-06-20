//Base URL
const BASE_URL = `${window.location.protocol}//${window.location.host}`

//Response Codes
const RESPONSE_CODES = {
    LOGIN_SUCCESS: 10003,
    SIGNUP_SUCCESS: 10005
}

//Roles
const ROLES = {
    SUPER_ADMIN:  "Super Admin",
    ADMIN:  "Admin",
    CUSTOMER:  "Customer"
}

//Form Constants
const GENDER_OPTIONS = ['Male', 'Female', 'Others']

export {
    BASE_URL,
    RESPONSE_CODES,
    ROLES,
    GENDER_OPTIONS
}