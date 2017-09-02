'use strict';
(function () {

  var URL = 'https://1510.dump.academy/keksobooking/data';
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    window.animals = data;
    // Отрисовать карточку,которая содержит первый элемент из массива animals

    tokyoPinMap.appendChild(window.pin.createPins(data));
    window.openPopup();
    window.data.pasteNewData(window.animals[0]);

    window.pinsCollection = document.querySelectorAll('.pin:not(:first-child)'); // Все кроме первого
  };

  window.load = function () {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };

})();
