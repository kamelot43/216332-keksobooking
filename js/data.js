'use strict';
(function () {
  window.tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var dialogPanel = document.querySelector('.dialog__panel');
  var dialogAvatar = document.querySelector('.dialog__title > img');


  window.data = {

    setTypeOfRooms: function (room) {
      if (room === 'flat') {
        return 'Квартира';
      } else if (room === 'bungalo') {
        return 'Бунгало';

      } else if (room === 'palace') {
        return 'Дворец';
      } else {
        return 'Дом';
      }
    },

    // Функция вставки новых данных на страницу
    pasteNewData: function (value) {
      var result = window.card.renderOffer(value);
      dialogPanel.innerHTML = '';
      dialogPanel.appendChild(result);
      dialogAvatar.src = value.author.avatar;
    }
  };


  var onSuccess = function (data) {
    // В переменной responseRequest содержится массив объявлений ,загруженный по сети
    window.responseRequest = data;

    // Отрисовать карточку,которая содержит первый элемент из массива animals
    tokyoPinMap.appendChild(window.pin.createPins(window.responseRequest));
    window.openPopup();
    window.data.pasteNewData(window.responseRequest[0]);
    window.pinsCollection = document.querySelectorAll('.pin:not(:first-child)'); // Все кроме первого

  };


  window.backend.load(onSuccess, window.backend.error);

})();
