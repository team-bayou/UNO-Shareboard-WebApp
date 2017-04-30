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
  getListings: function(callback) {
    performGet(constants.HOST + '/service/v1/listings', callback);
  },

  getListingsByPage: function(page, callback) {
    performGet(constants.HOST + '/service/v1/listings/page/' + page, callback);
  },

  getUserListings: function(id, callback) {
    performGet(constants.HOST + '/service/v1/listings/users/' + id, callback);
  },

  getUserListingsByPage: function(id, page, callback) {
    performGet(constants.HOST + '/service/v1/listings/users/' + id + '/page/' + page, callback);
  },

  getCategoryListings: function(id, callback) {
    performGet(constants.HOST + '/service/v1/listings/categories/' + id, callback);
  },

  getCategoryListingsByPage: function(id, page, callback) {
    performGet(constants.HOST + '/service/v1/listings/categories/' + id + '/page/' + page, callback);
  },

  getAdTypeListings: function(adType, callback) {
    performGet(constants.HOST + '/service/v1/listings/adType/' + adType, callback);
  },

  getAdTypeListingsByPage: function(adType, page, callback) {
    performGet(constants.HOST + '/service/v1/listings/adType/' + adType + '/page/' + page, callback);
  },

  getListing: function(id, callback) {
    performGet(constants.HOST + '/service/v1/listings/' + id, callback);
  },

  addListing: function(data, callback) {
    performPost(constants.HOST + '/service/v1/listings/add', data, callback);
  },

  updateListing: function(data, callback) {
    performPut(constants.HOST + '/service/v1/listings/update', data, callback);
  },

  deleteListing: function(id, callback) {
    performDelete(constants.HOST + '/service/v1/listings/' + id + '/delete', callback);
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
      reviewerId: data.reviewer,
      revieweeId: data.reviewee
    }, callback);
  },

  updateReview: function(data, callback) {
    performPut(constants.HOST + '/service/v1/reviews/update', {
      id: data.id,
      rating: data.rating,
      comments: data.comments,
      reviewerId: data.reviewer,
      revieweeId: data.reviewee
    }, callback);
  },

  deleteReview: function(id, callback) {
    performDelete(constants.HOST + '/service/v1/reviews/' + id + '/delete', callback);
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

  checkForPasswordResetVerifyCode: function(email, callback) {
    performGet(constants.HOST + '/service/v1/users/' + email + '/codeCheck/', callback);
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
    performPost(constants.HOST + '/service/v1/auth/verify/', user, callback);
  },

  updateUser: function(data, callback) {
    performPut(constants.HOST + '/service/v1/users/update', data, callback);
  },

  deleteUser: function(id, callback) {
    performDelete(constants.HOST + '/service/v1/users/' + id + '/delete', callback);
  },

  submitForgotPassword: function(data, callback) {
    performPost(constants.HOST + '/service/v1/auth/forgotPass/', data, callback);
  },

  performPasswordReset: function(data, callback) {
    performPost(constants.HOST + '/service/v1/auth/resetPass/', data, callback);
  },


  //======================//
  //         MISC         //
  //======================//

  submitReport: function(data, callback) {
    performPost(constants.HOST + '/service/v1/reports/submit/', data, callback);
  },

  search: function(data, callback) {
    let endpoint = '/service/v1/listings/search?page=' + data.page + '&title=' + data.title + '&adType=' + data.adType;

    if (!!data.description)
      endpoint = endpoint.concat('&description=' + data.title);
    if (!!data.categoryId)
      endpoint = endpoint.concat('&categoryId=' + data.categoryId);

    performGet(constants.HOST + endpoint, callback);
  },

  sendMassEmail: function(data, callback) {
    performPost(constants.HOST + '/service/v1/users/emailUsers/', data, callback);
  },

  //================//
  //     IMAGES     //
  //================//

  uploadImage: function(data, callback) {
    const config = {
      headers: {
        'Content-Type': data.get("image_data").type
      },
      auth: {
        username: process.env.REACT_APP_AUTH_USERNAME,
        password: process.env.REACT_APP_AUTH_PASSWORD
      }
    };

    axios.post(constants.HOST + "/service/v1/images/upload/", data, config)
    .then(function (response) {
      if (response.status === constants.RESPONSE_OK) {
        callback(true, response);
      }
      else {
        callback(false, response);
      }
    })
    .catch(function (error) {
      callback(false, error);
    });
  },

  getImageByID: function(id, callback) {
    performGet(constants.HOST + '/service/v1/images/get/' + id + '/', callback);
  },

  getImageDataByID: function(id, callback) {
    performGet(constants.HOST + '/service/v1/images/' + id + '/info/', callback);
  },

  addImageToListing: function(listingID, imgID, callback) {
    performPut(constants.HOST + '/service/v1/listings/addImage/' + listingID + '/' + imgID + '/', {}, callback);
  },

  removeImageFromListing: function(listingID, imgID, callback) {
    performPut(constants.HOST + '/service/v1/listings/removeImage/' + listingID + '/' + imgID + '/', {}, callback);
  },

  deleteImage: function(imageID, callback) {
    performDelete(constants.HOST + '/service/v1/images/' + imageID + '/delete/', callback);
  },

  changeUserProfilePicture: function(data, callback) {
    this.uploadImage(data, function(success, response) {
      if (success) {
        const newImage = {
          id: data.get("owner"),
          imageId: response.data
        };
        performPut(constants.HOST + '/service/v1/users/update', newImage, callback);
      }
      else {
        callback(false, response);
      }
    });
  },

  removeUserProfilePicture: function(user, callback) {
    const data = {
      id: user,
      imageId: -1
    };
    performPut(constants.HOST + '/service/v1/users/update', data, callback);
  }

}
