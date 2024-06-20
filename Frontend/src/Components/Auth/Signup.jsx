import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'simplebar'
import 'simplebar/dist/simplebar.css'
import ResizeObserver from 'resize-observer-polyfill'
window.ResizeObserver = ResizeObserver

import FormField from '../Utils/Components/FormField'
import ErrorDialog from '../Utils/Components/ErrorDialog'
import { isValidName, isValidEmail, isValidPhoneNo, isValidPassword, displayAsList } from '../Utils/utils'
import { GENDER_OPTIONS, RESPONSE_CODES, ROLES } from '../../constants.js'
import Loading from '../Utils/Components/Loading.jsx'

const initAddressObj = {
    door_no: '',
    street: '',
    area: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    land_mark: ''
}

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [address, setAddress] = useState(initAddressObj)

    const [serverErrors, setServerError] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phoneNoError, setPhoneNoError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    console.log("address obj", name, email, phoneNo, gender, password, confirmPassword, address);

    let isConfirmPasswordInitial = useRef(true)

    useEffect(() => {
        console.log("isInitialLoad",isConfirmPasswordInitial);
        //Confirm Password Validation
        if(!confirmPassword){
            !isConfirmPasswordInitial.current && setConfirmPasswordError('This Field is Required')
        }else{
            if(confirmPassword !== password){
                setConfirmPasswordError('Confirm Password Should Be Equal to Password')
            }else{
                setConfirmPasswordError('')
            }
            // Set To false if Confirm Password has value once
            isConfirmPasswordInitial.current = false
        }
    }, [password, confirmPassword])

    const requiredCheck = !name.length || !email.length || !phoneNo.length || !gender.length || !password.length || !confirmPassword
    const errorCheck = nameError || emailError || phoneNoError || genderError || passwordError || confirmPasswordError

    const signupSubmit = async () => {
        console.log(' Signup Submit ');
        try {
            setIsLoading(true)
            setServerError('')
            const signupData = await axios.post('http://localhost:5000/user/signup', {
                name,
                email,
                phoneNo,
                gender,
                password,
                address,
                role: ROLES.CUSTOMER
            })
            setIsLoading(false)

            if (signupData.data.code == RESPONSE_CODES.SIGNUP_SUCCESS) {
                navigate('../../api/v1/customer/dashboard')
            } else {
                throw new Error("Oops!!Something Went Wrong")
            }
        } catch (error) {
            setIsLoading(false)
            console.log("Signup Error", error);
            if (error.response) {
                const res = error.response.data
                setServerError(Array.isArray(res.message) ? displayAsList(res.message) : res.message)
            } else {
                setServerError("Oops!!Something Went Wrong")
            }
        }
    }

    return (
        <div className='h-full container flex items-center justify-center p-4'>
            {/* h-[525px] - added extra comparing to login */}
            <div id='signup-container' className='flex flex-col bg-red-50 border-2 border-solid border-red-300 rounded shadow-container h-[525px] max-h-[525px] w-full min-w-44 max-w-[396px] p-6'>
                <h2 className='font-noto-serif font-bold text-red-900 text-heading text-center mb-6'>Signup</h2>

                {serverErrors && <ErrorDialog errorInfo={serverErrors} />}
                <form 
                    className='h-full flex-1 overflow-auto font-roboto'
                    onSubmit={event => {
                        event.preventDefault()
                        signupSubmit()
                    }}
                    data-simplebar
                >
                    <FormField type='text' name='name' displayName='Name' value={name} setState={setName} required={true} validator={isValidName} error={nameError} setError={setNameError}/>
                    <FormField type='text' name='email' displayName='Email' value={email} setState={setEmail} required={true} validator={isValidEmail} error={emailError} setError={setEmailError}/>
                    <FormField type='text' name='phone_no' displayName='Phone Number' value={phoneNo} setState={setPhoneNo} required={true} validator={isValidPhoneNo} error={phoneNoError} setError={setPhoneNoError}/>
                    <FormField type='radio' name='gender' displayName='Gender' value={gender} setState={setGender} options={GENDER_OPTIONS} required={true} error={genderError} setError={setGenderError}/>
                    <FormField type='password' name='password' displayName='Password' value={password} setState={setPassword} required={true} validator={isValidPassword} error={passwordError} setError={setPasswordError}/>
                    <FormField type='password' name='confirm_password' displayName='Confirm Password' value={confirmPassword} setState={setConfirmPassword} required={true} error={confirmPasswordError}/>
                    <hr className='border-gray-300'></hr>
                    <h3 className='font-noto-serif font-semibold text-red-900 text-subHeading my-4'>Address</h3>
                    <FormField type='text' name='door_no' displayName='Door No / Flat No' value={address} setState={setAddress}/>
                    <FormField type='text' name='street' displayName='Street' value={address} setState={setAddress}/>
                    <FormField type='text' name='area' displayName='Area' value={address} setState={setAddress}/>
                    <FormField type='text' name='city' displayName='City / Town' value={address} setState={setAddress}/>
                    <FormField type='text' name='pincode' displayName='Pincode' value={address} setState={setAddress}/>
                    <FormField type='text' name='state' displayName='State' value={address} setState={setAddress}/>
                    <FormField type='text' name='country' displayName='Country' value={address} setState={setAddress}/>
                    <FormField type='text' name='land_mark' displayName='Any Landmark' value={address} setState={setAddress}/>
                    <FormField type='submit' name='signupSubmit' displayName='Signup' isDisabled={requiredCheck || isLoading || errorCheck} isLoading={isLoading}/>
                </form>
            </div>
        </div>
    )
}

export default Signup