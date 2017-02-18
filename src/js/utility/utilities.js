const cookie = require('react-cookie');
const encryption = require('./encryption');
const axios = require('axios');

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
  bakeCookies: function(user, callback) {
    cookie.save("a", user, { path: '/', maxAge: 60 * 60 * 24 * 7 });

    const type = this.validateEmail(user) ? "email" : "accountName";

    axios.post('https://uno-shareboard-dev.herokuapp.com/service/v1/login', {
      [type]: user
    })
    .then(function (response) {
      const data = response.data;

      let valueToStore = encryption.createHash(user, data.passwordSalt);
      cookie.save("b", valueToStore.hash, { path: '/', maxAge: 60 * 60 * 24 * 7 });

      valueToStore = encryption.createHash(data.passwordSalt, data.passwordSalt);
      cookie.save("c", valueToStore.hash, { path: '/', maxAge: 60 * 60 * 24 * 7 });

      callback();
    })
    .catch(function (error) {
      console.log(error);
    });
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
  verifyCookies: function(user, targetPath, replace, callback) {
    const type = this.validateEmail(user) ? "email" : "accountName";

    // If we're trying to access the login page or verify account page
    // Requires: to be logged out
    if (targetPath === "/" || targetPath === "verify") {
      if (!user) {
        callback();
        return;
      }

      axios.post('https://uno-shareboard-dev.herokuapp.com/service/v1/login', {
        [type]: user
      })
      .then(function (response) {
        const data = response.data;

        const userHash = encryption.createHash(user, data.passwordSalt);
        const saltHash = encryption.createHash(data.passwordSalt, data.passwordSalt);

        if (cookie.load("b") === userHash.hash && cookie.load("c") === saltHash.hash) {
          replace("home");
          callback();
        }
        else {
          this.clearCookies();
          callback();
        }
      })
      .catch(function (error) {
        console.log(error);
        this.clearCookies();
        replace("/");
        callback();
      }.bind(this));

    }

    // If we're trying to access any other page on the site
    // Requires: to be logged in
    else {
      if (!this.allCookiesExist()) {
        this.clearCookies();
        replace("/");
        callback();
        return;
      }

      axios.post('https://uno-shareboard-dev.herokuapp.com/service/v1/login', {
        [type]: user
      })
      .then(function (response) {
        const data = response.data;

        const userHash = encryption.createHash(user, data.passwordSalt);
        const saltHash = encryption.createHash(data.passwordSalt, data.passwordSalt);

        if (cookie.load("b") !== userHash.hash || cookie.load("c") !== saltHash.hash) {
          this.clearCookies();
          replace("/");
        }
        callback();
      }.bind(this))
      .catch(function (error) {
        console.log(error);
        this.clearCookies();
        replace("/");
        callback();
      }.bind(this));
    }
  },

  clearCookies: function() {
    if (cookie.load("a"))
      cookie.remove("a");
    if (cookie.load("b"))
      cookie.remove("b");
    if (cookie.load("c"))
      cookie.remove("c");
  },

  allCookiesExist: function() {
    // These return values and how you use them are pretty fragile,
    //   so I'm gonna be verbose for the sake of accuracy.
    if (!cookie.load("a") || !cookie.load("b") || !cookie.load("c"))
      return false;
    return true;
  },

  getCookie: function(c) {
    return cookie.load(c);
  }

}
