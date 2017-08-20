"use strict";
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var OFFERS_AMOUNT = 8;

//координаты пина
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var MIN_COORDINATE_X = 300;
var MAX_COORDINATE_X = 900;
var MIN_COORDINATE_Y = 100;
var MAX_COORDINATE_Y = 500;

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

var Template = document.querySelector("#lodge-template").content;

function setTypeOfRooms(room) {
  if (room === "flat") {
    return "Квартира";
  } else if (room === "bungalo") {
    return "Бунгало";
  } else {
    return "Дом";
  }
}

//получить случайное значение из диапазона от мин до макс
function returnRandomValue(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

// получить случайный элемент массива
function getRandomElem(array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

// Полчить массив случайной длины
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
    var location = {
      x: returnRandomValue(MIN_COORDINATE_X, MAX_COORDINATE_X) + PIN_WIDTH / 2,
      y: returnRandomValue(MIN_COORDINATE_Y, MAX_COORDINATE_Y) + PIN_HEIGHT
    };
    offers[i] = {
      author: {
        avatar: "img/avatars/user0" + (i + 1) + ".png"
      },
      location: location,
      offer: {
        title: OFFER_HEADING[i],
        adress: location.x + "," + location.y,
        price: returnRandomValue(PRICE_MIN, PRICE_MAX),
        type: getRandomElem(TYPE_ROOMS),
        rooms: returnRandomValue(ROOMS_MIN, ROOMS_MAX),
        guests: returnRandomValue(GUESTS_MIN, GUESTS_MAX),
        checkin: getRandomElem(TIME_REGISTRATION),
        checkout: getRandomElem(TIME_REGISTRATION),
        features: getRandomArrays(1, 6, FEATURES),
        description: "",
        photos: []
      }
    };
  }
  return offers;
}

var tokyoPinMap = document.querySelector(".tokyo__pin-map");
var offerDialog = document.querySelector("#offer-dialog");
var dialogPanel = document.querySelector(".dialog__panel");

var dialogAvatar = document.querySelector(".dialog__title > img");

//функция, создающая div с заданными параметрами

function createPins(arrays) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrays.length; i++) {
    var pin = document.createElement("div");
    var img = document.createElement("img");
    pin.className = "pin";
    img.className = "rounded";
    img.width = "40";
    img.height = "40";
    img.src = arrays[i].author.avatar;
    pin.style.left = arrays[i].location.x + "px";
    pin.style.top = arrays[i].location.y + "px";
    pin.appendChild(img);
    fragment.appendChild(pin);
  }
  return fragment;
}

var x = createOffers(OFFERS_AMOUNT);

tokyoPinMap.appendChild(createPins(x));

// Создание пустых спанов
function createEmptySpan(arrays) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrays.offer.features.length; i++) {
    var features = arrays.offer.features[i];
    var span = document.createElement("span");
    span.className = "feature__image feature__image--" + features;
    fragment.appendChild(span);
  }
  return fragment;
}

var renderOffer = function(array) {
  var OfferElement = Template.cloneNode(true);

  OfferElement.querySelector(".lodge__title").textContent = array.offer.title;
  OfferElement.querySelector(".lodge__address").textContent =
    array.offer.adress;
  OfferElement.querySelector(".lodge__price").innerHTML =
    array.offer.price + "&#x20bd;/ночь";
  OfferElement.querySelector(".lodge__type").textContent = setTypeOfRooms(
    array.offer.type
  );
  OfferElement.querySelector(".lodge__rooms-and-guests").textContent =
    "Для" +
    " " +
    array.offer.guests +
    " " +
    "гостей в" +
    " " +
    array.offer.rooms +
    " " +
    "комнатах";
  OfferElement.querySelector(".lodge__checkin-time").textContent =
    "Заезд после" +
    " " +
    array.offer.checkin +
    ", выезд до " +
    " " +
    array.offer.checkout;
  OfferElement.querySelector(".lodge__features").appendChild(
    createEmptySpan(array)
  );
  OfferElement.querySelector(".lodge__description").textContent =
    array.offer.description;
  return OfferElement;
};

function PasteNewData(value) {
  var result = renderOffer(value);
  offerDialog.replaceChild(result, dialogPanel);
  dialogAvatar.src = value.author.avatar;
}

PasteNewData(x[0]);
