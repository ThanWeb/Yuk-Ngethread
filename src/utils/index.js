const months = ['January', 'Februarry', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const checkEmailIsValid = (text) => {
    if (!text) {
        return false
    }
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return text.match(regexExp)
}

const getFormattedDateString = (isoDate) => {
    const date = new Date(isoDate)
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} at ${hours}:${minutes}:${seconds}`
}

const findWhoGiveVote = (users, id) => {
    if (users.length > 0) {
        const currentUser = users.find((user) => user.id === id)
        return currentUser.name
    }
}

export { checkEmailIsValid, getFormattedDateString, findWhoGiveVote }
