'use strict';
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var OFFERS_AMOUNT = 8;

// координаты пина
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

// Клавиши
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Поля формы количество гостей

var INPUT_GUESTS_MAX = 0;
var INPUT_GUESTS_MIN = 3;

var MIN_COORDINATE_X = 300;
var MAX_COORDINATE_X = 900;
var MIN_COORDINATE_Y = 100;
var MAX_COORDINATE_Y = 500;

// Параметры формы

var MIN_PRICE = 0;
var MAX_PRICE = 1000000;
var MIN_TEXTFIELD = 30;
var MAX_TEXTFIELD = 100;
var STANDART_PRICE = 1000;

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

function setTypeOfRooms(room) {
  if (room === 'flat') {
    return 'Квартира';
  } else if (room === 'bungalo') {
    return 'Бунгало';
  } else {
    return 'Дом';
  }
}

// получить случайное значение из диапазона от мин до макс
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

// создание массива, который состоит из JS объектов
function createOffers(param) {
  var offers = [];
  for (var i = 0; i < param; i++) {
    var location = {
      x: returnRandomValue(MIN_COORDINATE_X, MAX_COORDINATE_X) + PIN_WIDTH / 2,
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
}

var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var offerDialog = document.querySelector('#offer-dialog');
var dialogPanel = document.querySelector('.dialog__panel');
var closeDialog = offerDialog.querySelector('.dialog__close');

var formElement = document.querySelector('.notice__form');

var dialogAvatar = document.querySelector('.dialog__title > img');

// функция, создающая div с заданными параметрами

function createPins(arrays) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrays.length; i++) {
    var pin = document.createElement('div');
    var img = document.createElement('img');
    pin.className = 'pin';
    img.className = 'rounded';
    img.width = '40';
    img.height = '40';
    img.src = arrays[i].author.avatar;
    pin.style.left = arrays[i].location.x + 'px';
    pin.style.top = arrays[i].location.y + 'px';
    pin.setAttribute('tabindex', '0');
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
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + features;
    fragment.appendChild(span);
  }
  return fragment;
}

function renderOffer(array) {
  var offerElement = template.cloneNode(true);

  offerElement.querySelector('.lodge__title').textContent = array.offer.title;
  offerElement.querySelector('.lodge__address').textContent =
    array.offer.adress;
  offerElement.querySelector('.lodge__price').innerHTML =
    array.offer.price + '&#x20bd;/ночь';
  offerElement.querySelector('.lodge__type').textContent = setTypeOfRooms(
      array.offer.type
  );
  offerElement.querySelector('.lodge__rooms-and-guests').textContent =
    'Для' +
    ' ' +
    array.offer.guests +
    ' ' +
    'гостей в' +
    ' ' +
    array.offer.rooms +
    ' ' +
    'комнатах';
  offerElement.querySelector('.lodge__checkin-time').textContent =
    'Заезд после' +
    ' ' +
    array.offer.checkin +
    ', выезд до ' +
    ' ' +
    array.offer.checkout;
  offerElement
      .querySelector('.lodge__features')
      .appendChild(createEmptySpan(array));
  offerElement.querySelector('.lodge__description').textContent =
    array.offer.description;
  return offerElement;
}

// Функция вставки новых данных на страницу
function pasteNewData(value) {
  var result = renderOffer(value);
  dialogPanel.innerHTML = '';
  dialogPanel.appendChild(result);
  dialogAvatar.src = value.author.avatar;
}

pasteNewData(x[0]);

var tokyo = document.querySelector('.tokyo');

var pin = document.querySelectorAll('.pin:not(:first-child)'); // Все кроме первого

// Проверка на класс .pin--active
function getActivePin() {
  for (var j = 0; j < pin.length; j++) {
    if (pin[j].classList.contains('pin--active')) {
      pin[j].classList.remove('pin--active');
    }
  }
}
// Функция отрисовки выбранного пина
function renderCurrentPin(target) {
  openPopup();
  getActivePin();
  target.parentNode.classList.add('pin--active');

  // Функция сравнивает атр. src у элемента из коллекции Pin с текущим элементом(target)
  for (var i = 0; i < pin.length; i++) {
    var z = pin[i].childNodes[0].getAttribute('src');
    if (z === target.getAttribute('src')) {
      pasteNewData(x[i]);
      break;
    }
  }
}

tokyo.addEventListener('click', function (evt) {
  var target = evt.target;

  if (target.parentNode.classList.contains('pin')) {
    renderCurrentPin(target);
  }
});

tokyo.addEventListener('keydown', function (evt) {
  var target = evt.target.childNodes[0];

  if (target.parentNode.classList.contains('pin') && evt.keyCode === 13) {
    renderCurrentPin(target);
  }
});

// Обработчки открытия/закрытия окна диалога + деактивации пина
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
    getActivePin();
  }
};

// Функция открытия окна диалога
var openPopup = function () {
  offerDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия окна диалога
var closePopup = function () {
  offerDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

closeDialog.addEventListener('click', function () {
  closePopup();
  getActivePin();
});

closeDialog.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    getActivePin();
    closePopup();
  }
});

// Работа с валидацией формы

var housingType = document.querySelector('#type');
var priceInput = document.querySelector('#price');

var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');
var roomNumer = document.querySelector('#room_number');
var questsNumer = document.querySelector('#capacity');

priceInput.value = 1000;

// Установить мин.значение цены + минимально допустимое
function setMinPriceInput(value) {
  priceInput.value = value;
  priceInput.min = value;
}

// Динамическое изменение поля количество комнат
// Установить значение по умолчанию
questsNumer.selectedIndex = INPUT_GUESTS_MIN;

roomNumer.addEventListener('change', function () {
  var val = roomNumer.selectedIndex;
  if (val === 0) {
    questsNumer.selectedIndex = INPUT_GUESTS_MIN;
  } else {
    questsNumer.selectedIndex = INPUT_GUESTS_MAX;
  }
});

// Динамическое изменение поля время заезда
timeInInput.addEventListener('change', function () {
  var val = timeInInput.selectedIndex;
  timeOutInput.selectedIndex = val;
});

// Динамическое изменение поля время выезда
timeOutInput.addEventListener('change', function () {
  var val = timeOutInput.selectedIndex;
  timeInInput.selectedIndex = val;
});

housingType.addEventListener('change', function () {
  var val = housingType.options[housingType.selectedIndex].value;

  if (val === 'bungalo') {
    setMinPriceInput(0);
  } else if (val === 'house') {
    setMinPriceInput(5000);
  } else if (val === 'palace') {
    setMinPriceInput(10000);
  } else {
    setMinPriceInput(1000);
  }
});

var formOfferTitle = document.querySelector('#title');
var formAddress = document.querySelector('#address');

var formPriceInput = document.querySelector('#price');

// Функция проверки текстового поля формы
function validateTextInput(input, minValue, maxValue) {
  if (input.value.length < minValue) {
    input.setCustomValidity(
        'Минимальная длина заголовка - ' + minValue + ' ' + 'символов'
    );
    input.style.borderColor = 'red';
  } else if (input.value.length > maxValue) {
    input.setCustomValidity(
        'Максимальная длина заголовка - ' + maxValue + ' ' + 'символов'
    );
    input.style.borderColor = 'red';
  } else {
    input.setCustomValidity('');
    input.style.borderColor = '';
  }
}
// Функция проверки числового поля формы
function validateNumberInput(input, minValue, maxValue) {
  if (Number(input.value) < minValue) {
    input.setCustomValidity(
        'Минимально допустимое значение составляет - ' + minValue
    );
    input.style.borderColor = 'red';
  } else if (Number(input.value) > maxValue) {
    input.setCustomValidity(
        'Максимально допустимое значение составляет - ' + maxValue
    );
    input.style.borderColor = 'red';
  } else {
    input.setCustomValidity('');
    input.style.borderColor = '';
  }
}

// Очистка формы после отправки
function resetForm(form) {
  form.submit();
  setTimeout(function () {
    form.reset();
    formPriceInput.value = STANDART_PRICE;
    questsNumer.selectedIndex = INPUT_GUESTS_MIN;
  }, 100);
}

formOfferTitle.addEventListener('input', function () {
  validateTextInput(formOfferTitle, MIN_TEXTFIELD, MAX_TEXTFIELD);
});

formAddress.addEventListener('input', function () {
  validateTextInput(formAddress, MIN_TEXTFIELD, MAX_TEXTFIELD);
});

formPriceInput.addEventListener('input', function () {
  validateNumberInput(formPriceInput, MIN_PRICE, MAX_PRICE);
});

formElement.addEventListener('submit', function () {
  resetForm(formElement);
});
