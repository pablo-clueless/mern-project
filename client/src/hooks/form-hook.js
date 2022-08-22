import { useReducer, useState } from 'react'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'change': {
            return {
                ...state,
                [action.name]: action.value
            }
        }
        case 'reset': {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}

export const useFormInputs = (initialState) => {
    const [inputs, dispatch] = useReducer(inputReducer, initialState)
    // const [isTouched, setIsTouched] = useState(false)
    // const [isValid, setIsValid] = useState(false)

    const handleChange = (e) => {
        dispatch({type: 'change', name: [e.target.name], value: e.target.value})
    }

    const resetValues = () => {
        dispatch({type: 'reset'})
    }

    return {inputs, handleChange, resetValues}
}