'use strict';
(function () {

  var dialogPanel = document.querySelector('.dialog__panel');
  var dialogAvatar = document.querySelector('.dialog__title > img');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');


  window.data = {

    setTypeOfRooms: function (room) {
      if (room === 'flat') {
        return 'Квартира';
      } else if (room === 'bungalo') {
        return 'Бунгало';
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
    // Согласно задания на карте должно быть 8 элементов (меток)
    window.responseRequest.length = 8;

    // Отрисовать карточку,которая содержит первый элемент из массива animals
    tokyoPinMap.appendChild(window.pin.createPins(window.responseRequest));
    window.openPopup();
    window.data.pasteNewData(window.responseRequest[0]);

    window.pinsCollection = document.querySelectorAll('.pin:not(:first-child)'); // Все кроме первого
  };


  window.backend.load(onSuccess, window.backend.error);

})();
