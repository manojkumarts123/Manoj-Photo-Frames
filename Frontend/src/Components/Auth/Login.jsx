import { useEffect, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import axios from 'axios'

import FormField from '../Utils/Components/FormField'
import ErrorDialog from '../Utils/Components/ErrorDialog'
import { isValidEmail, isValidPhoneNo, isValidPassword } from '../Utils/utils'

const Login = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [serverErrors, setServerError] = useState('')
    const [userError, setUserError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    let userValidator = !isNaN(user) ?  isValidPhoneNo : isValidEmail
    // useEffect(() => {
    //     setUserValidator(validator)
    // }, [user])

    const loginSubmit = async () => {
        try {
            setIsLoading(true)
            setServerError('')
            const loginData = await axios.post('http://localhost:5000/user/login', {
                user: user,
                password: password
            })
            setIsLoading(false)

            if (loginData.data.code == 10003) {
                setServerError('')
                navigate('../../api/v1/customer/dashboard')
            } else {
                throw new Error("Oops!!Something Went Wrong")
            }
        } catch (error) {
            setIsLoading(false)

            if (error.response) {
                const res = error.response.data
                setServerError(Array.isArray(res.message) ? displayAsList(res.message) : res.message)
            }
        }
    }

    return (
        // <div className='container mx-auto min-h-[inherit] bg-yellow-500 flex items-center justify-center p-16'>
        <div className='container mx-auto min-h-[inherit] p-4'>
            <div id='login-container' className='bg-red-50 border-2 border-solid border-red-300 rounded shadow-container mx-auto mt-16 w-full min-w-44 max-w-[396px] p-6'>
                <h3 className='font-noto-serif font-bold text-red-900 text-heading text-center mb-6'>Login</h3>
                {serverErrors && <ErrorDialog errorInfo={serverErrors} />}

                <form
                    onSubmit={event => {
                        event.preventDefault()
                        loginSubmit()
                    }}
                    className='font-roboto'
                >
                    <FormField type='text' name='user' displayName='Email/Phone No' value={user} setState={setUser} required={true} validator={userValidator} error={userError} setError={setUserError}/>
                    <FormField type='password' name='password' displayName='Password' value={password} setState={setPassword} required={true} error={passwordError} setError={setPasswordError}/>
                    <FormField type='submit' name='loginSubmit' displayName={isLoading ? 'Loading...' : 'Login'} isDisabled={!user.length || !password.length || isLoading || userError || passwordError} />
                </form>

            </div>
        </div>
    )
}

export default Login