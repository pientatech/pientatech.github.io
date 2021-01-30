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

let fetchData = async function (name) {
    // var output;
    // let response = await fetch( 'posts/' + name );
    // if (response.status !== 200) {
    //     console.log("Looks like there was a problem. Status Code: " + response.status);
    // } else {
    //     const data = await response.json()
    //     output = data;
    // }
    // output.posts.sort(function(a, b) {
    //     return new Date(a.postdate) - new Date(b.postdate);
    // });

    // return output;


    let response = await fetch( 'posts/' + name ) 
    .then((response) => response.json())
    .then((posts) => {
        posts.sort(function(a, b) {
            return new Date(a.postdate) - new Date(b.postdate);
        });        
        return posts;
    });
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
