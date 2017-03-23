/* eslint-disable */

const cookie = require('react-cookie');
const axios = require('axios');
const constants = require('./constants');
const encryption = require('./encryption');
import utils from './utilities';


/*
 * Our GET methods all use the exact same call, except the endpoint that is being hit.
 * This method takes care of the call for us and simply requires that
 *   we give it the endpoint we want to check, as well as the callback
 */
function performGet(endpoint, callback) {
  axios.get(endpoint)
  .then(function (response) {
    callback(response.status === constants.RESPONSE_OK, response);
  })
  .catch(function (error) {
    callback(false, error);
  });
}

function performPost(endpoint, data, callback) {
  axios.post(endpoint, data)
  .then(function (response) {
    callback(response.status === constants.RESPONSE_OK, response);
  })
  .catch(function (error) {
    callback(false, error);
  });
}

function performDelete(endpoint, callback) {
  axios.delete(endpoint)
  .then(function (response) {
    callback(response.status === constants.RESPONSE_OK ||
      response.status === constants.RESPONSE_NO_CONTENT, response);
  })
  .catch(function (error) {
    callback(false, error);
  });
}

function performPut(endpoint, data, callback) {
  axios.put(endpoint, data)
  .then(function (response) {
    callback(response.status === constants.RESPONSE_OK, response);
  })
  .catch(function (error) {
    callback(false, error);
  });
}


module.exports = {

  //======================//
  //      CATEGORIES      //
  //======================//
  getCategories: function(callback) {
    performGet(constants.HOST + '/service/v1/categories', callback);
  },

  addCategory: function(data, callback) {
    performPost(constants.HOST + '/service/v1/categories/add', {
      title: data.title,
      color: data.color,
      description: data.description,
    }, callback);
  },

  deleteCategory: function(id, callback) {
    performDelete(constants.HOST + '/service/v1/categories/' + id + '/delete', callback);
  },


  //======================//
  //    ADVERTISEMENTS    //
  //======================//
  getAdvertisements: function(callback) {
    performGet(constants.HOST + '/service/v1/advertisements', callback);
  },

  getUserAdvertisements: function(id, callback) {
    performGet(constants.HOST + '/service/v1/advertisements/users/' + id, callback);
  },

  getCategoryAdvertisements: function(id, callback) {
    performGet(constants.HOST + '/service/v1/advertisements/categories/' + id, callback);
  },

  getAdvertisement: function(id, callback) {
    performGet(constants.HOST + '/service/v1/advertisements/' + id, callback);
  },

  addAdvertisement: function(data, callback) {
    performPost(constants.HOST + '/service/v1/advertisements/add', {
      title: data.title,
      description: data.description,
      categoryId: data.category,
      ownerId: data.owner,
      timePublished: data.timePublished,
      expirationDate: data.expirationDate,
      adType: data.adType,
      price: data.price,
      tradeItem: data.tradeItem
    }, callback);
  },


  //======================//
  //     USER ACCOUNT     //
  //======================//

  checkForVerifiedEmail: function(email, callback) {
    performGet(constants.HOST + '/service/v1/users/email/' + email + '/', callback);
  },

  checkForUnverifiedEmail: function(email, callback) {
    performGet(constants.HOST + '/service/v1/unverified_users/email/' + email + '/', callback);
  },

  checkForExistingUsername: function(username, callback) {
    performGet(constants.HOST + '/service/v1/users/accountName/' + username + '/', callback);
  },

  getUserByID: function(id, callback) {
    performGet(constants.HOST + '/service/v1/users/' + id + '/', callback);
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
        const success = response.status === constants.RESPONSE_OK;
        callback(success, success);
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

  updateUser: function(data, callback) {
    performPut(constants.HOST + '/service/v1/users/update', data, callback);
  },

  deleteUser: function(id, callback) {
    performDelete(constants.HOST + '/service/v1/users/' + id + '/delete', callback);
  }

}
