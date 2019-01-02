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
  console.log(node);
  var results = [];
  if (node === null) {
    return results;
  } else {
    var classes = node.classList;
    if(classes && classes.contains(className)) {
      results.push(node);
    };
    var children = node.children;
    var length;
    if(!children) {
      length = 0;
    } else {
      length = children.length;
    };
    for(var i = 0; i < length; i++) {
      var childResults = getElementsByClassName(className, children[i]);
      if(childResults && childResults.length > 0) {
        results.push(childResults);
      };
    };
    return results;
  };
};