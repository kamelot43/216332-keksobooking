'use strict';
(function () {
  // Клавиши
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var offerDialog = document.querySelector('#offer-dialog');
  var closeDialog = offerDialog.querySelector('.dialog__close');
  var tokyo = document.querySelector('.tokyo');
  window.pin = document.querySelectorAll('.pin:not(:first-child)'); // Все кроме первого

  // Отрисовать карточку,которая содержит первый элемент из массива x
  window.pasteNewData(window.x[0]);

  // Отрисовать в карточке текущий пин (при клике мышкой)
  tokyo.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.parentNode.classList.contains('pin')) {
      window.renderCurrentPin(target);
    }
  });

  // Отрисовать в карточке текущий пин (при нажатии клавиши)
  tokyo.addEventListener('keydown', function (evt) {
    var target = evt.target.childNodes[0];

    if (target.parentNode.classList.contains('pin') && evt.keyCode === 13) {
      window.renderCurrentPin(target);
    }
  });

  // Закрытия окна диалога + деактивации пина
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
      window.getActivePin();
    }
  };

  // Функция открытия окна диалога
  window.openPopup = function () {
    offerDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия окна диалога
  var closePopup = function () {
    offerDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Закрытие окна диалоги при клике на крестик мышкой
  closeDialog.addEventListener('click', function () {
    closePopup();
    window.getActivePin();
  });

  // Закрытие окна диалоги при нажатии клавиатуры
  closeDialog.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.getActivePin();
      closePopup();
    }
  });
})();
