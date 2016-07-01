(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        'use strict';

        var MovesModel = require('./models/mainModel');
        var PlayerTypeCollection = require('./models/playerTypeCollection');
        var HighScoreCollection = require('./models/highScoreCollection');
        var LogInView = require('./views/logInView');
        var GamePlayView = require('./views/gamePlayView');
        var GameoverView = require('./views/gameoverView');

        module.exports = Backbone.Router.extend({
            initialize: function initialize() {
                // MODEL
                var movesM = new MovesModel();

                //VIEWS
                this.logInV = new LogInView({
                    model: movesM,
                    el: document.getElementById('logIn')
                });
                movesM.on('letsGo', function(model) {
                    console.log(model);
                    this.navigate('newGame', {
                        trigger: true
                    });
                }, this);

                this.gamePlayV = new GamePlayView({
                    model: movesM,
                    el: document.getElementById('gameField')
                });

                movesM.on('gameEnded', function(model) {
                    this.navigate('gameOver', {
                        trigger: true
                    });
                }, this);

                this.gameoverV = new GameoverView({
                    model: movesM,
                    el: document.getElementById('gameOverField')
                });
                // HIGH SCORE STUFF??
                // let highscores = new highScoreCollection({
                //   highscores.fetch({
                //     success: function(){
                //       console.log('got the highscores');
                //     }
                //   })
                // });
            },
            routes: {
                'logIn': 'logInNewGame',
                'newGame': 'startGame',
                'gameOver': 'gameOver',
                '': 'logInNewGame'
            },
            logInNewGame: function logInNewGame() {
                // if(who === null) {
                //   this.navigate('logIn', {trigger:true});
                //   return;
                // }
                console.log('time to log in!');
                this.logInV.el.classList.remove('hidden');
                this.gamePlayV.el.classList.add('hidden');
                this.gameoverV.el.classList.add('hidden');
            },
            startGame: function startGame() {
                console.log('starting new game');
                this.logInV.el.classList.add('hidden');
                this.gamePlayV.el.classList.remove('hidden');
                this.gameoverV.el.classList.add('hidden');
            },
            gameOver: function gameOver() {
                // let self = this;
                // let newHighScore = new HighScoreCollection()
                // self.newHighScore.fetch({
                //     success: function() {
                //       console.log(self.newHighScore);
                //         self.gameOver.model = newHighScore;
                //         self.gameOver.render();
                //     },
                // });
                console.log('start over :(');
                this.gameoverV.el.classList.remove('hidden');
                this.gamePlayV.el.classList.add('hidden');
                this.logInV.el.classList.add('hidden');
            }
        });
    }, {
        "./models/highScoreCollection": 2,
        "./models/mainModel": 4,
        "./models/playerTypeCollection": 5,
        "./views/gamePlayView": 7,
        "./views/gameoverView": 8,
        "./views/logInView": 9
    }],
    2: [function(require, module, exports) {
        let HighScoreModel = require('./highScoreModel');

        module.exports = Backbone.Collection.extend({
            initialize: function() {
                let highScoreC = new HighScoreCollection()
                let self2 = this;
                self2.highScoreC.fetch({
                    success: function() {
                        console.log((self2.highScoreC));
                        self2.highScoreC.model = highScoreC;
                        self2.highScoreC.render(highScoreC);
                    }
                });
            },
            url: 'http://grid.queencityiron.com/api/highscore',
            model: HighScoreModel,
        });

    }, {
        "./highScoreModel": 3
    }],
    3: [function(require, module, exports) {
        module.exports = Backbone.Model.extend({
            url: 'http://grid.queencityiron.com/api/highscore',
            defaults: {
                username: '',
                startingEnergy: 0,
                name: '',
            },
        });

    }, {}],
    4: [function(require, module, exports) {
        let PlayerTypeCollection = require('./playerTypeCollection');
        let HighScoreCollection = require('./highScoreCollection');
        let PlayerType = require('./playerTypeModel');
        let HighScore = require('./highScoreModel');

        module.exports = Backbone.Model.extend({
            initialize: function() {
                let self = this;
                self.collectionOfTypes = new PlayerTypeCollection();
                self.collectionOfTypes.fetch({
                    success: function() {
                        console.log(self.collectionOfTypes);
                        self.collectionOfTypes.trigger('typesLoaded');
                    }
                }); // send types to a view after this?
                let newHighScore = new HighScore({
                    username: this.get('username'),
                    name: this.get('name'),
                    score: this.get('moveCount'),
                });
                newHighScore.save();
            },
            // url: 'http://grid.queencityiron.com/api/players',
            defaults: {
                username: '',
                name: '',
                startingEnergy: 20,
                moveCount: 0,
                energyPerMove: 0,
                rightLeftMove: 0,
                upDownMove: 0,
            },
            setPlayerType: function(type) {
                let target = this.collectionOfTypes.find(function(collectionOfTypes) {
                    return collectionOfTypes.get('name') === type;
                });
                this.set('name', type)
                this.set('startingEnergy', target.get('startingEnergy'));
                this.set('energyPerMove', target.get('energyPerMove'));
                console.log('setting player type');
            },
            startButton: function(userNameValue) {
                this.set('username', userNameValue)
                this.trigger('letsGo', this)
                this.set('rightLeftMove', 0)
                this.set('upDownMove', 0)
                this.set('moveCount', 0)
                    // this.set('input', null)
                    // this.set('username', this.get('username'.innerHtml === '')) need to clear username
            },
            sendScore: function() {
                this.model.get('username');
                this.model.get('name');
                this.model.get('moveCount');
                this.save();
            },
            playAgain: function() {
                this.trigger('startOver', this);
                this.clear({
                    silent: true
                });
                this.set(this.defaults)
            },
            right: function() {
                if (this.get('rightLeftMove') < 10) {
                    this.set('rightLeftMove', this.get('rightLeftMove') + 1)
                    this.set('moveCount', this.get('moveCount') + 1)
                    this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
                }
                if (this.get('startingEnergy') <= 0) {
                    this.trigger('gameEnded', this)
                }
            },
            left: function() {
                if (this.get('rightLeftMove') > -10) {
                    this.set('rightLeftMove', this.get('rightLeftMove') - 1)
                    this.set('moveCount', this.get('moveCount') + 1)
                    this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
                }
                if (this.get('startingEnergy') <= 0) {
                    this.trigger('gameEnded', this)
                }
            },
            up: function() {
                if (this.get('upDownMove') < 10) {
                    this.set('upDownMove', this.get('upDownMove') + 1)
                    this.set('moveCount', this.get('moveCount') + 1)
                    this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
                }
                if (this.get('startingEnergy') <= 0) {
                    this.trigger('gameEnded', this)
                }
            },
            down: function() {
                if (this.get('upDownMove') > -10) {
                    this.set('upDownMove', this.get('upDownMove') - 1)
                    this.set('moveCount', this.get('moveCount') + 1)
                    this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
                }
                if (this.get('startingEnergy') <= 0) {
                    this.trigger('gameEnded', this)
                }
            },
        });

    }, {
        "./highScoreCollection": 2,
        "./highScoreModel": 3,
        "./playerTypeCollection": 5,
        "./playerTypeModel": 6
    }],
    5: [function(require, module, exports) {
        let PlayerTypeModel = require('./playerTypeModel');

        module.exports = Backbone.Collection.extend({
            url: 'http://grid.queencityiron.com/api/players',
            model: PlayerTypeModel,
        });

    }, {
        "./playerTypeModel": 6
    }],
    6: [function(require, module, exports) {
        module.exports = Backbone.Model.extend({
            url: 'http://grid.queencityiron.com/api/players',
            defaults: {
                name: '',
                energyPerMove: 0,
                startingEnergy: 0
            },
        });


    }, {}],
    7: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                this.model.on('change', this.render, this);
            },

            events: {
                'click #startingEnergy': 'totalEnergy',
                'click #userMoves': 'totalMoves',
                'click #right': 'clickRight',
                'click #left': 'clickLeft',
                'click #up': 'clickUp',
                'click #down': 'clickDown',
            },
            totalEnergy: function() {
                this.model.startingEnergy();
            },

            totalMoves: function() {
                this.model.userMoves();
            },
            clickRight: function() {
                this.model.right();
            },
            clickLeft: function() {
                this.model.left();
            },
            clickUp: function() {
                this.model.up();
            },
            clickDown: function() {
                this.model.down();
            },

            render: function() {
                console.log('rendering');
                let rightButton = this.el.querySelector('#xAxis');
                rightButton.textContent = this.model.get('rightLeftMove');

                let leftButton = this.el.querySelector('#xAxis');
                leftButton.textContent = this.model.get('rightLeftMove');

                let upButton = this.el.querySelector('#yAxis');
                upButton.textContent = this.model.get('upDownMove');

                let downButton = this.el.querySelector('#yAxis');
                downButton.textContent = this.model.get('upDownMove');

                let allMovesTotal = this.el.querySelector('#userMoves');
                allMovesTotal.textContent = `Total Moves: ${this.model.get('moveCount')}`;

                let energyLevel = this.el.querySelector('#startingEnergy');
                energyLevel.textContent = `Total Energy: ${this.model.get('startingEnergy')}`;
            },
        });

    }, {}],
    8: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                this.model.on('change', this.render, this);
            },
            events: {
                'click #playAgain': 'newGame',
            },
            newGame: function() {
                this.model.playAgain();
                this.model.sendScore();
            },
        });

    }, {}],
    9: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                this.model.on('change', this.render, this);
                this.model.collectionOfTypes.on('typesLoaded', this.render, this);
            },
            events: {
                // 'click #smallCharacter': 'smallChar',
                // 'click #largeCharacter': 'largeChar',
                'click .playerSize': 'clickCharButton',
                'click #startButton': 'clickStart',
            },
            // smallChar: function(){
            //   console.log('little one');
            //   this.model.smallCharacter();
            // },
            // largeChar: function(){
            //   console.log('big one');
            //   this.model.largeCharacter();
            // },
            clickCharButton: function(event) {
                let character = event.target.textContent;
                this.model.setPlayerType(character);
                // this.trigger('')
            },

            clickStart: function() {
                let userNameValue = document.getElementById('input').value;
                console.log(userNameValue);
                this.model.startButton(userNameValue);
            },

            render: function() {
                let newUser = this.el.querySelector('#greeting');
                newUser.textContent = `Hello ${this.model.get('username')}!`;
                // console.log('rendered');

                this.model.collectionOfTypes.forEach(function(model) {
                    // console.log(model.get('name'));/
                    let sizeButtons = document.createElement('button');
                    sizeButtons.classList.add('playerSize')
                    let appendedContainer = document.getElementById('charChoice');
                    sizeButtons.textContent = `${model.get('name')}`;
                    // appendedContainer.innerHtml = ''; need to get duplicated buttons to stop
                    // sizeButtons.innerHtml = '';
                    appendedContainer.appendChild(sizeButtons);
                })
            },
        });

    }, {}]
}, {}, [1])