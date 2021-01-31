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

//this will come from a json file
var postdata = {};   

$(document).ready(function(){
    fetchData(`postlog.json`).then(data => {postdata = data; initMainPage();});
});

var initMainPage = function(){
    postdata.posts.sort(function(a, b) {
        return new Date(a.postdate) - new Date(b.postdate);
    });

    Handlebars.getTemplate('header-template');
    Handlebars.getTemplate('navigation-template');
    Handlebars.getTemplate('footer-template');
    Handlebars.getTemplate('main-template');
    Handlebars.getTemplate('about-template');
    Handlebars.getTemplate('post-detail-template');

    //apply footer
    $('nav').replaceWith(Handlebars.templates['navigation-template']({pages: ['Home','About'], menuname: 'Menu'}));
    $('header').replaceWith(Handlebars.templates['header-template']({image: 'first.png', heading: 'Cardboard RPG', sub_heading: 'Low-Poly Turn Based RPG'}));
    $('footer').replaceWith(Handlebars.templates['footer-template']());
    loadMain();
};

var lookupPost = function(page){
    for(var post in postdata.posts){
        if(postdata.posts[post].page == page){
            return postdata.posts[post];
        }
    }

    return undefined;
};

let fetchData = async (name) => {
    let response = await fetch('posts/' + name);
    let data = await response.json();
    return data;
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

var loadMain = function () {
    //grab the top four items from postdata
    let top4 = {posts: postdata.posts.slice(0, 4) };
    $('div#main_block').html(Handlebars.templates['main-template'](top4));
};

var loadNavigation = function (val) {
    if (val.toLowerCase() == 'home') { 
        loadMain();
    } else {
        $('div#main_block').html(Handlebars.templates[val.toLowerCase() + '-template']());
    }
};

var loadPost = function (page) {
    //get post
    let post = lookupPost(page);

    //fecth page, add it to template data
    if(post) {
        $('div#main_block').html(Handlebars.templates['post-detail-template'](post) + fetchPage(`post-${page}.html`));
    }
};
