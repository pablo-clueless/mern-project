
export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
}

export const retrieveFromLocalStorage = (key) => {
    const jsonData = localStorage.getItem(key)
    if(item) {
        const data =JSON.parse(jsonData)
        return data
    } else {
        return null
    }
}

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key)
}

export const PASSWORD_REGEX = /^(?=.*[a-zA-Z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%_]).{8,20}$/

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=_{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/