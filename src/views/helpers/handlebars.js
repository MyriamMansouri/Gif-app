const list = (items, options) => {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
};


var register = function(Handlebars) {
  var helpers = {
  list
};

if (Handlebars && typeof Handlebars.registerHelper === "function") {
  for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
  }
} else {
  return helpers;
}

};

module.exports.register = register;
module.exports.helpers = register(null); 