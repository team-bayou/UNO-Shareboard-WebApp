var crypto = require('crypto');
var axios = require('axios');
var constants = require('./constants');

module.exports = {

  generateSalt: function(length) {
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length);
  },

  sha512: function(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
  },

  createHash: function(pass, salt) {
    if (!salt) salt = this.generateSalt(64);
    return {
      salt: salt,
      hash: this.sha512(pass, salt)
    };
  },

  checkAccount: function(user, pass, callback) {
    // I don't know why, but the validateEmail call fails if I import utilities
    //   outside of this method
    const utilities = require('./utilities');
    const type = utilities.validateEmail(user) ? "email" : "accountName";

    axios.post(constants.HOST + '/service/v1/login', {
      [type]: user
    })
    .then(function (response) {
      const data = response.data;
      const output = this.createHash(pass, data.passwordSalt);
      const passwordCorrect = data.passwordHash === output.hash;

      callback(true, passwordCorrect);
    }.bind(this))
    .catch(function (error) {
      console.log(error);
      callback(false, false);
    });
  }

}
