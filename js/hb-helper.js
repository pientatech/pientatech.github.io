Handlebars.getTemplate = function(name) {
  if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
      $.ajax({
          url : 'templatesfolder/' + name + '.hbs',
          success : function(data) {
              if (Handlebars.templates === undefined) {
                  Handlebars.templates = {};
              }
              Handlebars.templates[name] = Handlebars.compile(data);
          },
          async : false
      });
  }
  return Handlebars.templates[name];
};

let fetchData = function (name) {
    let result = '';

    $.ajax({
        url : 'posts/' + name,
        success : function(data) {
            console.log(data);
            result = data;
        },
        async : false
    });

    return result;
};

