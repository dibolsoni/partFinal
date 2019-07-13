import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


import Header from './components/Header';
import Courses from './components/Courses'

import withContext from './Context';
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);



export default() => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} /> 
      </Switch>
    </div>
  </Router>
);


