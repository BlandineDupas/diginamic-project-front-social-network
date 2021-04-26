import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import Page from 'components/parts/page/Page';
import Input from 'components/parts/input/Input';

// Styles
import './register.scss';

// Reducer
import {
  addUserAsync,
  selectRegisterResult
} from 'reducers/login/loginSlice';


const RegisterPage = () => {
  const dispatch = useDispatch();
  const registerResult = useSelector(selectRegisterResult);

  const [lastname, setLastname] = useState('');
  const [lastnameError, setLastnameError] = useState('')
  const [firstname, setFirstname] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('')

  const checkForm = (evt) => {
    evt.preventDefault();
    console.log('register')
    console.log(checkLastname())
    console.log(checkFirstname())
    console.log(checkEmail())
    console.log(checkPassword())
    console.log(checkPasswordCheck())

    if (
      checkLastname() &&
      checkFirstname() &&
      checkEmail() &&
      checkPassword() &&
      checkPasswordCheck()
    ) {
      dispatch(addUserAsync({
        'lastname': lastname,
        'firstname': firstname,
        'password': password,
        'email': email
      }));
    }
  }


  const checkLastname = () => {
    if (lastname.length < 3) {
      setLastnameError('Le nom doit faire au moins 3 caractères');
      return false;
    } else {
      setLastnameError('');
      return true
    }
  }
  const checkFirstname = () => {
    if (firstname.length < 3) {
      setFirstnameError('Le prénom doit faire au moins 3 caractères');
      return false;
    } else {
      setFirstnameError('');
      return true
    }
  }
  const checkEmail = () => { 
    if (email.length < 4 || !email.toLowerCase().match(/^[a-z0-9]+((\.|-|_)[a-z0-9]+)*@[a-z]+\.[a-z]+/)) {
      setEmailError('L\'adresse mail doit faire au moins 4 caractères et correspondre au format d\'adresse email');
      return false;
    } else {
      setEmailError('');
      return true
    }
  }
  const checkPassword = () => {
    if (password.length < 4) {
      setPasswordError('Le mot de passe doit faire au moins 4 caractères');
      return false;
    } else {
      setPasswordError('');
      return true
    }
  }
  const checkPasswordCheck = () => {
    if (passwordCheck !== password) {
      setPasswordCheckError('Les mots de passe doivent être identiques');
      return false;
    } else {
      setPasswordCheckError('');
      return true
    }
  }

  return (
    <Page title="Inscription" extraClass="register">
      <form onSubmit={checkForm}>
        <Link to="/login">Déjà inscrit ? Connectez-vous !</Link>
        
        <Input
          inputName="lastname"
          inputType="text"
          label="Nom"
          inputValue={lastname}
          error={lastnameError}
          changeInputValue={setLastname}
          checkInput={checkLastname}
        ></Input>
        <Input
          inputName="firstname"
          inputType="text"
          label="Prénom"
          inputValue={firstname}
          error={firstnameError}
          changeInputValue={setFirstname}
          checkInput={checkFirstname}
        ></Input>
        <Input
          inputName="email"
          inputType="email"
          label="Email"
          inputValue={email}
          error={emailError}
          changeInputValue={setEmail}
          checkInput={checkEmail}
        ></Input>
        {registerResult.error && <p className="error">{registerResult.error}</p>}
        <Input
          inputName="password"
          inputType="password"
          label="Mot de passe"
          inputValue={password}
          error={passwordError}
          changeInputValue={setPassword}
          checkInput={checkPassword}
        ></Input>
        <Input
          inputName="passwordCheck"
          inputType="password"
          label="Vérifiez le mot de passe"
          inputValue={passwordCheck}
          error={passwordCheckError}
          changeInputValue={setPasswordCheck}
          checkInput={checkPasswordCheck}
        ></Input>
          
        <button type="submit">S'inscrire</button>
      </form>
    </Page>
  )
};

export default RegisterPage;
