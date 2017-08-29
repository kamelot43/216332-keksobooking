'use strict';
(function () {

  // Установить мин.значение цены + минимально допустимое
  window.setMinPriceInput = function (value) {
    priceInput.value = value;
    priceInput.min = value;
  };

  // Функция проверки текстового поля формы
  window.validateTextInput = function (input, minValue, maxValue) {
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
  };

  // Функция проверки числового поля формы
  window.validateNumberInput = function (input, minValue, maxValue) {
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
  };

  // Очистка формы после отправки
  window.resetForm = function (form) {
    form.submit();
    setTimeout(function () {
      form.reset();
      formPriceInput.value = STANDART_PRICE;
      questsNumer.selectedIndex = INPUT_GUESTS_MIN;
    }, 100);
  };
})();
