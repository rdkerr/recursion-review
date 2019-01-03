// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var result = '';
  if (typeof obj === 'number') {
    result += obj.toString();
  } else if (typeof obj === 'boolean') {
    var string = obj ? 'true' : 'false';
    result += string;
  } else if (obj === null) {
    result += 'null';
  } else if (typeof obj === 'string') {
    result += '"' + obj + '"';
  } else if (Array.isArray(obj)) {
    if (obj.length === 0) {
      result += '[]';
    } else {
      result += '[';
      for (var i = 0 ; i < obj.length ; i++) {
        if (i > 0) {
          result += ',';
        }
        result += stringifyJSON(obj[i]);
      }
      result += ']';
    }
  } else if (typeof obj === 'object') {
    if (obj && Object.keys(obj).length === 0) {
      return '{}';
    } else {
      result += '{';
      var comma = false;
      for (var key in obj) {
        if (typeof obj[key] === 'function' || obj[key] === undefined) {
          continue;
        }
        if (comma) {
          result += ',';
        } else {
          comma = true;
        }
        result += stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
      }
      result += '}';
    }
  }
  return result;
};
