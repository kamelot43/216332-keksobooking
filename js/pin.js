'use strict';
(function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  // функция, создающая pin с заданными параметрами
  window.createPins = function (arrays) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrays.length; i++) {
      var pin = document.createElement('div');
      var img = document.createElement('img');
      pin.className = 'pin';
      img.className = 'rounded';
      img.width = '40';
      img.height = '40';
      img.src = arrays[i].author.avatar;
      pin.style.left = arrays[i].location.x + 'px';
      pin.style.top = arrays[i].location.y + 'px';
      pin.setAttribute('tabindex', '0');
      pin.appendChild(img);
      fragment.appendChild(pin);
    }
    return fragment;
  };

  // Проверка на класс .pin--active
  window.getActivePin = function () {
    var activePin = document.querySelector('.pin--active');
    if (activePin !== null) {
      activePin.classList.remove('pin--active');
    }
  };

  // Отрисовать созданные пины
  tokyoPinMap.appendChild(window.createPins(window.x));
})();
