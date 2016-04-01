'use strict';

DS.controller('<%= name %>', [function () {

  function Constructor(el) {
    this.el = el;
  }

  Constructor.prototype = {
    events: {
      click: 'handler'
    },
    handler: function (e) {
      console.log(e.target);
    }
  };

  return Constructor;
}]);
