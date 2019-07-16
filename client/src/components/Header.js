import React from 'react';

import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const { location } = this.props; 
    console.log(location);
    const authUser = context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
          <Link to='/'><h1 className="header--logo">Courses</h1></Link>
          <nav>
          {
            authUser ?
              <React.Fragment>
                <span>Welcome, {authUser.name}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            :
            <React.Fragment>
              <Link to={
                    {pathname: '/signup'}
                }
              >Sign Up</Link>
              <Link to={
                    {pathname: '/signin'}
                } >Sign In</Link>
            </React.Fragment>
          } 
          </nav>
        </div>
      </div>
    );
  }
};
