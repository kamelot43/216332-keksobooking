'use strict';
(function () {


  // Проверка на класс .pin--active
  var getActivePin = function () {
    var activePin = document.querySelector('.pin--active');
    if (activePin !== null) {
      activePin.classList.remove('pin--active');
    }
  };

  window.pin = {
  // функция, создающая pin с заданными параметрами
    createPins: function (arrays, length) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < length; i++) {
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
    },

    deletePins: function () {
      Array.prototype.forEach.call(window.tokyoPinMap.querySelectorAll('.pin'), function (element) {
        if (!element.classList.contains('pin__main')) {
          window.tokyoPinMap.removeChild(element);
        }
      });
    },

    activatePin: function (evt) {
      window.openPopup();
      getActivePin();
      evt.parentNode.classList.add('pin--active');
    },

    deactivatePin: function () {
      window.closePopup();
      getActivePin();
    }
  };

})();
