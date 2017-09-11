'use strict';
(function () {

  window.showCard = {
    // Функция отрисовки карточки
    renderCurrentPin: function (target, array) {

      // Необходимо преобразовать объект с информацией в массив
      // Найти в массиве индекс элемента с классом pin--active

      var newArray = Array.prototype.slice.call(window.pinsCollection).indexOf(target.parentNode);
      window.data.pasteNewData(array[newArray]);

    }
  };
})();
