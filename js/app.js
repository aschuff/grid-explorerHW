let GameRouter = require('./router');

window.addEventListener('load', function(){
let router = new GameRouter();
Backbone.history.start();

});
