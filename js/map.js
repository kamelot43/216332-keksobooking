'use strict';
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;

var OFFERS_AMOUNT = 8;

// Клавиши
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Поля формы количество гостей

var INPUT_GUESTS_MAX = 0;
var INPUT_GUESTS_MIN = 3;

// Параметры формы

var MIN_PRICE = 0;
var MAX_PRICE = 1000000;
var MIN_TEXTFIELD = 30;
var MAX_TEXTFIELD = 100;
var STANDART_PRICE = 1000;


var offerDialog = document.querySelector('#offer-dialog');
var dialogPanel = document.querySelector('.dialog__panel');
var closeDialog = offerDialog.querySelector('.dialog__close');

var formElement = document.querySelector('.notice__form');

var dialogAvatar = document.querySelector('.dialog__title > img');

var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var x = createOffers(OFFERS_AMOUNT);

tokyoPinMap.appendChild(createPins(x));


pasteNewData(x[0]);

var tokyo = document.querySelector('.tokyo');

var pin = document.querySelectorAll('.pin:not(:first-child)'); // Все кроме первого


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
