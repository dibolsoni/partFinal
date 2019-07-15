import React from 'react';
import {Link} from 'react-router-dom';

export default ({context, location}) =>  {
    const {authenticatedUser} = context;
    return(
        <div className="bounds">
          <div className="grid-100">
              
              <h1>{authenticatedUser.name} is authenticated!</h1>
              <p>Your username is {authenticatedUser.username}.</p>
              <p>Go <Link to="/" >Home </Link></p>
          </div>
        </div>
    )

}
