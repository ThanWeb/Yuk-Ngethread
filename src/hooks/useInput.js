import { useState } from 'react'

const useInput = (defaultValue = '') => {
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState(defaultValue)

    const onValueChangeHandler = (event) => {
        // if (typeof (event) === 'string' || typeof (event) === 'number') {
        //     setValue(event)
        // } else {
        //     setValue(event.target.value)
        // }
        console.log(event)
    }

    return [value, onValueChangeHandler]
}

export default useInput
