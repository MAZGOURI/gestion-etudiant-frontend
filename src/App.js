import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GestionEtudiant from './Components/GestionEtudiant';
import Home from './Components/Home';
import InfoEdit from './Components/EditInfoEtudiant';

function App() {
  return (
    <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/etudiants' exact={true} component={GestionEtudiant}/>
          <Route path='/etudiants/:id' component={InfoEdit}/>
        </Switch>
      </Router>
  );
}

export default App;
