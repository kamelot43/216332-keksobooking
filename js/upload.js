'use strict';
(function () {
  var URL = 'https://1510.dump.academy/keksobooking';
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    var animals = data;

    console.log(animals);
  };

  window.upload = function (data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
