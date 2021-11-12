import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
    {/* <Route exact path="/" component={  } /> */}
    <Route exact path="/login" component={ Login  } />
    <Route exact path="/admin" component={ Admin } />
    <Route exact path="/user" component={ Login } />
  </Switch>
  );
}

export default App;
