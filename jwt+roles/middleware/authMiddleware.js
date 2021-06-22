const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth1 = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'reception', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/logout'); //if token is not verified redirect to login
      } else {
        next();
      }
    });
  } else {
    res.redirect('/logout');
  }
};
const requireAuth2 = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'manager', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/logout'); //if token is not verified redirect to login
      } else {
        next();
      }
    });
  } else {
    res.redirect('/logout');
  }
};
const requireAuth3 = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'owner', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/logout'); //if token is not verified redirect to login
      } else {
        next();
      }
    });
  } else {
    res.redirect('/logout');
  }
};
// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'reception', async (err, decodedToken) => {
      if (err) {
        jwt.verify(token, 'manager', async (err, decodedToken) => {
          if (err) {
            jwt.verify(token, 'owner', async (err, decodedToken) => {
              if (err) {
                res.locals.user = null;
                next();
              } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; //to show the user object in the frontend
                next();
              }
            });
          } else {
            let user = await User.findById(decodedToken.id);
            res.locals.user = user; //to show the user object in the frontend
            next();
          }
        });
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user; //to show the user object in the frontend
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth1, requireAuth2 ,requireAuth3, checkUser };