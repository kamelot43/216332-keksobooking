'use strict';
(function () {

  window.showCard = {
    // Функция отрисовки карточки
    renderCurrentPin: function (target) {
      window.openPopup();
      window.pin.getActivePin();
      target.parentNode.classList.add('pin--active');


      // Функция сравнивает атр. src у элемента из коллекции Pin с текущим элементом(target)
      for (var i = 0; i < window.pinsCollection.length; i++) {
        var z = window.pinsCollection[i].childNodes[0].getAttribute('src');

        if (z === target.getAttribute('src')) {


          window.data.pasteNewData(window.animals[i]);
          break;
        }
      }
    }
  };
})();
