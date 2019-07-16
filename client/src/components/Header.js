import React from 'react';

import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const { location } = this.props;
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
                location ? 
                    {pathname: '/signup',
                    from: location.from.pathname}
                :
                    {pathname: '/signup'}
                }
              >Sign Up</Link>
              <Link to={
                location ? 
                    {pathname: '/signin',
                    from: location.from.pathname}
                :
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
