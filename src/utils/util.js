'use strict';
exports.sequence = async function (arr, fn) {
  return arr.reduce((p, args) => p
    .then((acc) => fn(...args).then((b) => acc.concat(b)), Promise.resolve([]))
  );
};
