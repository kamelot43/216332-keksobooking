"use strict";
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var MIN_COORDINATE_X = 300 + PIN_WIDTH / 2;
var MAX_COORDINATE_X = 900 + PIN_WIDTH / 2;
var MIN_COORDINATE_Y = 100 + PIN_HEIGHT;
var MAX_COORDINATE_Y = 500 + PIN_HEIGHT;

//координаты пина
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var OFFER_HEADING = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];

var TIME_REGISTRATION = ["12:00", "13:00", "14:00"];

var FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];

var TYPE_ROOMS = ["flat", "house", "bungalo"];

//получить случайное значение из диапазона от мин до макс
function returnRandomValue(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

// получить случайный элемент массива
function getRandomElem(array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

function getRandomArrays(minValue, maxValue, array) {
  var randomLength = returnRandomValue(minValue, maxValue);

  var arrays = [];
  for (var i = 0; i < randomLength; i++) {
    arrays[i] = array[i];
  }
  return arrays;
}

//создание массива, который состоит из JS объектов
function createOffers(param) {
  var offers = [];
  for (var i = 0; i < param; i++) {
    offers[i] = {
      author: {
        avatar: "img/avatars/user" + "0[i]" + ".png"
      },
      offer: {
        title: OFFER_HEADING[i],
        address: this.location.x + "," + this.location.y,
        price: returnRandomValue(PRICE_MIN, PRICE_MAX),
        type: getRandomElem(TYPE_ROOMS),
        rooms: returnRandomValue(ROOMS_MIN, ROOMS_MAX),
        guests: returnRandomValue(ROOMS_MIN, ROOMS_MAX), //не понятно сколько ?
        checkin: getRandomElem(TIME_REGISTRATION),
        checkout: getRandomElem(TIME_REGISTRATION),
        features: getRandomArrays(1, 6, FEATURES),
        description: "",
        photos: []
      },
      location: {
        x: returnRandomValue(MIN_COORDINATE_X, MAX_COORDINATE_X),
        y: returnRandomValue(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
      }
    };
  }
  return offers;
}
