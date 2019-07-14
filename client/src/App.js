import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp'
import CourseCreate from './components/CourseCreate'
import UserSignOut from './components/UserSignOut';



import withContext from './Context';
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CourseCreateWithContext = withContext(CourseCreate);
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
        <Route path="/create-course" component={CourseCreateWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        
      </Switch>
    </div>
  </Router>
);


