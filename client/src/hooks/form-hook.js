import { useReducer } from 'react'

export const useFormInputs = (initialState) => {
    const inputReducer = (state, action) => {
        switch (action.type) {
            case 'change': {
                return {
                    ...state,
                    [action.name]: action.value
                }
            }
            case 'reset': {
                return initialState
            }
            default:
                return state
        }
    }

    const [inputs, dispatch] = useReducer(inputReducer, initialState)
    
    const handleChange = (e) => {
        dispatch({type: 'change', name: [e.target.name], value: e.target.value})
    }

    const reset = (e) => {
        dispatch({type: 'reset'})
    }

    return {inputs, handleChange, reset}
}