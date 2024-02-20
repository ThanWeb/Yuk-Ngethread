import PropTypes from 'prop-types'

const TextInput = ({ props }) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.setValue}
        placeholder={props.placeholder}
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
    setValue: PropTypes.func
  })
}

export default TextInput
