var crypto = require('crypto');
var axios = require('axios');

function afterAccountCheck(data) {
  console.log(data);


/*
  const output = this.createHash(pass, salt);

  const emailExists = email in accounts;
  let passwordCorrect = false;
  if (emailExists)
    passwordCorrect = accounts[email] === output.hash;

  return {
    emailExists: emailExists,
    loginSuccessful: passwordCorrect
  };
  */
}

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
    /*
    TODO:
    What will actually happen at this part is as follows:
    We will send the provided email to the server and see if it is
      in the database.
    If it is not, we throw an error and tell the user.
    If it is, we ask for the associated salt and hash.
    Then we take the password that the user entered
      and mix it with the salt stored in the database.
    If the resulting hash matches the hash stored in
      the database, then the user entered the correct password.
    */

    axios.get('http://localhost:8090/service/v1/users/1')
      .then(function (response) {
        //console.log(response);
        return afterAccountCheck(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}
