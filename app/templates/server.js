'use strict';

var _ = require('lodash'),
  tasks = require('../../services/tasks');

/**
 * update <%= name %>
 * @param {string} ref
 * @param {object} data
 * @returns {object} operation
 */
function updateSelf(ref, data) {
  return {
    key: ref,
    value: data
  };
}

// module.exports.get = function (ref) {
//   // if you want to get dynamic data every time the component is rendered,
//   // uncomment this method and add stuff here.
//   // make sure you do db.get(ref) to get the current data from the database
// };

/**
 * @param {string} ref
 * @param {{}} data
 * @returns {Promise}
 */
module.exports.put = function (ref, data) {
  var taskList = [
    // add any special tasks above, e.g. if you need to update other components,
    // 3rd party services, /list items, or do api calls before saving data
    { when: _.constant(true), fn: updateSelf }
  ];

  return tasks.run(taskList, ref, data);
};
