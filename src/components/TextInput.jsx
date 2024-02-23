import PropTypes from 'prop-types'

const TextInput = ({ props }) => {
  return (
    <div className='flex flex-col gap-y-1'>
      <label
        htmlFor={props.id}
        className='pl-2'
      >
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.setValue}
        placeholder={props.placeholder}
        className={`border rounded-xl py-2 px-3 bg-white ${!props.isEmailValid && props.value !== '' ? 'border-red-600' : ''} `}
        required
      />
    </div>
  )
}

TextInput.propTypes = {
  props: PropTypes.shape({
    value: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    setValue: PropTypes.func,
    isEmailValid: PropTypes.bool
  })
}

export default TextInput
