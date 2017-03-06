/* eslint-disable */

const cookie = require('react-cookie');
const axios = require('axios');
const constants = require('./constants');
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
  }
}
