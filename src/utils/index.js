const checkEmailIsValid = (text) => {
    if (!text) {
        return false
    }
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return text.match(regexExp)
}

export { checkEmailIsValid }
