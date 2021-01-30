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



let fetchData =  (name) => {
    let val = {};

    let data = fetch('posts/' + name).then(response => 
        response.json().then(data => ({
            data: data,
            status: response.status
        })
    ).then(res => {
        console.log(res.status, res.data)
        val = res.data;
    }));


    // let response = fetch( 'posts/' + name );
    // response.then( response => response.json() )
    //     .then(posts => posts );

    
    //     response.posts.sort(function(a, b) {
    //     return new Date(a.postdate) - new Date(b.postdate);
    // });

    return val;
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
