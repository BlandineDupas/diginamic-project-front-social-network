import { useDispatch } from "react-redux";

const Input = ({ inputName, label, inputType, inputData, changeInputValue, messageId }) => {
    const dispatch = useDispatch();

    return (
        <div className="form-field">
            { label &&
                <label htmlFor={inputName} className="form-field--label">{label}</label>
            }
            { inputType !== 'textarea' && 
                <input
                    className="form-field--input"
                    type={inputType}
                    name={inputName}
                    id={inputName}
                    value={inputData}
                    onChange={(evt) => dispatch(changeInputValue({'inputValue': evt.target.value, messageId}))}
                ></input>
            }

            { inputType === 'textarea' && 
                <textarea
                    className="form-field--input"
                    name={inputName}
                    id={inputName}
                    value={inputData}
                    onChange={(evt) => dispatch(changeInputValue({'inputValue': evt.target.value, messageId}))}
                ></textarea>
            }
        </div>
    )
};

export default Input;