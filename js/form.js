'use strict';
(function () {
  // Поля формы количество гостей

  var INPUT_GUESTS_MIN = 3;

  // Параметры формы

  var MIN_PRICE = 0;
  var MAX_PRICE = 1000000;
  var MIN_TEXTFIELD = 30;
  var MAX_TEXTFIELD = 100;
  var STANDART_PRICE = 1000;

  var TIME_REGISTRATION = ['12:00', '13:00', '14:00'];
  var ROOMS = ['flat', 'bungalo', 'house', 'palace'];
  var PRICE = [1000, 0, 5000, 10000];
  var ROOMS_NUMBER = ['1', '2', '3', '100'];

  var priceInput = document.querySelector('#price');
  var formElement = document.querySelector('.notice__form');
  var housingType = document.querySelector('#type');

  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var roomNumer = document.querySelector('#room_number');
  var questsNumer = document.querySelector('#capacity');

  var formOfferTitle = document.querySelector('#title');
  var formAddress = document.querySelector('#address');
  var formPriceInput = document.querySelector('#price');

  priceInput.value = STANDART_PRICE;


  window.form = {
  // Функция проверки текстового поля формы
    validateTextInput: function (input, minValue, maxValue) {
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
    },

    // Функция проверки числового поля формы
    validateNumberInput: function (input, minValue, maxValue) {
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
    },

    // Очистка формы после отправки
    resetForm: function (form) {
      form.submit();
      setTimeout(function () {
        form.reset();
        formPriceInput.value = STANDART_PRICE;
        questsNumer.selectedIndex = INPUT_GUESTS_MIN;
      }, 100);
    }
  };

  // Динамическое изменение поля количество комнат
  // Установить значение по умолчанию
  questsNumer.selectedIndex = INPUT_GUESTS_MIN;

  // Вспомогательная функция
  function syncValues(element, value) {
    element.value = value;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
    element.value = value;
  }

  // Синхронизировать значение полей

  window.synchronizeFields(timeInInput, timeOutInput, TIME_REGISTRATION, TIME_REGISTRATION, syncValues);
  window.synchronizeFields(timeOutInput, timeInInput, TIME_REGISTRATION, TIME_REGISTRATION, syncValues);
  window.synchronizeFields(roomNumer, questsNumer, ROOMS_NUMBER, [0, 3, 3, 3], syncValues);
  window.synchronizeFields(housingType, priceInput, ROOMS, PRICE, syncValueWithMin);


  formOfferTitle.addEventListener('input', function () {
    window.form.validateTextInput(formOfferTitle, MIN_TEXTFIELD, MAX_TEXTFIELD);
  });

  formAddress.addEventListener('input', function () {
    window.form.validateTextInput(formAddress, MIN_TEXTFIELD, MAX_TEXTFIELD);
  });

  formPriceInput.addEventListener('input', function () {
    window.form.validateNumberInput(formPriceInput, MIN_PRICE, MAX_PRICE);
  });

  formElement.addEventListener('submit', function () {
    window.form.resetForm(formElement);
  });
})();
