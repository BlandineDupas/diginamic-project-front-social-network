import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Styles
import './app.scss';

// Components
import Navbar from 'components/parts/navbar/Navbar';

import HomePage from 'components/main/homePage/HomePage';
import Login from 'components/main/loginPage/LoginPage';
import Register from 'components/main/register/Register';
import UserPage from 'components/main/userPage/UserPage';
import FriendsPage from 'components/main/friendsPage/FriendsPage';
import AccountPage from 'components/main/accountPage/AccountPage';

// Reducers
import { selectToken, selectUser } from '../reducers/user/userSlice';
import { selectSuccess } from './main/register/registerSlice';
import { getIdFromSlug } from '../selectors';

function App() {
    const token = useSelector(selectToken);
    const success = useSelector(selectSuccess);
    const user = useSelector(selectUser);

    return (
        <div className="app">
        <BrowserRouter>
        <Navbar></Navbar>
            <Switch>
                {/* If connected, don't show login page */}
                { token && <Redirect from="/login" to="/" /> }
                <Route exact path="/login" component={Login} />
                
                {/* If just registered, redirect to login page */}
                { success && <Redirect from="/register" to="/login" />}
                {/* If connected, don't show register page */}
                { token && <Redirect from="/register" to="/" /> }
                <Route exact path="/register" component={Register} />
                
                {/* If not connected, redirects all routes starting by / */}
                { !token && <Redirect from="/" to="/login" />}

                {/* All other routes */}
                <Route exact path="/" render={() => <HomePage title="Accueil" userId={user.id}></HomePage>} />
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
