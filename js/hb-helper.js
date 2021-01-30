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

let fetchData = function (name, postdata) {
    var result = {};
    $.getJSON( 'posts/' + name )
        .fail(function( data ) {
            console.log('fail');
            console.log( data );
        })
        .done(function( data ) {
            postdata = data;
            data.posts.sort(function(a, b) {
                return new Date(a.postdate) - new Date(b.postdate);
            });

            result = data;
        });
    
    return result;
};

let fetchPage = function (name) {
    let result = '';

    $.ajax({
        url : 'posts/' + name,
        success : function(data) {
            result = data;
        },
        async : false
    });

    return result;
};
