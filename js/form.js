'use strict';
(function () {
  // Поля формы количество гостей

  var INPUT_GUESTS_MAX = 0;
  var INPUT_GUESTS_MIN = 3;

  // Параметры формы

  var MIN_PRICE = 0;
  var MAX_PRICE = 1000000;
  var MIN_TEXTFIELD = 30;
  var MAX_TEXTFIELD = 100;
  var STANDART_PRICE = 1000;

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

  // Установить мин.значение цены + минимально допустимое
  var setMinPriceInput = function (value) {
    priceInput.value = value;
    priceInput.min = value;
  };

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

  roomNumer.addEventListener('change', function () {
    var val = roomNumer.selectedIndex;
    if (val === 0) {
      questsNumer.selectedIndex = INPUT_GUESTS_MIN;
    } else {
      questsNumer.selectedIndex = INPUT_GUESTS_MAX;
    }
  });


  // Вспомогательная функция
  function syncValues(element, value) {
    element.value = value;
  }


  window.synchronizeFields(timeInInput, timeOutInput, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(timeOutInput, timeInInput, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);


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
