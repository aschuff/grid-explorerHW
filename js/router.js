let MovesModel = require('./models/movesModel');
let LogInView = require('./views/logInView');
let GamePlayView = require('./views/gamePlayView');
let GameoverView = require('./views/gameoverView');

module.exports = Backbone.Router.extend({
  initialize: function(){
    // MODELS
      let movesM = new MovesModel();

    //VIEWS
    this.logInV = new LogInView({
      model: movesM,
      el: document.getElementById('logIn'),
    });
      this.gamePlayV = new GamePlayView({
        model: movesM,
        el: document.getElementById('gameField'),
      });
      this.gameoverV = new GameoverView({
        model: movesM,
        el: document.getElementById('gameOverField')
      });
  },
  routes: {
    'logIn': 'logInNewGame',
    'newGame':'startGame',
    'gameOver':'gameOver',
    '': 'logInNewGame',
  },
  logInNewGame: function(){
    console.log('time to log in!');
    this.logInV.el.classList.remove('hidden');
    this.gamePlayV.el.classList.add('hidden');
    this.gameoverV.el.classList.add('hidden');
  },
  startGame: function(){
    console.log('starting new game');
    this.logInV.el.classList.add('hidden');
    this.gamePlayV.el.classList.remove('hidden');
    this.gameoverV.el.classList.add('hidden');
  },
  gameOver: function(){
    console.log('start over :(');
    this.gameoverV.el.classList.remove('hidden');
    this.gamePlayV.el.classList.add('hidden');
    this.logInV.el.classList.add('hidden');
  },
})
