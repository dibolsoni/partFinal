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
import Authenticated from './components/Authenticated';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';


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
const AuthenticatedWithContext = withContext(Authenticated);


export default() => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} /> 
        <Route exact path="/authenticated" component={AuthenticatedWithContext} /> 
        <Route exact path="/forbidden" component={Forbidden} /> 
        <PrivateRoute exact path="/courses/create/" component={CourseCreateWithContext} />
        <PrivateRoute exact path="/courses/:id/update/" component={CourseUpdateWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} /> 

        <Route component={NotFound} /> 
        
      </Switch>
    </div>
  </Router>
);


