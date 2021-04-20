import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Styles
import './app.scss';

import Login from './features/login/Login';
import Register from './features/register/Register';

// Components
import Home from './features/home/Home';

// Reducers
import { selectToken } from './features/login/loginSlice';
import { selectSuccess } from './features/register/registerSlice';
import Navbar from './features/navbar/Navbar';

function App() {
  const token = useSelector(selectToken);
  const success = useSelector(selectSuccess);

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
          <Route exact path="/" component={Home} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
