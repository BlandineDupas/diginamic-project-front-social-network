import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Components
import Input from "./Input"

// Styles
import './login.scss';

// Reducer
import {
    changeInputValue,
    selectEmail,
    selectError,
    selectPassword,
    userLoginAsync,
    setError
} from './loginSlice';

const Login = () => {
    const dispatch = useDispatch();
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const error = useSelector(selectError);

    const userLogin = (evt) => {
        evt.preventDefault();
        if (email && password) {
            dispatch(userLoginAsync({
                email,
                password
            }));
        } else {
            dispatch(setError("Les deux champs doivent être remplis"));
        }
    }

    return (
        <form onSubmit={userLogin} className="login">
            <legend>Se connecter</legend>
            <Link to="/register">Pas encore de compte ? Inscrivez-vous !</Link>

            <Input
                inputName="email"
                inputType="email"
                label="Email"
                inputData={email}
                changeInputValue={changeInputValue}
            ></Input>
            <Input
                inputName="password"
                inputType="password"
                label="Mot de passe"
                inputData={password}
                changeInputValue={changeInputValue}
            ></Input>
            {(typeof error === 'string') && <p className="error">{error}</p>}
            
            <button type="submit">Connexion</button>
        </form>
    )
}

export default Login;