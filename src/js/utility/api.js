/* eslint-disable */

const cookie = require('react-cookie');
const axios = require('axios');
const constants = require('./constants');
const encryption = require('./encryption');
import utils from './utilities';


/*
 * Our three "checkForX" methods all used the exact same call,
 *   but only changed the endpoint that was being hit.
 * This method takes care of the call for us and simply requires that
 *   we give it the endpoint we want to check, as well as the callback
 */
function performCheckGet(endpoint, callback) {
  axios.get(endpoint)
  .then(function (response) {
    callback(response.status === constants.RESPONSE_OK, response);
  })
  .catch(function (error) {
    callback(false);
  });
}


module.exports = {

  //======================//
  //      CATEGORIES      //
  //======================//
  getCategories: function(callback) {
    axios.get(constants.HOST + '/service/v1/categories')
      .then(function (response) {
        if (response.status === constants.RESPONSE_OK) {
          callback(response.data);
        }
        else {
          callback(null);
        }
    });
  },

  //======================//
  //    ADVERTISEMENTS    //
  //======================//
  getAdvertisements: function(callback) {
    axios.get(constants.HOST + '/service/v1/advertisements')
      .then(function (response) {
        if (response.status === constants.RESPONSE_OK) {
          callback(response.data);
        }
        else {
          callback(null);
        }
    });
  },

  getUserAdvertisements: function(id, callback) {
    axios.get(constants.HOST + '/service/v1/advertisements/users/' + id)
      .then(function (response) {
        if (response.status === constants.RESPONSE_OK) {
          callback(response.data);
        }
        else {
          callback(null);
        }
    });
  },

  getAdvertisement: function(id, callback) {
    axios.get(constants.HOST + '/service/v1/advertisements/' + id)
      .then(function (response) {
        if (response.status === constants.RESPONSE_OK) {
          callback(response.data);
        }
        else {
          callback(null);
        }
    });
  },

  addAdvertisement: function(data, callback) {
    axios.post(constants.HOST + '/service/v1/advertisements/add', {
      title: data.title,
      description: data.description,
      categoryId: data.category,
      ownerId: data.owner,
      timePublished: data.timePublished,
      expirationDate: data.expirationDate,
      adType: data.adType,
      price: data.price,
      tradeItem: data.tradeItem
    })
    .then(function (response) {
      if (response.status === constants.RESPONSE_OK) {
        callback(response.data);
      }
      else {
        callback(null);
      }
    });
  },


  //======================//
  //     USER ACCOUNT     //
  //======================//

  checkForVerifiedEmail: function(email, callback) {
    performCheckGet(constants.HOST + '/service/v1/users/email/' + email + '/', callback);
  },

  checkForUnverifiedEmail: function(email, callback) {
    performCheckGet(constants.HOST + '/service/v1/unverified_users/email/' + email + '/', callback);
  },

  checkForExistingUsername: function(username, callback) {
    performCheckGet(constants.HOST + '/service/v1/users/accountName/' + username + '/', callback);
  },

  attemptLogin: function(user, hash, type, callback) {
    axios.post(constants.HOST + '/service/v1/auth/login/', {
      [type]: user,
      enteredPasswordHash: hash
    })
    .then(function (response) {
      callback(response.status === constants.RESPONSE_OK);
    })
    .catch(function (error) {
      callback(false);
    });
  },

  addUnverifiedUser: function(email, pass, code, callback) {
    axios.post(constants.HOST + '/service/v1/unverified_users/add/', {
        passwordHash: pass.hash,
        passwordSalt: pass.salt,
        email: email,
        verificationCode: code
      })
      .then(function (response) {
        callback(response.status === constants.RESPONSE_OK);
      })
      .catch(function (error) {
        callback(false);
      });
  },

  attemptVerification: function(user, callback) {
    axios.post(constants.HOST + '/service/v1/auth/verify/', user)
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
  },


  //=================//
  //     COOKIES     //
  //=================//

}
