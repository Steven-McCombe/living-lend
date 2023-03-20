const { AuthenticationError } = require('apollo-server-express');

const jwt = require('jsonwebtoken');


//We will need to put this into a dot env
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
  
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
  
    if (!token) {
      return { req };
    }
  
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
  
    return { req };
  },

  adminAuthMiddleware: function (context) {
    const { req } = context;
    console.log("USER:" + req.user)
    console.log("isAdmin:" + req.user.isAdmin)
    if (!req.user || !req.user.isAdmin) {
      throw new AuthenticationError('Unauthorized');
    }
  },
  signToken: function ({ firstName, email, _id, isAdmin }) {
    const payload = { firstName, email, _id, isAdmin };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  
};
