// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  json = json.trim();
  if(json[0] === '"') {
    if(json[json.length -1] === '"' && json[json.length - 2] === '\\') {
      throw new SyntaxError("Poorly formed string");
    }
    if(json[json.length -1] === '"') {
      var string = json.slice(1, json.length -1);
      var result = '';
      for (var i = 0; i < string.length; i++) {
        if (string[i] === '\\') {
          i++;
        }
        result += string[i];
      }
      return result;
    };
  };
  if(!isNaN(json)) {
    return +json;
  }
  if(json === 'null') {
    return null;
  };
  if(json === 'true') {
    return true;
  };
  if(json === 'false') {
    return false;
  };
  if(json === 'undefined') {
    return undefined;
  };
  if(json[0] === '[') {
    if(json[json.length -1] === ']') {
      if(json.length === 2) {
        return [];
      } else {
        //var elements = json.slice(1, json.length -1).split(',');
        var elements = splitBy(json.slice(1, json.length -1), ',');
        return elements.map(parseJSON);
      };
    } else {
      throw new SyntaxError('poorly formed array');
    };
  } else if (json[0] === '{') {
    if (json[json.length -1] === '\n') {
      console.log('YOUOUOUO');
    }
    if (json[json.length -1] === '}') {
      if(json.length === 2) {
        return {};
      } else {
        //var elements = json.slice(1, json.length -1).split(',');
        var elements = splitBy(json.slice(1, json.length -1), ',');
        var result = {};
        for(var i = 0; i < elements.length; i++) {
          //var element = elements[i].split(':');
          var element = splitBy(elements[i], ':');
          result[parseJSON(element[0])] = parseJSON(element[1]);
        };
        return result;
      };
    } else {
      throw new SyntaxError('poorly formed object');
    };
  };
};

var splitBy = function(string, delim) {
  var result = [];
  if (string.indexOf(delim) < 0) {
    result.push(string);
  } else {
    var quotes = true;
    var left = 0;
    for (var i = 0 ; i < string.length ; i ++) {
      if (string[i] === '"') {
        quotes = !quotes;
      }
      if (string[i] === '[') {
        i = string.indexOf(']', i) === -1 ? i : string.indexOf(']', i);
      }
      if (string[i] === '{' ) {
        i = string.indexOf('}', i) === -1 ? i : string.indexOf('}', i);
      }
      if (string[i] === delim && quotes) {
        result.push(string.slice(left, i));
        left = i + 1;
      }
    }
    result.push(string.slice(left, i));
  }
  return result;
};