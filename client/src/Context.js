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
  };


  render() {
    // const  courses = this.genCourseList;
    const { authenticatedUser, isAuthenticated } = this.state;
    const value = {
      authenticatedUser,
      isAuthenticated,
      data: this.data,
      actions: { 
        signIn: this.signIn,
        signOut: this.signOut,
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // USERS
  /**
   * Authenticate user
   * register authenticated user in state
   * set cookies
   * @param username as emailAddress 
   * @param password unhashed to validates
   */
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password)
      if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          isAuthenticated: true,
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  /**
   * Unloads user from app
   * remove cookies
   */
  signOut = () => {
     this.setState({ 
      authenticatedUser: null,
      isAuthenticated: false
    });
    Cookies.remove('authenticatedUser');
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

