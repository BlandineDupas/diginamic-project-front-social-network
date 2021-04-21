import { useDispatch } from "react-redux";

const Input = ({ inputName, label, inputType, inputData, changeInputValue }) => {
    const dispatch = useDispatch();

    return (
        <div className="form-field">
            <label htmlFor={inputName} className="form-field--label">{label}</label>
            <input className="form-field--input" type={inputType} name={inputName} id={inputName} value={inputData} onChange={(evt) => dispatch(changeInputValue({ 'inputName': inputName, 'inputValue': evt.target.value}))}></input>
        </div>
    )
};

export default Input;