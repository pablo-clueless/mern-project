
export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const retrieveFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key)
}

export const PASSWORD_REGEX = /^(?=.*[a-zA-Z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%_]).{8,20}$/

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=_{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/