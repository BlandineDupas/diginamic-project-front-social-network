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
        <div>
            <label htmlFor={inputName}>{label}</label>
            <input type={inputType} name={inputName} id={inputName} value={inputData.value} onChange={(evt) => dispatch(changeInputValue({ 'inputName': inputName, 'inputValue': evt.target.value}))} onBlur={check}></input>
            <p>{inputData.error && inputData.errorMessage}</p>
        </div>
    )
};

export default Input;