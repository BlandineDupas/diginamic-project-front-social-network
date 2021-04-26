import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// Styles
import './navbar.scss';

// Reducers
import {
  selectToken,
  selectCurrentUser,
  logout,
} from 'reducers/login/loginSlice';

// Selectors
import { slugifyName } from 'selectors';

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <nav className="navbar">
      <h1><Link to="/">Réseau Social</Link></h1>
      {/* if connected */}
      { token && (
        <ul>
          <li><NavLink exact to="/">Accueil</NavLink></li>
          <li><NavLink exact to={'/' + slugifyName(currentUser.firstname, currentUser.lastname, currentUser.id)}>Ma page</NavLink></li>
          <li><NavLink exact to="/friends">Amis</NavLink></li>
          <li><NavLink exact to="/account">Mon compte</NavLink></li>
          <li id="logout" onClick={() => dispatch(logout())}>X</li>
        </ul>
      )}
      {/* if not connected */}
      { !token && (
        <ul>
          <li><NavLink to="/login">Connexion</NavLink></li>
          <li><NavLink to="/register">Inscription</NavLink></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
