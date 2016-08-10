'use strict';

/**
 * update <%= name %>
 * @param {string} ref
 * @param {object} data
 * @returns {Promise}
 */
function updateSelf(ref, data) {
  return Promise.resolve({
    key: ref,
    value: JSON.stringify(data)
  });
}

// module.exports = function (ref) {
//   // if you want to get dynamic data every time the component is rendered,
//   // uncomment this method and add stuff here.
//   // make sure you do db.get(ref) to get the current data from the database
// };

/**
 * @param {string} ref
 * @param {object} data
 * @returns {Promise}
 */
module.exports.put = updateSelf;
