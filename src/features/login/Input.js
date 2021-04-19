import { useDispatch } from "react-redux";

const Input = ({ inputName, label, inputType, inputData, changeInputValue }) => {
    const dispatch = useDispatch();

    return (
        <div>
            <label htmlFor={inputName}>{label}</label>
            <input type={inputType} name={inputName} id={inputName} value={inputData.value} onChange={(evt) => dispatch(changeInputValue({ 'inputName': inputName, 'inputValue': evt.target.value}))}></input>
        </div>
    )
};

export default Input;