const cookie = require('react-cookie');
const encryption = require('./encryption');
const axios = require('axios');
const constants = require('./constants');
const validator = require('validator');

module.exports = {


  //======================//
  //      GENERATORS      //
  //======================//

  generateRandomNumber: function(len) {
    let code = "";
    for (let i = 0; i < len; i++) {
      let n = Math.floor(Math.random() * 9) + 1;
      code += n + "";
    }
    return parseInt(code, 10);
  },


  //======================//
  //      VALIDATION      //
  //======================//

  validateEmail: function(email) {
    // eslint-disable-next-line
    const re = /^[A-z0-9_%+-]+.*[A-z0-9_%+-]+@(my.)?uno.edu$/;
    return re.test(email);
  },

  validatePhone: function(number) {
    try {
      const stripped = validator.blacklist(number, '-(). ');
      return {
        isValid: validator.isMobilePhone(stripped, 'en-US'),
        number: stripped
      };
    }
    catch (err) {
      return false;
    }
  },

  // Escapes any entered HTML characters
  sanitizeInput: function(input) {
    let output = validator.escape(input);
    return output;
  },

  // Escapes any entered HTML characters
  //   and removes all whitespace from the string
  sanitizeInputSpacing: function(input) {
    let output = validator.escape(input);
    output = validator.trim(output);
    output = validator.blacklist(output, " ");
    return output;
  },

  cleanUnoEmail: function(email) {
    let name = email.slice(0, email.indexOf("@"));
    return name + "@uno.edu";
  },


  //=======================//
  //   REQUEST UTILITIES   //
  //=======================//

  // Attempt to login a user by searching through the existing accounts
  checkAccount: function(user, pass, callback) {
    const type = this.validateEmail(user) ? "email" : "accountName";
    if (type === "email")
      user = this.cleanUnoEmail(user);

    axios.get(constants.HOST + '/service/v1/users/' + type + '/' + user + '/')
    .then(function (response) {
      const data = response.data;
      const status = response.status;

      // If the user was found by email / accountName
      if (status === constants.RESPONSE_OK) {
        const currentHash = encryption.createHash(pass, data.passwordSalt).hash;

        // Try to log the user in using the provided info
        axios.post(constants.HOST + '/service/v1/auth/login/', {
          [type]: user,
          enteredPasswordHash: currentHash
        })
        .then(function (response) {
          if (status === constants.RESPONSE_OK) {
            callback(true, true);
          }
          else {
            callback(false, false);
          }
        })
        .catch(function (error) {
          if (error.response.status === constants.RESPONSE_UNAUTHORIZED) {
            callback(true, false);
          }
          else {
            callback(false, false);
          }
        });
      }

      // If the user was not found in the verified users table
      else {

        // If the user tried logging in with an email and it wasn't found in
        //   the verified users table, check the unverified users table
        if (type === "email") {
          axios.get(constants.HOST + '/service/v1/unverified_users/email/' + user + '/')
          .then(function (response) {
            if (response.status === constants.RESPONSE_OK) {
              // The user may or may not have actually logged in successfully,
              //   but it doesn't matter since we're not going to actually
              //   allow them to log in, so just inform them that they are unverified
              callback(true, true, true);
            }
            else {
              callback(false, false);
            }
          })
          .catch(function (error) {
            callback(false, false);
          });
        }

        // If they didn't log in with an email, then we know they aren't
        //   an unverified user
        else {
          callback(false, false);
        }

      }
    })
    .catch(function (error) {
      callback(false, false);
    });
  },

  // Check if the provided email is already associated
  //   with an existing account
  checkForExistingEmail: function(email, callback) {
    email = this.cleanUnoEmail(email);

    // First we check the active users.
    axios.get(constants.HOST + '/service/v1/users/email/' + email + '/')
    .then(function (response) {
      if (response.status === constants.RESPONSE_OK) {
        callback(true);
      }
      else {
        // If the email wasn't found in the active users table, we check
        //   the unverified users to see if an email was used to sign up
        //   but hasn't been verified yet.
        axios.get(constants.HOST + '/service/v1/unverified_users/email/' + email + '/')
        .then(function (response) {
          if (response.status === constants.RESPONSE_OK) {
            callback(true);
          }
          else {
            callback(false);
          }
        })
        .catch(function (error) {
          callback(false);
        });
      }
    })
    .catch(function (error) {
      callback(false);
    });
  },

  // Check if the provided username is already
  //   associated with an existing account
  checkForExistingUsername: function(username, callback) {
    axios.get(constants.HOST + '/service/v1/users/accountName/' + username + '/')
    .then(function (response) {
      if (response.status === constants.RESPONSE_OK) {
        callback(true);
      }
      else {
        callback(false);
      }
    })
    .catch(function (error) {
      callback(false);
    });
  },

  checkForUnverifiedEmail: function(email, callback) {
    email = this.cleanUnoEmail(email);

    axios.get(constants.HOST + '/service/v1/unverified_users/email/' + email + '/')
    .then(function (response) {
      if (response.status === constants.RESPONSE_OK) {
        callback(true);
      }
      else {
        callback(false);
      }
    })
    .catch(function (error) {
      callback(false);
    });
  },

  // Perform the registration operation by adding the user to the
  //   unverified users table
  performRegistration: function(email, pass, callback) {
    const code = this.generateRandomNumber(9);
    const hashingResult = encryption.createHash(pass);

    email = this.cleanUnoEmail(email);

    axios.post(constants.HOST + '/service/v1/unverified_users/add/', {
        passwordHash: hashingResult.hash,
        passwordSalt: hashingResult.salt,
        email: email,
        verificationCode: code
      })
      .then(function (response) {
        if (response.status === constants.RESPONSE_OK) {
          callback(true);
        }
        else {
          callback(false);
        }
      })
      .catch(function (error) {
        callback(false);
      });
  },

  // Attempt to perform user verification by sending the user-entered
  //   info to the back-end and receiving a response stating whether
  //   or not the request was successful
  performVerification: function(info, callback) {
    const email = this.cleanUnoEmail(info.email);

    axios.get(constants.HOST + '/service/v1/unverified_users/email/' + email + '/')
    .then(function (response) {
      // There's no reason that this should ever not be 200 OK
      if (response.status === constants.RESPONSE_OK) {
        const data = response.data;
        const currentHash = encryption.createHash(info.password, data.passwordSalt).hash;

        const usr = {
          email: email,
          enteredVerificationCode: parseInt(info.verificationCode, 10),
          enteredPasswordHash: currentHash,
          accountName: info.username,
          firstName: info.firstname,
          lastName: info.lastname,
          phoneNumber: this.validatePhone(info.phone).number,
          userType: "standard"
        };
        axios.post(constants.HOST + '/service/v1/auth/verify/', usr)
          .then(function (response) {
            if (response.status === constants.RESPONSE_OK) {
              callback(true, true);
            }
            else {
              callback(false, false);
            }
          })
          .catch(function (error) {
            if (error.response.status === constants.RESPONSE_UNAUTHORIZED) {
              if (error.response.data.errorMessage === "password") {
                callback(false, true);
              }
              else if (error.response.data.errorMessage === "verify") {
                callback(true, false);
              }
              else if (error.response.data.errorMessage === "both") {
                callback(false, false);
              }
            }
            else {
              callback(false, false);
            }
          });
      }
      else {
        callback(false, false);
      }
    }.bind(this))
    .catch(function (error) {
      callback(false, false);
    });

  },


  //======================//
  //   COOKIE UTILITIES   //
  //======================//

  // When the user successfully logs in, we create cookies that will
  //   keep the user logged in.
  // a: user's id
  // b: hash created from username + salt
  // c: hash created from salt + salt
  // "user" is the email or username of the user being logged in
  bakeCookies: function(user, callback) {
    const type = this.validateEmail(user) ? "email" : "accountName";
    if (type === "email")
      user = this.cleanUnoEmail(user);

    axios.get(constants.HOST + '/service/v1/users/' + type + '/' + user + '/')
    .then(function (response) {
      if (response.status === constants.RESPONSE_OK) {
        const data = response.data;

        cookie.save(constants.COOKIE_A, data.id, { path: '/', maxAge: 60 * 60 * 24 * 7 });

        let valueToStore = encryption.createHash(data.email, data.passwordSalt);
        cookie.save(constants.COOKIE_B, valueToStore.hash, { path: '/', maxAge: 60 * 60 * 24 * 7 });

        valueToStore = encryption.createHash(data.passwordSalt, data.passwordSalt);
        cookie.save(constants.COOKIE_C, valueToStore.hash, { path: '/', maxAge: 60 * 60 * 24 * 7 });

        callback();
      }
      else {
        console.log("there was a problem creating cookies:\n\n" + response);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  verifyCookies: function(targetPath, replace, callback) {
    const userID = cookie.load(constants.COOKIE_A);

    // If we're trying to access the login page or verify account page
    // Requires: to be logged out
    if (targetPath === "/" || targetPath === "verify") {
      if (!userID) {
        callback();
        return;
      }

      axios.get(constants.HOST + '/service/v1/users/' + userID + '/')
      .then(function (response) {
        if (response.status === constants.RESPONSE_OK) {
          const data = response.data;

          const userHash = encryption.createHash(data.email, data.passwordSalt);
          const saltHash = encryption.createHash(data.passwordSalt, data.passwordSalt);

          if (cookie.load(constants.COOKIE_B) === userHash.hash && cookie.load(constants.COOKIE_C) === saltHash.hash) {
            replace("/home");
            callback();
          }
          else {
            this.clearCookies();
            callback();
          }
        }
        else {
          this.clearCookies();
          replace("/");
          callback();
        }
      }.bind(this))
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

      axios.get(constants.HOST + '/service/v1/users/' + userID + '/')
      .then(function (response) {
        if (response.status === constants.RESPONSE_OK) {
          const data = response.data;
          const userHash = encryption.createHash(data.email, data.passwordSalt);
          const saltHash = encryption.createHash(data.passwordSalt, data.passwordSalt);
          if (cookie.load(constants.COOKIE_B) !== userHash.hash || cookie.load(constants.COOKIE_C) !== saltHash.hash) {
            this.clearCookies();
            replace("/");
          }
          callback();
        }
        else {
          this.clearCookies();
          replace("/");
          callback();
        }
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
    if (cookie.load(constants.COOKIE_A))
      cookie.remove(constants.COOKIE_A);
    if (cookie.load(constants.COOKIE_B))
      cookie.remove(constants.COOKIE_B);
    if (cookie.load(constants.COOKIE_C))
      cookie.remove(constants.COOKIE_C);
  },

  allCookiesExist: function() {
    // These return values and how you use them are pretty fragile,
    //   so I'm gonna be verbose for the sake of accuracy.
    if (!cookie.load(constants.COOKIE_A) || !cookie.load(constants.COOKIE_B) || !cookie.load(constants.COOKIE_C))
      return false;
    return true;
  },

  getCookie: function(c) {
    return cookie.load(c);
  },

  //======================//
  //    ADVERTISEMENTS    //
  //======================//

  getItem: function(ad){
    if (!ad.price)
      if (!ad.tradeItem)
        return 'Free';
      else
        return ad.tradeItem;
    return '$ ' + ad.price;
  },

  getDateTime: function(ad){
    var t = new Date(ad.timePublished);

    return t.toLocaleString();
  }
}
