'use strict';
(function () {
  var template = document.querySelector('#lodge-template').content;
  // Функция создающая содержимое карточки (согласно шаблона)
  window.renderOffer = function (array) {
    var offerElement = template.cloneNode(true);

    offerElement.querySelector('.lodge__title').textContent = array.offer.title;
    offerElement.querySelector('.lodge__address').textContent =
      array.offer.adress;
    offerElement.querySelector('.lodge__price').innerHTML =
      array.offer.price + '&#x20bd;/ночь';
    offerElement.querySelector('.lodge__type').textContent = setTypeOfRooms(
        array.offer.type
    );
    offerElement.querySelector('.lodge__rooms-and-guests').textContent =
      'Для' +
      ' ' +
      array.offer.guests +
      ' ' +
      'гостей в' +
      ' ' +
      array.offer.rooms +
      ' ' +
      'комнатах';
    offerElement.querySelector('.lodge__checkin-time').textContent =
      'Заезд после' +
      ' ' +
      array.offer.checkin +
      ', выезд до ' +
      ' ' +
      array.offer.checkout;
    offerElement
        .querySelector('.lodge__features')
        .appendChild(createEmptySpan(array));
    offerElement.querySelector('.lodge__description').textContent =
      array.offer.description;
    return offerElement;
  };

  // Создание пустых спанов
  window.createEmptySpan = function (arrays) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrays.offer.features.length; i++) {
      var features = arrays.offer.features[i];
      var span = document.createElement('span');
      span.className = 'feature__image feature__image--' + features;
      fragment.appendChild(span);
    }
    return fragment;
  };

  // Функция отрисовки карточки
  window.renderCurrentPin = function (target) {
    openPopup();
    getActivePin();
    target.parentNode.classList.add('pin--active');

    // Функция сравнивает атр. src у элемента из коллекции Pin с текущим элементом(target)
    for (var i = 0; i < pin.length; i++) {
      var z = pin[i].childNodes[0].getAttribute('src');
      if (z === target.getAttribute('src')) {
        pasteNewData(x[i]);
        break;
      }
    }
  };

})();
