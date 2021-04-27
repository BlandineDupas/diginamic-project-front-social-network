import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

// Styles
import './app.scss';

// Components
import Navbar from 'components/parts/navbar/Navbar';

import HomePage from 'components/main/homePage/HomePage';
import LoginPage from 'components/main/loginPage/LoginPage';
import RegisterPage from 'components/main/registerPage/RegisterPage';
import UserPage from 'components/main/userPage/UserPage';
import FriendsPage from 'components/main/friendsPage/FriendsPage';
import AccountPage from 'components/main/accountPage/AccountPage';

// Reducers
import {
  selectRegisterResult,
  selectToken,
} from 'reducers/login/loginSlice';

// Selectors
import { getIdFromSlug } from '../selectors';

function App() {
  const token = useSelector(selectToken);
  const registerResult = useSelector(selectRegisterResult);
  const [socket, setSocket] = useState();
  const api = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    if (token) {
      const innerSocket = socketIOClient(api, { whithCredentials: true});
      setSocket(innerSocket);  
    } else {
      socket && socket.disconnect();
    }
  }, [token])

  useEffect(() => {
    socket && socket.on('update', () => console.log('UPDATE'))
  }, [socket])

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>
          <Switch>
            {/* If connected, don't show login page */}
            { token && <Redirect from="/login" to="/" /> }
            <Route exact path="/login" component={LoginPage} />
            
            {/* If just registered, redirect to login page */}
            { registerResult.success && <Redirect from="/register" to="/login" />}
            {/* If connected, don't show register page */}
            { token && <Redirect from="/register" to="/" /> }
            <Route exact path="/register" component={RegisterPage} />
            
            {/* If not connected, redirects all routes starting by / */}
            { !token && <Redirect from="/" to="/login" />}

            {/* All other routes */}
            <Route exact path="/" render={() => <HomePage socket={socket}></HomePage>} />
            <Route exact path="/friends" component={FriendsPage} />
            <Route exact path="/account" component={AccountPage} />

            {/* User page in last position in order to dont take friends or account as a slug */}
            <Route exact path="/:usernameSlug" render={({ match }) => <UserPage userId={getIdFromSlug(match.params.usernameSlug)}></UserPage>} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
