var crypto = require('crypto');

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

  checkAccount: function(email, pass) {

    // the following "accounts" and "salt" are for testing purposes
    const accounts = {
      "myemail@uno.edu":"da4ff5e9fb1c6e7f29b616e00708c1781950a331724fba177dd8195a5f1dcc469a796c62b54901d05034a5427040e179d0ab1d1430fe3ddb808f3133c41c8e32"  // "mypass"
    };
    const salt = "7dh36teg5dh789697dh36teg5dh789697dh36teg5dh789697dh36teg5dh78969"; // salt used to generate the hash for the password "mypass"
    
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

    const output = this.createHash(pass, salt);

    const emailExists = email in accounts;
    let passwordCorrect = false;
    if (emailExists)
      passwordCorrect = accounts[email] === output.hash;

    return {
      emailExists: emailExists,
      loginSuccessful: passwordCorrect
    };
  }

}
