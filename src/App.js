import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './features/login/Login';
import Register from './features/register/Register';

import { selectToken } from './features/login/loginSlice';
import Home from './features/home/Home';

function App() {
  const token = useSelector(selectToken);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          { token && <Redirect from="/login" to="/"></Redirect> }
          { token && <Redirect from="/register" to="/"></Redirect> }
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          
          { !token && <Redirect from="/" to="/login" />}
          <Route exact path="/" component={Home}></Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
