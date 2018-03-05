/**
 * JwtService
 *
 * @description :: JSON Webtoken Service for Sails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var
  jwt = require('jsonwebtoken');
  tokenSecret = "StarFinSecretToken";

module.exports.issue = function(payload) {
    return jwt.sign(
        payload,
        // Token Secret that we sign it with
        tokenSecret,
        {
          // Token Expire time  
          expiresIn: 180
        }
    );
};


module.exports.verify = function(token, callback) {
    return jwt.verify(
      // The token to be verified
      token, 
      // Same token we used to sign
      tokenSecret,
      // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      {},
      // Pass errors or decoded token to callback
      callback
    );
};

