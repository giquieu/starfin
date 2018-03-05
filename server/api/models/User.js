/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    
    email: {
      type: 'email',
      required: 'true',
      unique: true
    },

    nome: {
      type: 'string',
      required: 'true',
      size: 40,
      unique: true
    },

    encryptedPassword: {
      type: 'string' 
    },

		role: {
			type: 'string',
			enum: ['ADMIN', 'USER'],
			required: true,
    },
    
		ativo: {
      type: "boolean",
			required: true,
    },

		createdAt: 'date',
    updatedAt: 'date',    
    
    // We don't wan't to Send Back Encrypted Password Either
    toJSON: function () {
      var obj = this.toObject();
      delete obj.id;
      delete obj.password;
      delete obj.confirmPassword;      
      delete obj.createdAt;
      delete obj.updatedAt;
      delete obj.encryptedPassword;
      return obj;
    }

  },

  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if (err) return next(err);
        values.encryptedPassword = hash;
        next();
      })
    })
    values.ativo = true;
  },
  
  comparePassword : function (password, user, next) {
    bcrypt.compare(password, user.encryptedPassword, function (err, match) {
      if (err) next(err);

      if (match) {
        next(null, true);
      } else {
        next(err);
      }
    })
  }  

};

