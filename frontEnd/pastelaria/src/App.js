import React from 'react';
import { Switch, Route } from 'react-router-dom';
import User from './pages/User';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/login" component={ Login  } />
    <Route exact path="/user" component={ User } />
  </Switch>
  );
}

export default App;
