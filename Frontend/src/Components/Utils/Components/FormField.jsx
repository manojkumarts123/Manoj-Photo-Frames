import React, { useEffect, useRef } from 'react'
import Loading from './Loading'

/***
 * Types - text, number, password, checkbox, radio, dropdown, date, submit 
 * 
 * Required Props for Specific Types
 * text - type, name, displayName, setState, validator?
 * password - type, name, displayName, setState, validator?
 * submit - type, name(as id), displayName, disabled
 * 
*/
const FormField = ({ type = 'text', name = 'name', displayName = 'Name', value='', setState = () => console.log('No State'), options=[], required=false, isDisabled = false, isLoading=false, validator, error='', setError }) => {
    let isInitialLoad = useRef(true)

    useEffect(() => {
        if(!value){
            // If not initialLoad and required then set error
            !isInitialLoad.current && required && setError && setError("This Field is Required")
        }else{
            if(validator){
                let validatorResult = validator(value)
                if(validatorResult !== true){
                    setError && setError(validatorResult)
                }else{
                    // All Case Passed 
                    setError && setError('')
                }
            }else{
                // Value there but no validator and error is shown in before render
                setError && setError('')
            }
        }
        // Set To false From 2 Render
        isInitialLoad.current = false
    }, [value, validator])

    switch (type) {
        case 'text':
        case 'password':
            return (
                <div className='mb-6'>
                    <label htmlFor={name} className={'text-red-950' + (required ? ' ast' : '')}>{displayName}</label>
                    <input type={type} id={name} name={name} value={typeof value === 'object' ? value[{name}] : value} onChange={e => (typeof value === 'object') ? setState({...value, [name]: e.target.value.trim()}) : setState(e.target.value.trim())} className='block w-full px-2.5 py-1 border-red-300 border rounded focus:outline-none focus:border-red-400 focus:shadow-formfield mobile:px-3 mobile:py-1.5' />
                    {error  && <div key={name} className='text-red-600 text-small font-medium mt-1'>{error}</div>}
                </div>
            )
        case 'radio':
            return(
                <div className='mb-6'>
                    <p className={'text-red-950 mb-2' + (required ? ' ast' : '')}>{displayName}</p>
                    <div className='max-w-[90%] flex justify-between'>
                        {options.map(ele => 
                            <div key={ele} className='flex items-center'>
                                <input type={type} id={ele} name={name} value={ele} onChange={e => setState(e.target.value)} className='accent-red-700' /> 
                                <label htmlFor={ele} className='pl-1'>{ele}</label>
                            </div>
                            )
                        }
                    </div>
                </div>
            )
        case 'submit':
            return (
                <button type={type} id={name} className='w-full flex justify-center items-center bg-red-600 text-red-100 font-noto-serif font-semibold my-2 px-3 py-1.5 rounded hover:bg-red-700 active:bg-red-800 active:shadow-activeButton disabled:bg-red-400 disabled:shadow-none mobile:px-4 mobile:py-2' disabled={isDisabled}>
                    {isLoading && <Loading />}
                    {isLoading ? <p className='pl-1'>Loading...</p> : <p>{displayName}</p>}
                </button>
            )
        default:
            return (
                <div className='mb-4'>
                    <label htmlFor={name} className={'text-red-950' + (required ? ' ast' : '')}>{displayName}</label>
                    <input type={type} id={name} name={name} value={value} onChange={e => setState(e.target.value.trim())} className='block w-full px-2.5 py-1 border-red-300 border rounded focus:outline-none focus:border-red-400 focus:shadow-formfield mobile:px-3 mobile:py-1.5' />
                </div>
            )
    }
}

export default FormField