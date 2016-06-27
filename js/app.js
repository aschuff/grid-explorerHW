let MovesModel = require('./models/movesModel');
let MovesView = require('./views/movesView');
let UserModel = require('./models/userModel');
let UserView = require('./views/UserView');

window.addEventListener('load', function(){
// MODELS
  let movesM = new MovesModel();
  let userM = new UserModel();

//VIEWS
  let movesV = new MovesView({
    model: movesM,
    el: document.getElementById('directions'),
  });
  let userV = new UserView({
    model: userM,
    el: document.getElementById('logIn'),
  });
});
