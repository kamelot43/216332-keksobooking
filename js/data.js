'use strict';
(function () {
  // Количество элементов в массиве объявлений
  var OFFERS_AMOUNT = 8;

  // Высота и ширина пина
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  // Координаты пина
  var MIN_COORDINATE_X = 300;
  var MAX_COORDINATE_X = 900;
  var MIN_COORDINATE_Y = 100;
  var MAX_COORDINATE_Y = 500;

  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;

  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;

  var OFFER_HEADING = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var TIME_REGISTRATION = ['12:00', '13:00', '14:00'];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var TYPE_ROOMS = ['flat', 'house', 'bungalo'];

  var template = document.querySelector('#lodge-template').content;

  var dialogPanel = document.querySelector('.dialog__panel');
  var dialogAvatar = document.querySelector('.dialog__title > img');

  window.setTypeOfRooms = function (room) {
    if (room === 'flat') {
      return 'Квартира';
    } else if (room === 'bungalo') {
      return 'Бунгало';
    } else {
      return 'Дом';
    }
  };

  // получить случайное значение из диапазона от мин до макс
  window.returnRandomValue = function (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  };

  // получить случайный элемент массива
  window.getRandomElem = function (array) {
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
  };

  // Полчить массив случайной длины
  window.getRandomArrays = function (minValue, maxValue, array) {
    var randomLength = returnRandomValue(minValue, maxValue);

    var arrays = [];
    for (var i = 0; i < randomLength; i++) {
      arrays[i] = array[i];
    }
    return arrays;
  };

  // создание массива, который состоит из JS объектов
  window.createOffers = function (param) {
    var offers = [];
    for (var i = 0; i < param; i++) {
      var location = {
        x:
          returnRandomValue(MIN_COORDINATE_X, MAX_COORDINATE_X) + PIN_WIDTH / 2,
        y: returnRandomValue(MIN_COORDINATE_Y, MAX_COORDINATE_Y) + PIN_HEIGHT
      };
      offers[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        location: location,
        offer: {
          title: OFFER_HEADING[i],
          adress: location.x + ',' + location.y,
          price: returnRandomValue(PRICE_MIN, PRICE_MAX),
          type: getRandomElem(TYPE_ROOMS),
          rooms: returnRandomValue(ROOMS_MIN, ROOMS_MAX),
          guests: returnRandomValue(GUESTS_MIN, GUESTS_MAX),
          checkin: getRandomElem(TIME_REGISTRATION),
          checkout: getRandomElem(TIME_REGISTRATION),
          features: getRandomArrays(1, 6, FEATURES),
          description: '',
          photos: []
        }
      };
    }
    return offers;
  };

  // Функция вставки новых данных на страницу
  window.pasteNewData = function (value) {
    var result = renderOffer(value);
    dialogPanel.innerHTML = '';
    dialogPanel.appendChild(result);
    dialogAvatar.src = value.author.avatar;
  };

  window.x = createOffers(OFFERS_AMOUNT);
})();
