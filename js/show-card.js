'use strict';
(function () {

  window.showCard = {
    // Функция отрисовки карточки
    renderCurrentPin: function (target) {

      target.parentNode.classList.add('pin--active');
      var x = Array.prototype.slice.call(pinsCollection).indexOf(target.parentNode);
      window.data.pasteNewData(window.responseRequest[x]);

    }
  };
})();
