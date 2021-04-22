import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Styles
import './app.scss';

import Login from './features/login/Login';
import Register from './features/register/Register';

// Components
import Home from './features/home/Home';
import Navbar from './features/navbar/Navbar';

// Reducers
import { selectToken, selectUser } from './features/login/loginSlice';
import { selectSuccess } from './features/register/registerSlice';
import { getIdFromSlug } from './selectors';
import UserPage from './features/userPage/UserPage';
import FriendsPage from './features/friendsPage/FriendsPage';
import AccountPage from './features/accountPage/AccountPage';

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
                { token && <Redirect from="/login" to="/friends" /> }
                <Route exact path="/login" component={Login} />
                
                {/* If just registered, redirect to login page */}
                { success && <Redirect from="/register" to="/login" />}
                {/* If connected, don't show register page */}
                { token && <Redirect from="/register" to="/" /> }
                <Route exact path="/register" component={Register} />
                
                {/* If not connected, redirects all routes starting by / */}
                { !token && <Redirect from="/" to="/login" />}

                {/* All other routes */}
                <Route exact path="/" render={() => <Home title="Accueil" userId={user.id}></Home>} />
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
