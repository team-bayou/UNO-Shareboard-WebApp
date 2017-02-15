const cookie = require('react-cookie');
const encryption = require('./encryption');

module.exports = {

  validateEmail: function(email) {
    // eslint-disable-next-line
    const re = /^[A-z0-9_%+-]+.*[A-z0-9_%+-]+@(my.)?uno.edu$/;
    return re.test(email);
  },

  // a: raw username
  // b: hash created from username + salt
  // c: hash created from salt + salt
  bakeCookies: function(value) {
    cookie.save("a", value);

    let salt = "7dh36teg5dh789697dh36teg5dh789697dh36teg5dh789697dh36teg5dh78969";

    let valueToStore = encryption.createHash(value, salt);
    cookie.save("b", valueToStore.hash);

    valueToStore = encryption.createHash(salt, salt);
    cookie.save("c", valueToStore.hash);
  }

  /*
  Ideas for cookie storage:
    store the username and salt of the currently logged in user,
    potentially make a hash of the salt and username using the user's own
    password salt and store those

    so:
    username: <username>
    salt: <user's existing salt>
    username hash: <hash created out of username + salt>
    salt hash: <hash created out of salt + salt>

    maybe we don't store the salt, but just the username and two hashes
    and then get the salt of the stored username to do the comparisons
  */

}
