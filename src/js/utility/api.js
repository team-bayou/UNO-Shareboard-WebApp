/* eslint-disable */

const cookie = require('react-cookie');
const axios = require('axios');
const constants = require('./constants');
const encryption = require('./encryption');
import utils from './utilities';


const config = {
  auth: {
    username: process.env.REACT_APP_AUTH_USERNAME,
    password: process.env.REACT_APP_AUTH_PASSWORD
  }
}

/*
 * Our GET methods all use the exact same call, except the endpoint that is being hit.
 * This method takes care of the call for us and simply requires that
 *   we give it the endpoint we want to check, as well as the callback
 */
function performGet(endpoint, callback) {
  axios.get(endpoint, config)
  .then(function (response) {
    callback(response.status === constants.RESPONSE_OK, response);
  })
  .catch(function (error) {
    callback(false, error);
  });
}

function performPost(endpoint, data, callback) {
  axios.post(endpoint, data, config)
  .then(function (response) {
    callback(response.status === constants.RESPONSE_OK, response);
  })
  .catch(function (error) {
    callback(false, error);
  });
}

function performDelete(endpoint, callback) {
  axios.delete(endpoint, config)
  .then(function (response) {
    callback(response.status === constants.RESPONSE_OK ||
      response.status === constants.RESPONSE_NO_CONTENT, response);
  })
  .catch(function (error) {
    callback(false, error);
  });
}

function performPut(endpoint, data, callback) {
  axios.put(endpoint, data, config)
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

  updateCategory: function(data, callback) {
    performPut(constants.HOST + '/service/v1/categories/update', data, callback);
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

  getAdvertisementsByPage: function(page, callback) {
    performGet(constants.HOST + '/service/v1/advertisements/page/' + page, callback);
  },

  getUserAdvertisements: function(id, callback) {
    performGet(constants.HOST + '/service/v1/advertisements/users/' + id, callback);
  },

  getUserAdvertisementsByPage: function(id, page, callback) {
    performGet(constants.HOST + '/service/v1/advertisements/users/' + id + '/page/' + page, callback);
  },

  getCategoryAdvertisements: function(id, callback) {
    performGet(constants.HOST + '/service/v1/advertisements/categories/' + id, callback);
  },

  getCategoryAdvertisementsByPage: function(id, page, callback) {
    performGet(constants.HOST + '/service/v1/advertisements/categories/' + id + '/page/' + page, callback);
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

  updateAdvertisement: function(data, callback) {
    performPut(constants.HOST + '/service/v1/advertisements/update', {
      id: data.id,
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
  //       REVIEWS        //
  //======================//
  getReviewerReviews: function(id, callback) {
    performGet(constants.HOST + '/service/v1/reviews/reviewer/' + id, callback);
  },

  getReviewerReviewsByPage: function(id, page, callback) {
    performGet(constants.HOST + '/service/v1/reviews/reviewer/' + id + '/page/' + page, callback);
  },

  getRevieweeReviews: function(id, callback) {
    performGet(constants.HOST + '/service/v1/reviews/reviewee/' + id, callback);
  },

  getRevieweeReviewsByPage: function(id, page, callback) {
    performGet(constants.HOST + '/service/v1/reviews/reviewee/' + id + '/page/' + page, callback);
  },

  getReview: function(id, callback) {
    performGet(constants.HOST + '/service/v1/reviews/' + id, callback);
  },

  addReview: function(data, callback) {
    performPost(constants.HOST + '/service/v1/reviews/add', {
      rating: data.rating,
      comments: data.comments,
      //timePublished: data.timePublished,
      reviewerId: data.reviewer,
      revieweeId: data.reviewee
    }, callback);
  },

  updateReview: function(data, callback) {
    performPut(constants.HOST + '/service/v1/reviews/update', {
      id: data.id,
      rating: data.rating,
      comments: data.comments,
      //timePublished: data.timePublished,
      reviewerId: data.reviewer,
      revieweeId: data.reviewee
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
    performPost(constants.HOST + '/service/v1/auth/login/', {
      [type]: user,
      enteredPasswordHash: hash
    }, callback);
  },

  addUnverifiedUser: function(email, pass, code, callback) {
    performPost(constants.HOST + '/service/v1/unverified_users/add/', {
        passwordHash: pass.hash,
        passwordSalt: pass.salt,
        email: email,
        verificationCode: code
      }, callback);
  },

  attemptVerification: function(user, callback) {
    performPost(constants.HOST + '/service/v1/auth/verify/', user, function(success, response) {
      if (success) {
        callback(true, true);
      }

      // I know `response.response` looks weird, but that's because in this case,
      // `response` is an error, and an error has its own response member that
      // we have to access to get its containing data
      else {
        if (response.response.status === constants.RESPONSE_UNAUTHORIZED) {
          if (response.response.data.errorMessage === "password") {
            callback(false, true);
          }
          else if (response.response.data.errorMessage === "verify") {
            callback(true, false);
          }
          else if (response.response.data.errorMessage === "both") {
            callback(false, false);
          }
        }
        else {
          callback(false, false);
        }
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
