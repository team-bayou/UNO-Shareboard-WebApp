const cookie = require('react-cookie');
const encryption = require('./encryption');

module.exports = {

  validateEmail: function(email) {
    // eslint-disable-next-line
    const re = /^[A-z0-9_%+-]+.*[A-z0-9_%+-]+@(my.)?uno.edu$/;
    return re.test(email);
  },

  // When the user successfully logs in, we create cookies that will
  //   keep the user logged in.
  // a: raw username
  // b: hash created from username + salt
  // c: hash created from salt + salt
  // "user" is the username of the user being logged in
  bakeCookies: function(user) {
    cookie.save("a", user, { path: '/', maxAge: 60 * 60 * 24 * 7 });

    // the salt below is an example salt
    // the actual salt will be grabbed from the provided user account
    let salt = "7dh36teg5dh789697dh36teg5dh789697dh36teg5dh789697dh36teg5dh78969";

    let valueToStore = encryption.createHash(user, salt);
    cookie.save("b", valueToStore.hash, { path: '/', maxAge: 60 * 60 * 24 * 7 });

    valueToStore = encryption.createHash(salt, salt);
    cookie.save("c", valueToStore.hash, { path: '/', maxAge: 60 * 60 * 24 * 7 });
  },

  /*
   * This method will try to load cookie "a."
   * If cookie "a" doesn't exist, the user is not logged in.
   * If cookie "a" does exist, we ask the back-end for the associated
   *   salt and create hashes from the username and salt.
   * If they match the hashes in cookies "b" and "c," respectively,
   *   then the user is logged into a valid account.
   * If "b" or "c" doesn't exist, the user is not logged in.
   * If "b" and "c" do exist, but the created hashes don't match
   *   "b" or "c," then the user is not validly logged in.
   */
  verifyCookies: function(user) {
    //const verified = !cookie.load("a") || !cookie.load("b") || !cookie.load("c");
    //const verified = cookie.load("a") && cookie.load("b") && cookie.load("c");

    // First thing we check is to make sure all three cookies exist and have values
    if (!cookie.load("a") || !cookie.load("b") || !cookie.load("c"))
      return false;
  }

}
