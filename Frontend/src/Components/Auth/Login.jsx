import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import FormField from '../Utils/Components/FormField'
import ErrorDialog from '../Utils/Components/ErrorDialog'
import Loading from '../Utils/Components/Loading'
import { isValidEmail, isValidPhoneNo, isValidPassword } from '../Utils/utils'
import { RESPONSE_CODES } from '../../constants'

const Login = ({ setCurrentUser }) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const [serverErrors, setServerError] = useState('')
    const [userError, setUserError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    let userValidator = !isNaN(user) ?  isValidPhoneNo : isValidEmail

    /***********************
	 * Login Submit Handler *
	 **********************/
    const loginSubmit = async () => {
        try {
            setIsLoading(true)
            setServerError('')
            const loginData = await axios.post('http://localhost:5000/user/login', {
                user: user,
                password: password
            })
            setIsLoading(false)

            if (loginData.data.code == RESPONSE_CODES.LOGIN_SUCCESS) {
                let userData = loginData.data.userData
                localStorage.setItem('currentUser', JSON.stringify(userData)) //Save It To Local Storage To Remember Between Reloads
                setCurrentUser(userData)
                navigate(userData.role == 'Customer' ? '../../api/v1/customer/dashboard' : '../../api/v1/admin/dashboard')
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
        <div className='h-full container mx-auto flex items-center justify-center p-4'>
            <div id='login-container' className='flex flex-col bg-red-50 border-2 border-solid border-red-300 rounded shadow-container max-h-[525px] w-full min-w-44 max-w-[396px] p-6'>
                <h2 className='font-noto-serif font-bold text-red-900 text-heading text-center mb-6'>Login</h2>
                {serverErrors && <ErrorDialog errorInfo={serverErrors} />}

                <form
                    className='h-full flex-1 overflow-auto font-roboto' 
                    onSubmit={event => {
                        event.preventDefault()
                        loginSubmit()
                    }}
                >
                    <FormField type='text' name='user' displayName='Email/Phone No' value={user} setState={setUser} required={true} validator={userValidator} error={userError} setError={setUserError}/>
                    <FormField type='password' name='password' displayName='Password' value={password} setState={setPassword} required={true} error={passwordError} setError={setPasswordError}/>
                    <FormField type='submit' name='loginSubmit' displayName='Login' isDisabled={!user.length || !password.length || isLoading || userError || passwordError} isLoading={isLoading} />
                </form>
            </div>
        </div>
    )
}

export default Login