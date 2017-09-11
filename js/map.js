'use strict';
(function () {
  // Клавиши
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var offerDialog = document.querySelector('#offer-dialog');
  var closeDialog = offerDialog.querySelector('.dialog__close');
  var tokyo = document.querySelector('.tokyo');


  // Отрисовать в карточке текущий пин (при клике мышкой)
  tokyo.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.parentNode.classList.contains('pin')) {
      window.pin.activatePin(target);

      if (!window.x) {
        window.showCard.renderCurrentPin(target, window.responseRequest);
      } else {
        window.showCard.renderCurrentPin(target, window.x);
      }


    }
  });

  // Отрисовать в карточке текущий пин (при нажатии клавиши)
  tokyo.addEventListener('keydown', function (evt) {
    var target = evt.target.childNodes[0];

    if (target.parentNode.classList.contains('pin') && evt.keyCode === 13) {
      window.pin.activatePin(target);

      if (!window.x) {
        window.showCard.renderCurrentPin(target, window.responseRequest);
      } else {
        window.showCard.renderCurrentPin(target, window.x);
      }
    }
  });

  // Закрытия окна диалога + деактивации пина
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.pin.deactivatePin();
    }
  };

  // Функция открытия окна диалога
  window.openPopup = function () {
    offerDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия окна диалога
  window.closePopup = function () {
    offerDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // По-умолчанию скрыть карточку
  window.closePopup();

  // Закрытие окна диалоги при клике на крестик мышкой
  closeDialog.addEventListener('click', function () {

    window.pin.deactivatePin();
  });

  // Закрытие окна диалоги при нажатии клавиатуры
  closeDialog.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.pin.deactivatePin();
    }
  });


  // работаем с pin-main

  var formAddress = document.querySelector('#address');
  var pinMain = document.querySelector('.pin__main');


  // Функция заполнения поля адрес
  window.fillAddress = function () {
    var points = {
      x: pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / 2),
      y: pinMain.offsetTop + pinMain.offsetHeight
    };
    formAddress.value = 'x: ' + points.x + ' , ' + 'y: ' + points.y;
  };

  window.fillAddress();

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.fillAddress();

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
