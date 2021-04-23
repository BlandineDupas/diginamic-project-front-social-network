const Input = ({ inputName, label, inputType, inputData, changeInputValue }) => {

  return (
    <div className="form-field">
      <label htmlFor={inputName} className="form-field--label">{label}</label>
      <input
        className="form-field--input"
        type={inputType}
        name={inputName}
        id={inputName}
        value={inputData}
        onChange={(evt) => changeInputValue(evt.target.value)}
      ></input>
    </div>
  )
};

export default Input;
