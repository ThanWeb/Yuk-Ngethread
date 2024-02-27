const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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

  return `${days[date.getDay()]}, ${hours}:${minutes} | ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const findWhoGiveVote = (users, id) => {
  if (users.length > 0) {
    const currentUser = users.find((user) => user.id === id)
    if (currentUser) {
      return currentUser.name
    }
  }
}

export { checkEmailIsValid, getFormattedDateString, findWhoGiveVote }
