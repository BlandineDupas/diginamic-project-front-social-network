const Input = ({
  inputName,
  label,
  inputType,
  inputValue,
  changeInputValue,
  checkInput,
  error
}) => {  
  return (
    <div className="form-field">
      <label htmlFor={inputName} className="form-field--label">{label}</label>
      <input
        className="form-field--input"
        type={inputType}
        name={inputName}
        id={inputName}
        value={inputValue}
        onChange={(evt) => changeInputValue(evt.target.value)}
        onBlur={checkInput}
      ></input>
      {error && <p className="form-field--error error">{error}</p>}
    </div>
  )
};

export default Input;
