// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

// You should use document.body, element.childNodes,
// and element.classList

var getElementsByClassName = function(className, node) {
  if(!node) {
    node = document.body;
  };
  var results = [];
  if (node === null) {
    return results;
  }
  var classes = node.classList;
  var children = node.children;
  var length;
  if(classes && classes.contains(className)) {
    results.push(node);
  };
  // length = !children ? 0 : children.length;
  if(!children) {
    length = 0;
  } else {
    length = children.length;
  };
  for(var i = 0; i < length; i++) {
    var childResults = getElementsByClassName(className, children[i]);
    if(childResults && childResults.length > 0) {
      results = results.concat(childResults);
    };
  };
  return results;
};