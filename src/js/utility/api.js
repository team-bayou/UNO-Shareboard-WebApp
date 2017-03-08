/* eslint-disable */

const cookie = require('react-cookie');
const axios = require('axios');
const constants = require('./constants');
const encryption = require('./encryption');
import utils from './utilities';

module.exports = {

  //======================//
  //      CATEGORIES      //
  //======================//
  getCategories: function(callback){
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
  getAdvertisements: function(callback){
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

  getUserAdvertisements: function(id, callback){
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

  getAdvertisement: function(id, callback){
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

  addAdvertisement: function(data, callback){
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
    axios.get(constants.HOST + '/service/v1/users/email/' + email + '/')
    .then(function (response) {
      callback(response.status === constants.RESPONSE_OK);
    })
    .catch(function (error) {
      callback(false);
    });
  },

  checkForUnverifiedEmail: function(email, callback) {
    axios.get(constants.HOST + '/service/v1/unverified_users/email/' + email + '/')
    .then(function (response) {
      callback(response.status === constants.RESPONSE_OK, response);
    })
    .catch(function (error) {
      callback(false);
    });
  },

  checkForExistingUsername: function(username, callback) {
    axios.get(constants.HOST + '/service/v1/users/accountName/' + username + '/')
    .then(function (response) {
      callback(response.status === constants.RESPONSE_OK);
    })
    .catch(function (error) {
      callback(false);
    });
  },

  attemptLogin: function() {

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

}
