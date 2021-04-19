import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import Input from './Input';

// Reducer
import {
    changeInputValue,
    selectLastname,
    selectFirstname,
    selectEmail,
    selectPassword,
    selectPasswordCheck,
    setError,
    addUserAsync,
    clearForm,
    selectSuccess,
} from './registerSlice';

const Register = () => {
    const dispatch = useDispatch();
    const lastname = useSelector(selectLastname);
    const firstname = useSelector(selectFirstname);
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const passwordCheck = useSelector(selectPasswordCheck);
    const success = useSelector(selectSuccess);

    const checkForm = (evt) => {
        evt.preventDefault();
        
        !checkLastname() && dispatch(setError('lastname'));
        !checkFirstname() && dispatch(setError('firstname'));
        !checkEmail() && dispatch(setError('email'));
        !checkPassword() && dispatch(setError('password'));
        !checkPasswordCheck() && dispatch(setError('passwordCheck'));
        
        if (checkLastname() &&
            checkFirstname() &&
            checkEmail() &&
            checkPassword() &&
            checkPasswordCheck()
        ) {
            dispatch(addUserAsync({
                'lastname': lastname.value,
                'firstname': firstname.value,
                'password': password.value,
                'email': email.value
            }));

            (success === true) && dispatch(clearForm());
        }
    }

    const checkLastname = () => (lastname.value.length < 3) ? false : true;
    const checkFirstname = () => (firstname.value.length < 3) ? false : true;
    const checkEmail = () => (email.value.length < 4 || !email.value.toLowerCase().match(/^[a-z0-9]+((\.|-|_)[a-z0-9]+)*@[a-z]+\.[a-z]+/)) ? false : true;
    const checkPassword = () => (password.value.length < 4) ? false : true;
    const checkPasswordCheck = () => (passwordCheck.value !== password.value) ? false : true;


    return (
        <form onSubmit={checkForm}>
            <legend>Inscription</legend>
            <p>{success !== true && success}</p>
            <fieldset>
                <Input
                    inputName="lastname"
                    inputType="text"
                    label="Nom"
                    inputData={lastname}
                    changeInputValue={changeInputValue}
                    checkInput={checkLastname}
                ></Input>
                <Input
                    inputName="firstname"
                    inputType="text"
                    label="Prénom"
                    inputData={firstname}
                    changeInputValue={changeInputValue}
                    checkInput={checkFirstname}
                ></Input>
                <Input
                    inputName="email"
                    inputType="email"
                    label="Email"
                    inputData={email}
                    changeInputValue={changeInputValue}
                    checkInput={checkEmail}
                ></Input>
                <Input
                    inputName="password"
                    inputType="password"
                    label="Mot de passe"
                    inputData={password}
                    changeInputValue={changeInputValue}
                    checkInput={checkPassword}
                ></Input>
                <Input
                    inputName="passwordCheck"
                    inputType="password"
                    label="Vérifiez le mot de passe"
                    inputData={passwordCheck}
                    changeInputValue={changeInputValue}
                    checkInput={checkPasswordCheck}
                ></Input>
            </fieldset>
            <button type="submit">S'inscrire</button>
            <Link to="/login">Déjà inscrit ? Connectez-vous !</Link>
        </form>
    )
};

export default Register;