exports.stringify = function (qs) {
  // Stringify nested objects of depth 2+
  try {
    for (var i in qs) {
      qs[i] = JSON.stringify(qs[i]);
    }
  } catch(e) {
    throw new Error(e);
  }
};