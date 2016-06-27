let MovesModel = require('./models/movesModel');
let MovesView = require('./views/movesView');

window.addEventListener('load', function(){
// MODELS
  let movesM = new MovesModel();

//VIEWS
  let movesV = new MovesView({
    model: movesM,
    el: document.getElementById('directions'),
  })
});
