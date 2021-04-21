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

function App() {
  const token = useSelector(selectToken);
  const success = useSelector(selectSuccess);
  const user = useSelector(selectUser);

  return (
    <div className="app">
      <BrowserRouter>
      <Navbar></Navbar>
        <Switch>
          { token && <Redirect from="/login" to="/" /> }
          <Route exact path="/login" component={Login} />
          
          { success && <Redirect from="/register" to="/login" />}
          { token && <Redirect from="/register" to="/" /> }
          <Route exact path="/register" component={Register} />
          
          { !token && <Redirect from="/" to="/login" />}
          <Route exact path="/" render={() => <Home title="Accueil" userId={user.id}></Home>} />
          <Route exact path="/me" render={() => <Home title={ user.firstname + ' ' + user.lastname} userId={user.id}></Home>} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
