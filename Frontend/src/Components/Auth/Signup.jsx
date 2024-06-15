import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'simplebar'
import 'simplebar/dist/simplebar.css'
import ResizeObserver from 'resize-observer-polyfill'
window.ResizeObserver = ResizeObserver

import FormField from '../Utils/Components/FormField'
import ErrorDialog from '../Utils/Components/ErrorDialog'
import { isValidName, isValidEmail, isValidPhoneNo, isValidPassword } from '../Utils/utils'
import { genderOptions } from '../../constants.js'

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
    console.log("address obj", name, email, phoneNo, address);

    const requiredCheck = !name.length || !email.length || !phoneNo.length || !password.length || !confirmPassword
    const errorCheck = serverErrors || nameError || emailError || phoneNoError || genderError || passwordError || confirmPasswordError

    const signupSubmit = () => {
        console.log(' Signup Submit ');
    }


    return (
        <div className='container mx-auto min-h-[inherit] flex items-center justify-center p-4'>
        {/* <div className='container mx-auto min-h-[inherit] p-4'> */}
            <div id='login-container' className='bg-red-50 border-2 border-solid border-red-300 rounded shadow-container max-h-[525px] w-full min-w-44 max-w-[396px] p-6'>
                <h3 className='font-noto-serif font-bold text-red-900 text-heading text-center mb-6'>Signup</h3>
                {serverErrors && <ErrorDialog errorInfo={serverErrors} />}

                <form 
                    className='font-roboto max-h-[calc(525px-32px-48px-24px)]' // 500px - container heigth, 32px - heading heigth, 48px - container padding(top+bottom), 24px- heading margin bottom
                    onSubmit={event => {
                        event.preventDefault()
                        signupSubmit()
                    }}
                    data-simplebar
                >
                    <FormField type='text' name='name' displayName='Name' value={name} setState={setName} required={true} validator={isValidName} error={nameError} setError={setNameError}/>
                    <FormField type='text' name='email' displayName='Email' value={email} setState={setEmail} required={true} validator={isValidEmail} error={emailError} setError={setEmailError}/>
                    <FormField type='text' name='phone_no' displayName='Phone Number' value={phoneNo} setState={setPhoneNo} required={true} validator={isValidPhoneNo} error={phoneNoError} setError={setPhoneNoError}/>
                    <FormField type='radio' name='gender' displayName='Gender' value={gender} setState={setGender} options={genderOptions} required={true} error={genderError} setError={setGenderError}/>
                    <FormField type='password' name='password' displayName='Password' value={password} setState={setPassword} required={true} validator={isValidPassword} error={passwordError} setError={setPasswordError}/>
                    <FormField type='password' name='confirm_password' displayName='Confirm Password' value={confirmPassword} setState={setConfirmPassword} required={true}/>
                    <hr className='border-gray-300'></hr>
                    <h4 className='font-noto-serif font-semibold text-red-900 text-subHeading my-4'>Address</h4>
                    <FormField type='text' name='door_no' displayName='Door No / Flat No' value={address} setState={setAddress}/>
                    <FormField type='text' name='street' displayName='Street' value={address} setState={setAddress}/>
                    <FormField type='text' name='area' displayName='Area' value={address} setState={setAddress}/>
                    <FormField type='text' name='city' displayName='City / Town' value={address} setState={setAddress}/>
                    <FormField type='text' name='pincode' displayName='Pincode' value={address} setState={setAddress}/>
                    <FormField type='text' name='state' displayName='State' value={address} setState={setAddress}/>
                    <FormField type='text' name='country' displayName='Country' value={address} setState={setAddress}/>
                    <FormField type='text' name='land_mark' displayName='Any Landmark' value={address} setState={setAddress}/>
                    <FormField type='submit' name='loginSubmit' displayName={isLoading ? 'Loading...' : 'Login'} isDisabled={requiredCheck || isLoading || errorCheck} />
                </form>

            </div>
        </div>
    )
}

export default Signup