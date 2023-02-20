import { useState } from 'react'

const useInput = (defaultValue = '') => {
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState(defaultValue)

    // eslint-disable-next-line no-unused-vars
    const onValueChangeHandler = (event) => {
        if (typeof (event) === 'string' || typeof (event) === 'number') {
            setValue(event)
        } else {
            setValue(event.target.value)
        }
    }

    return [value]
}

export default useInput
