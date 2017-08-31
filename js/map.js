'use strict';
(function () {
  // Клавиши
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var offerDialog = document.querySelector('#offer-dialog');
  var closeDialog = offerDialog.querySelector('.dialog__close');
  var tokyo = document.querySelector('.tokyo');
  window.pinsCollection = document.querySelectorAll('.pin:not(:first-child)'); // Все кроме первого

  // Отрисовать карточку,которая содержит первый элемент из массива x
  window.data.pasteNewData(window.x[0]);

  // Отрисовать в карточке текущий пин (при клике мышкой)
  tokyo.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.parentNode.classList.contains('pin')) {
      window.card.renderCurrentPin(target);
    }
  });

  // Отрисовать в карточке текущий пин (при нажатии клавиши)
  tokyo.addEventListener('keydown', function (evt) {
    var target = evt.target.childNodes[0];

    if (target.parentNode.classList.contains('pin') && evt.keyCode === 13) {
      window.card.renderCurrentPin(target);
    }
  });

  // Закрытия окна диалога + деактивации пина
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
      window.pin.getActivePin();
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
    window.pin.getActivePin();
  });

  // Закрытие окна диалоги при нажатии клавиатуры
  closeDialog.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.pin.getActivePin();
      closePopup();
    }
  });


  // работаем с pin-main

  var formAddress = document.querySelector('#address');
  var pinMain = document.querySelector('.pin__main');

  // Функция заполнения поля адрес
  function fillAddress() {
    var points = {
      x: pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / 2),
      y: pinMain.offsetTop + pinMain.offsetHeight
    };
    formAddress.value = 'x: ' + points.x + ' , ' + 'y: ' + points.y;
  }

  fillAddress();

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      fillAddress();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
