import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import Dropdown from './AdminSearch/Dropdown';
import  './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter basename='/'>

      <Route path="/"  component={Dropdown} /> 

    


</BrowserRouter>
      </div>
    );
  }
}

export default App;
