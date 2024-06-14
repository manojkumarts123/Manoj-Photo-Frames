import React, { useEffect, useRef } from 'react'

/***
 * Types - text, number, password, checkbox, radio, dropdown, date, submit 
 * 
 * Required Props for Specific Types
 * text - type, name, displayName, setState, validator?
 * password - type, name, displayName, setState, validator?
 * submit - type, name(as id), displayName, disabled
 * 
*/
const FormField = ({ type = 'text', name = 'name', displayName = 'Name', value='', setState = () => console.log('No State'), required=false, isDisabled = false, validator, error='', setError }) => {
    console.log(name, validator)
    let isInitialLoad = useRef(true)

    useEffect(() => {
        if(!value){
            // If not initialLoad and required then set error
            !isInitialLoad.current && required && setError("This Field is Required")
        }else{
            if(validator){
                let validatorResult = validator(value)
                if(validatorResult !== true){
                    console.log("Validator Res", validatorResult);
                    setError(validatorResult)
                    console.log('Error', error);
                }else{
                    // All Case Passed 
                    setError('')
                }
            }else{
                // Value there but no validator and error is shown in before render
                setError('')
            }
        }
        // Set To false From 2 Render
        isInitialLoad.current = isInitialLoad.current && false
    }, [value, validator])

    switch (type) {
        case 'text':
        case 'password':
            return (
                <div className='mb-6'>
                    <label htmlFor={name} className='text-red-950'>{displayName}</label>
                    <input type={type} id={name} name={name} onChange={e => setState(e.target.value)} className='block w-full px-2.5 py-1 border-red-300 border rounded focus:outline-none focus:border-red-400 focus:shadow-formfield mobile:px-3 mobile:py-1.5' />
                    {error  && <div key={name} className='text-red-600 text-small font-medium mt-1'>{error}</div>}
                </div>
            )
        case 'submit':
            return (
                <button type={type} id={name} className='w-full bg-red-600 text-red-100 font-noto-serif font-semibold my-2 px-3 py-1.5 rounded hover:bg-red-700 active:bg-red-800 active:shadow-activeButton disabled:bg-red-400 disabled:shadow-none mobile:px-4 mobile:py-2' disabled={isDisabled}>{displayName}</button>
            )
        default:
            return (
                <div className='mb-4'>
                    <label htmlFor={name} className='text-red-950'>{displayName}</label>
                    <input type={type} id={name} name={name} onChange={e => setState(e.target.value)} className='block w-full px-2.5 py-1 border-red-300 border rounded focus:outline-none focus:border-red-400 focus:shadow-formfield mobile:px-3 mobile:py-1.5' />
                </div>
            )
    }
}

export default FormField