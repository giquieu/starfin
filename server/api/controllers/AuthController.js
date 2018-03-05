/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    login: function (req, res) {

        var email = req.param('email');
        var password = req.param('password');
    
        if (!email || !password) {
          return res.json(401, {err: 'E-Mail and Password Required!'});
        }
    
        User.findOne({email: email}, function (err, user) {
            
          if (!user) {
            return res.json(401, {err: 'Invalid E-Mail or Password!'});
          }
    
          User.comparePassword(password, user, function (err, valid) {
            if (err) {
              return res.json(403, {err: 'Forbidden'});
            }
    
            if (!valid) {
              return res.json(401, {err: 'Invalid E-Mail or Password'});
            } else {
              res.json({
                user: user,
                token: JwtService.issue({id : user.id })
              });
            }
          });
        })
    }

};

