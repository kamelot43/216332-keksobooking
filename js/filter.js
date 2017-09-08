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

  var selectOption = function (optionValue, offer) {
    return optionValue === 'any' ? true : optionValue === offer;
  };

  var getFilteredAdverts = function (data) {
    return data.filter(function (element) {
      return selectOption(housingTypeElement.value, element.offer.type);
    });
  };

  var test = function () {

    window.pin.deletePins();
    window.sameCoatWizards = responseRequest.filter(function (it) {
      return it.offer.rooms === 0;
    });


    // tokyoPinMap.appendChild(window.pin.createPins(window.sameCoatWizards));
    tokyoPinMap.appendChild(window.pin.createPins(window.sameCoatWizards));

  };


  housingTypeElement.addEventListener('change', test);
  housingRoomsElement.addEventListener('change', test);
  housingGuestsElement.addEventListener('change', test);
  // housingPriceFilter.addEventListener('change', onPriceFilterChange);
  housingFeaturesElement.addEventListener('change', test);

})();
