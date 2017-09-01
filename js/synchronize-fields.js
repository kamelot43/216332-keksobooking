'use strict';
(function () {

  window.synchronizeFields = function (param1, param2, array1, array2, callback) {
    param1.addEventListener('change', function () {
      var index = array1.indexOf(param1.value);
      callback(param2, array2[index]);
    });
  };


})();
