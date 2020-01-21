import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'; 

import './App.css';
import Header from './components/header/header';
import SelectAndFrom from './components/selectandform/selectandform';
import SurveyResults from './components/surveyresult/surveyresult';
import ResultAndSearch from './components/resultandserach/resultandsearch';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={SelectAndFrom} />
        <Route exact path="/results" component={ResultAndSearch} />
      </div>
    </BrowserRouter>
  );
}

export default App;
