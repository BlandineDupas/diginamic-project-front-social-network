import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "./Input"

import {
    changeInputValue,
    selectEmail,
    selectPassword,
    userLoginAsync
} from './loginSlice';

const Login = () => {
    const dispatch = useDispatch();
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

    const userLogin = (evt) => {
        evt.preventDefault();
        dispatch(userLoginAsync({
            email,
            password
        }))
    }

    return (
        <form onSubmit={userLogin}>
            <legend>Se connecter</legend>
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
            <button type="submit">Connexion</button>
            <Link to="/register">Pas encore de compte ? Inscrivez-vous !</Link>
        </form>
    )
}

export default Login;