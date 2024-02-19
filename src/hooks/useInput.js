import { useState } from 'react'

const useInput = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)

  const onValueChangeHandler = (event) => {
    if (typeof (event) === 'string' || typeof (event) === 'number') {
      setValue(event)
    } else {
      setValue(event.target.value)
    }
  }

  return [value, onValueChangeHandler]
}

export default useInput
