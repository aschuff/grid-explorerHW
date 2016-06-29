let MovesModel = require('./models/movesModel');
// let ScoreCollection = require('./models/collection')
let LogInView = require('./views/logInView');
let GamePlayView = require('./views/gamePlayView');
let GameoverView = require('./views/gameoverView');

module.exports = Backbone.Router.extend({
  initialize: function(){
    // MODELS
      let movesM = new MovesModel();

    // COLLECTION
    // let highScoreC = new ScoreCollection();

    //VIEWS
    this.logInV = new LogInView({
      model: movesM,
      el: document.getElementById('logIn'),
    });
    movesM.on('letsGo', function(model){
      this.navigate('newGame', {trigger: true})
    }, this)

      this.gamePlayV = new GamePlayView({
        model: movesM,
        el: document.getElementById('gameField'),
      });

      movesM.on('gameEnded', function(model){
        this.navigate('gameOver', {trigger: true})
      },this);

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
    // if(who === null) {
    //   this.navigate('logIn', {trigger:true});
    //   return;
    // }
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
    let self = this;
    let playerStats = new MovesModel()

    playerStats.fetch({
      url: `http://tiny-tiny.herokuapp.com/collections/gridAdventure`,
      success: function(){
        self.gameOver.model = playerStats;
        // self.gameOver.render(`${'id'}`); err: not a function??
      },
    });
    console.log('start over :(');
    this.gameoverV.el.classList.remove('hidden');
    this.gamePlayV.el.classList.add('hidden');
    this.logInV.el.classList.add('hidden');
  },
})
