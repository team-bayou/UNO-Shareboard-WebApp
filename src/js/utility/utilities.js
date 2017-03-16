const cookie = require('react-cookie');
const encryption = require('./encryption');
const constants = require('./constants');
const validator = require('validator');
const api = require('./api');

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
      return {
        isValid: false,
        number: null
      };
    }
  },

  prettifyPhone: function(num) {
    const phone = this.validatePhone(num);

    if (!phone.isValid)
      return null;

    const number = phone.number.toString();
    if (number.length === 11) {
      const country = number.charAt(0);
      const area = number.slice(1, 4);
      const firstThree = number.slice(4, 7);
      const lastFour = number.slice(7);

      return "+" + country + " (" + area + ") " + firstThree + "-" + lastFour;
    }
    else if (number.length === 10) {
      const area = number.slice(0, 3);
      const firstThree = number.slice(3, 6);
      const lastFour = number.slice(6);

      return "(" + area + ") " + firstThree + "-" + lastFour;
    }
    else {
      return number;
    }

  },

  // replace <, >, &, ', " and / with HTML entities
  sanitizeInput: function(input) {
    let output = validator.escape(input);
    return output;
  },

  // replace <, >, &, ', " and / with HTML entities
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

    if (type === "email") {
      user = this.cleanUnoEmail(user);

      api.checkForVerifiedEmail(user, function(exists, response) {
        if (exists) {
          const currentHash = encryption.createHash(pass, response.data.passwordSalt).hash;
          api.attemptLogin(user, currentHash, type, function(success) {
            callback(true, success, false);
          });
        }
        else {
          api.checkForUnverifiedEmail(user, function(exists) {
            if (exists) {
              callback(true, true, true);
            }
            else {
              callback(false, false, false);
            }
          });
        }
      });
    }
    else {
      api.checkForExistingUsername(user, function(exists, response) {
        if (exists) {
          const currentHash = encryption.createHash(pass, response.data.passwordSalt).hash;
          api.attemptLogin(user, currentHash, type, function(success) {
            callback(true, success, false);
          });
        }
        else {
          callback(false, false, false);
        }
      });
    }
  },

  // Check if the provided email is already associated
  //   with an existing account
  checkForExistingEmail: function(email, callback) {
    if (this.validateEmail(email)) {
      email = this.cleanUnoEmail(email);
    }
    else {
      callback(false);
      return;
    }

    api.checkForVerifiedEmail(email, function(exists, response) {
      if (exists) {
        callback(true, response);
      }
      else {
        api.checkForUnverifiedEmail(email, function(exists) {
          callback(exists, response, true);
        });
      }
    });
  },

  // Check if the provided username is already
  //   associated with an existing account
  checkForExistingUsername: function(username, callback) {
    api.checkForExistingUsername(username, function(exists, response) {
      callback(exists, response);
    });
  },

  checkForUnverifiedEmail: function(email, callback) {
    if (this.validateEmail(email)) {
      email = this.cleanUnoEmail(email);
    }
    else {
      callback(false);
      return;
    }

    api.checkForUnverifiedEmail(email, function(exists) {
      callback(exists);
    });
  },

  getUserByID: function(id, callback) {
    api.getUserByID(id, function(success, response) {
      callback(success, response);
    });
  },

  // Perform the registration operation by adding the user to the
  //   unverified users table
  performRegistration: function(email, pass, callback) {
    email = this.cleanUnoEmail(email);

    const code = this.generateRandomNumber(9);
    const hashingResult = encryption.createHash(pass);

    api.addUnverifiedUser(email, hashingResult, code, function(success) {
      callback(success);
    });
  },

  // Attempt to perform user verification by sending the user-entered
  //   info to the back-end and receiving a response stating whether
  //   or not the request was successful
  performVerification: function(info, callback) {
    const email = this.cleanUnoEmail(info.email);

    api.checkForUnverifiedEmail(email, function(exists, response) {
      if (exists) {
        const currentHash = encryption.createHash(info.password, response.data.passwordSalt).hash;
        const user = {
          email: email,
          enteredVerificationCode: parseInt(info.verificationCode, 10),
          enteredPasswordHash: currentHash,
          accountName: info.username,
          firstName: info.firstname,
          lastName: info.lastname,
          phoneNumber: this.validatePhone(info.phone).number,
          userType: "standard"
        };
        api.attemptVerification(user, function(passCorrect, codeCorrect) {
          callback(passCorrect, codeCorrect);
        });
      }
      else {
        callback(false);
      }
    }.bind(this));
  },

  verifyAdmin: function(callback) {
    this.verifyLoggedIn(cookie.load(constants.COOKIE_A), function(loggedIn, response) {
      if (!loggedIn)
        callback(false, false);
      else if (response.data.userType !== "admin")
        callback(true, false);
      else
        callback(true, true);
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

    if (type === "email") {
      api.checkForVerifiedEmail(user, function(success, response) {
        if (success) {
          const data = response.data;

          cookie.save(constants.COOKIE_A, data.id, { path: '/', maxAge: 60 * 60 * 24 * 7 });

          let valueToStore = encryption.createHash(data.email, data.passwordSalt);
          cookie.save(constants.COOKIE_B, valueToStore.hash, { path: '/', maxAge: 60 * 60 * 24 * 7 });

          valueToStore = encryption.createHash(data.passwordSalt, data.passwordSalt);
          cookie.save(constants.COOKIE_C, valueToStore.hash, { path: '/', maxAge: 60 * 60 * 24 * 7 });

          callback();
        }
      });
    }
    else {
      api.checkForExistingUsername(user, function(success, response) {
        if (success) {
          const data = response.data;

          cookie.save(constants.COOKIE_A, data.id, { path: '/', maxAge: 60 * 60 * 24 * 7 });

          let valueToStore = encryption.createHash(data.email, data.passwordSalt);
          cookie.save(constants.COOKIE_B, valueToStore.hash, { path: '/', maxAge: 60 * 60 * 24 * 7 });

          valueToStore = encryption.createHash(data.passwordSalt, data.passwordSalt);
          cookie.save(constants.COOKIE_C, valueToStore.hash, { path: '/', maxAge: 60 * 60 * 24 * 7 });

          callback();
        }
      });
    }
  },

  verifyCookies: function(targetPath, replace, callback) {
    const userID = cookie.load(constants.COOKIE_A);

    // If we're trying to access a page for guests
    // Requires: to be logged out
    if (targetPath === "/" || targetPath === "verify" || targetPath === "forgotpassword" || targetPath === "resetpassword") {
      if (!userID) {
        this.clearCookies();
        callback();
        return;
      }

      this.verifyLoggedIn(userID, function(loggedIn) {
        if (loggedIn) {
          replace("/home");
          callback();
        }
        else {
          this.clearCookies();
          callback();
        }
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

      this.verifyLoggedIn(userID, function(loggedIn) {
        if (loggedIn) {
          callback();
        }
        else {
          this.clearCookies();
          replace("/");
          callback();
        }
      }.bind(this));
    }
  },

  verifyLoggedIn: function(id, callback) {
    if (!id) {
      callback(false);
      return;
    }

    api.getUserByID(id, function(success, response) {
      if (success) {
        const data = response.data;

        const userHash = encryption.createHash(data.email, data.passwordSalt).hash;
        const saltHash = encryption.createHash(data.passwordSalt, data.passwordSalt).hash;

        if (cookie.load(constants.COOKIE_B) === userHash && cookie.load(constants.COOKIE_C) === saltHash)
          callback(true, response);
        else
          callback(false, response);
      }
      else
        callback(false, response);
    });
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

  getPrice: function(ad){
    if (ad.price)
      return '$ ' + ad.price;
    return 'Free';
  },

  getDateTime: function(ad){
    var t = new Date(ad.timePublished);
    return t.toLocaleDateString();
  },

  updateCategories: function(updates, callback) {
    let counter = 0;

    var cb = function(success, response) {
      if (success) {
        counter++;
        if (counter === updates.length)
          callback(true, response);
      }
      else {
        callback(false, response);
      }
    };

    for (var i = 0; i < updates.length; i++) {
      const item = updates[i];
      let data = {
        id: item.id,
        [item.element]: item.value
      };

      api.updateCategory(data, cb);
    }

  },

  //======================//
  //        OTHERS        //
  //======================//
  getNumberOfPages(size) {
    return size / constants.MAX_RESULTS + (size % constants.MAX_RESULTS === 0 ? 0 : 1)
  }
}
