import React, { Component } from 'react';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Dropdown from './UserSearch/Dropdown';
import DropdownAdmin from './AdminSearch/Dropdown';
import  './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter basename='/'>
        <Switch>
      <Route path="/admin/"  component={DropdownAdmin} />
      <Route path="/"  component={Dropdown} />

      </Switch>


</BrowserRouter>
      </div>
    );
  }
}

export default App;
