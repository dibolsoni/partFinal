const express = require('express');
const auth = require('basic-auth');

const bcryptjs = require('bcryptjs');

const User = require('../models').User;


const isAuth = (credentials = null, password) => {
  if ( isNaN( bcryptjs.getRounds(credentials) )){
    if (bcryptjs.compareSync(credentials, password)) {
      return true;
    } else { 
      return false;
    };
  } else {
    if (credentials== password) {
      return true;
    } else { 
      return false;
    };
  }
}


  /**
   * Middleware to authenticate the request using Basic Authentication.
   * @param {Request} req - The Express Request object.
   * @param {Response} res - The Express Response object.
   * @param {Function} next - The function to call to pass execution to the next middleware.
   */
  const authenticateUser = (req, res, next) => {
      // router.currentUser = null;
      let message = null;
      console.log('Authenticating user...');
      // Get the user's credentials from the Authorization header.
      const credentials = auth(req);
      
    
      if (credentials) {
        // Look for a user whose `username` matches the credentials `name` property.
        User.findOne({
          attributes:{ exclude: ['createdAt', 'updatedAt'] },
          where: {
            emailAddress: credentials.name
          } 
        })
          .then(user => {
            if (user) {
              const authenticated = isAuth(credentials.pass, user.password)
              if (authenticated) {
                // Cleaning the password to store the user on the Request object.
                req.body.currentUser = user;
                console.log(`Authentication successful for username: ${user.firstName}`);
                next();
  
              } else {
                message = `Authentication failure for username: ${user.firstName}`;
                const err = new Error('password does not match', 401)
                next(err);
                
              }
            } else {
              message = `User not found for username: ${credentials.name}`;
            }
          })
  
      } else {
        message = 'Auth header not found';
      }
      console.log('Authenticating: finished');
    
      if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
      } 
  };
  

  module.exports = authenticateUser;