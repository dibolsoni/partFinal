import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CourseCreate from './components/CourseCreate'
import CourseUpdate from './components/CourseUpdate'
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp'
import UserSignOut from './components/UserSignOut';

//protected routes
import PrivateRoute from './PrivateRoute';

import withContext from './Context';
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CourseCreateWithContext = withContext(CourseCreate);
const CourseUpdateWithContext = withContext(CourseUpdate);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);



export default() => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} /> 
        <Route path="/course-detail/:id" component={CourseDetailWithContext} /> 
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <PrivateRoute path="/create-course" component={CourseCreateWithContext} />
        <PrivateRoute path="/update/:id" component={CourseUpdateWithContext} />
        
      </Switch>
    </div>
  </Router>
);


