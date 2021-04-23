import { useDispatch } from "react-redux";

// Reducer
import { clearError, setError } from "./registerSlice";

const Input = ({ inputName, label, inputType, inputData, changeInputValue, checkInput }) => {
    const dispatch = useDispatch();

    const check = () => {
        !checkInput() 
        ? dispatch(setError(inputName)) 
        : (inputData.error && dispatch(clearError(inputName)))
    }

    return (
        <div className="form-field">
            <label htmlFor={inputName} className="form-field--label">{label}*</label>
            <input className="form-field--input" type={inputType} name={inputName} id={inputName} value={inputData.value} onChange={(evt) => dispatch(changeInputValue({ 'inputName': inputName, 'inputValue': evt.target.value}))} onBlur={check}></input>
            { inputData.error && <p className="form-field--error error">{inputData.errorMessage}</p>}
        </div>
    )
};

export default Input;