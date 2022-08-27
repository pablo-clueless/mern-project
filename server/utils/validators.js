const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=_{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/

const PASSWORD_REGEX = /^(?=.*[a-zA-Z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%_]).{8,20}$/

module.exports = { EMAIL_REGEX, PASSWORD_REGEX }