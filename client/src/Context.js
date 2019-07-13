import React, { Component } from 'react';
import Data from './Data'
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
  }

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    isAuthenticated: false,
    courses: []
  };

  render() {
    // const  courses = this.genCourseList;
    const { authenticatedUser, isAuthenticated, courses } = this.state;
    const value = {
      authenticatedUser,
      isAuthenticated,
      courses,
      data: this.data,
      actions: { 
        signIn: this.signIn,
        signOut: this.signOut,
        genCourseList: this.genCourseList
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // USERS
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          isAuthenticated: true
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  signOut = () => {
    this.setState({ 
      authenticatedUser: null,
      isAuthenticated: false
    });
    Cookies.remove('authenticatedUser');
  }

  // COURSES
  genCourseList = async () => {
    const courses = await this.data.getCourses();
    if (courses !== null) {
      this.setState({
        courses: courses
      });
    }
    return courses;
  }
}



export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

