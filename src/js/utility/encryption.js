var crypto = require('crypto');
var axios = require('axios');

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

  checkAccount: function(email, pass, callback) {
    // this will be get user by email
    axios.get('https://uno-shareboard-dev.herokuapp.com/service/v1/users/1')
      .then(function (response) {
        const data = response.data;
        console.log(data);

        const output = this.createHash(pass, data.salt);
        const passwordCorrect = data.hash === output.hash;

        callback(true, passwordCorrect);
      }.bind(this))
      .catch(function (error) {
        console.log(error);
        callback(false, false);
      });
  }

}
