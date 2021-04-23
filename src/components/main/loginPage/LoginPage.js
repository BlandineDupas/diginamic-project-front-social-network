import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import Input from './Input';
import Page from 'components/parts/page/Page';

// Styles
import './login.scss';

// Reducer
import { selectSuccess } from '../register/registerSlice';
import {
  userLoginAsync,
} from 'reducers/user/userSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const success = useSelector(selectSuccess);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const userLogin = (evt) => {
    evt.preventDefault();
    if (email && password) {
      dispatch(userLoginAsync({
        email,
        password
      }));
    } else {
      setError("Les deux champs doivent être remplis");
    }
  }

  return (
    <Page title="Se connecter">
      { success && <p className="success">Le compte a bien été créé, veuillez vous connecter</p> }
      <Link to="/register">Pas encore de compte ? Inscrivez-vous !</Link>
      <form onSubmit={userLogin} className="login">
        <Input
          inputName="email"
          inputType="email"
          label="Email"
          inputData={email}
          changeInputValue={setEmail}
        ></Input>
        <Input
          inputName="password"
          inputType="password"
          label="Mot de passe"
          inputData={password}
          changeInputValue={setPassword}
        ></Input>
        {(typeof error === 'string') && <p className="error">{error}</p>}
        
        <button type="submit">Connexion</button>
      </form>
    </Page>
  )
}

export default LoginPage;
