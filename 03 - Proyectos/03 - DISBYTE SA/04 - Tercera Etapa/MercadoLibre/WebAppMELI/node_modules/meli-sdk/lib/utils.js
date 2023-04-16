"use strict";

function merge(obj1, obj2) {
  for (var index in obj2) {
    if (typeof obj1[index] !== 'object') {
      obj1[index] = obj2[index];
    } else if (typeof obj2[index] === 'object') {
      obj1[index] = merge(obj1[index], obj2[index]);
    }
  }

  return obj1;
}

exports.merge = merge;
