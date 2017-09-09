'use strict';
(function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var filters = document.querySelector('.tokyo__filters');
  var housingTypeElement = filters.querySelector('#housing_type');
  var housingRoomsElement = filters.querySelector('#housing_room-number');
  var housingGuestsElement = filters.querySelector('#housing_guests-number');
  var housingPriceElement = filters.querySelector('#housing_price');
  var housingFeaturesElement = filters.querySelector('#housing_features');


  // Блок приемущества
  var getSelectedFeatures = function () {
    var features = [];
    Array.prototype.forEach.call(housingFeaturesElement.querySelectorAll('input[type="checkbox"]'), function (element) {
      if (element.checked) {
        features.push(element.value);
      }
    });
    return features;
  };

  var filterFeatures = function (filtersFeature, itemFeatures) {
    for (var i = 0; i < filtersFeature.length; i++) {
      if (itemFeatures.indexOf(filtersFeature[i]) === -1) {
        return false;
      }
    }
    return true;
  };


  var selectOption = function (element, setValue, type) {
    if (type === 'number') {
      return element.value === 'any' ? true : setValue === parseInt(element.value, 10);
    } else {
      return element.value === 'any' ? true : setValue === element.value;
    }
  };

  // блок цена
  var isPricesMatch = function (ad) {
    var priceFiltered;
    switch (housingPriceElement.value) {
      case 'any':
        priceFiltered = true;
        break;
      case 'middle':
        priceFiltered = ad.offer.price <= 50000 && ad.offer.price >= 10000;
        break;
      case 'low':
        priceFiltered = ad.offer.price < 10000;
        break;
      case 'high':
        priceFiltered = ad.offer.price > 50000;
        break;
    }
    return priceFiltered;
  };

  var getFilteredAdverts = function (data) {

    return data.filter(function (element) {

      return selectOption(housingTypeElement, element.offer.type, 'string') &&
    isPricesMatch(element) &&
    selectOption(housingRoomsElement, element.offer.rooms, 'number') &&
    selectOption(housingGuestsElement, element.offer.guests, 'number') &&
    filterFeatures(getSelectedFeatures(), element.offer.features);
    });
  };

  var renderFilteredPins = function () {

    window.pin.deletePins();
    window.x = getFilteredAdverts(window.responseRequest);
    tokyoPinMap.appendChild(window.pin.createPins(window.x));
    window.data.pasteNewData(window.x[0]);
    window.pinsCollection = document.querySelectorAll('.pin:not(:first-child)'); // Все кроме первого

  };


  filters.addEventListener('change', renderFilteredPins);

})();
