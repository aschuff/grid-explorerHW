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
            },
            routes: {
                'logIn': 'logInNewGame',
                'newGame': 'startGame',
                'gameOver': 'gameOver',
                '': 'logInNewGame'
            },
            logInNewGame: function logInNewGame() {
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
                self.collectionOfHighScores = new HighScoreCollection();
                self.collectionOfHighScores.fetch({
                    success: function() {
                        console.log(self.collectionOfHighScores);
                        self.collectionOfHighScores.trigger('scoresLoaded');
                    }
                });
            },
            // url: 'http://grid.queencityiron.com/api/players',
            defaults: {
                username: '',
                name: '',
                startingEnergy: 20,
                score: 0,
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
                this.set('score', 0)
                    // this.set('input', null)
                    // this.set('username', this.get('username'.innerHtml === '')) need to clear username
            },
            sendScore: function() {
                this.get('username')
                this.get('name')
                this.get('score')
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
                    this.set('score', this.get('score') + 1)
                    this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
                }
                if (this.get('startingEnergy') <= 0) {
                    this.trigger('gameEnded', this)
                }
            },
            left: function() {
                if (this.get('rightLeftMove') > -10) {
                    this.set('rightLeftMove', this.get('rightLeftMove') - 1)
                    this.set('score', this.get('score') + 1)
                    this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
                }
                if (this.get('startingEnergy') <= 0) {
                    this.trigger('gameEnded', this)
                }
            },
            up: function() {
                if (this.get('upDownMove') < 10) {
                    this.set('upDownMove', this.get('upDownMove') + 1)
                    this.set('score', this.get('score') + 1)
                    this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
                }
                if (this.get('startingEnergy') <= 0) {
                    this.trigger('gameEnded', this)
                }
            },
            down: function() {
                if (this.get('upDownMove') > -10) {
                    this.set('upDownMove', this.get('upDownMove') - 1)
                    this.set('score', this.get('score') + 1)
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
            gridGenerator: function() {
                let myGrid = document.getElementById('gridArea');
                myGrid.innerHTML = '';
                console.log(myGrid);

                let size = 10;
                for (var y = 0; y < size; y++) {
                    let row = document.createElement('div');
                    row.classList.add('row');
                    for (var x = 0; x < size; x++) {
                        let cell = document.createElement('div');
                        cell.classList.add('cell');
                        row.appendChild(cell);
                        if (this.model.get('upDownMove') === y && this.model.get('rightLeftMove') === x) {
                            cell.setAttribute('id', 'player')
                        }
                    }
                    myGrid.appendChild(row);
                }
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
                let playerInfo = this.el.querySelector('#playerInfo');
                playerInfo.textContent = `Username: ${this.model.get('username')}  Character: ${this.model.get('name')}`

                let rightButton = this.el.querySelector('#xAxis');
                rightButton.textContent = this.model.get('rightLeftMove');

                let leftButton = this.el.querySelector('#xAxis');
                leftButton.textContent = this.model.get('rightLeftMove');

                let upButton = this.el.querySelector('#yAxis');
                upButton.textContent = this.model.get('upDownMove');

                let downButton = this.el.querySelector('#yAxis');
                downButton.textContent = this.model.get('upDownMove');

                let allMovesTotal = this.el.querySelector('#userMoves');
                allMovesTotal.textContent = `Total Moves ${this.model.get('score')}`;

                let energyLevel = this.el.querySelector('#startingEnergy');
                energyLevel.textContent = `Total Energy ${this.model.get('startingEnergy')}`;

                // Grid
                this.gridGenerator();
            },
        });

    }, {}],
    8: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                this.model.collectionOfHighScores.on('scoresLoaded', this.render, this);
            },
            events: {
                'click #playAgain': 'newGame',
            },
            newGame: function() {
                this.model.playAgain();
                this.model.sendScore();
            },
            render: function() {
                let finalScore = this.el.querySelector('#scoreBoard')
                finalScore.textContent = `Final score: ${this.model.get('score')}`;


                let renderScores = this.el.querySelector('#highScoreList')
                let self = this;
                this.model.collectionOfHighScores.forEach(function(model) {
                    let scoreList = document.createElement('li')
                    console.log(model);
                    scoreList.textContent = `${model.get('playerType')} ${model.get('name')} ${model.get('score')} `;
                    renderScores.appendChild(scoreList);
                })
            },
        });

    }, {}],
    9: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                // this.model.on('change', this.render, this);
                this.model.collectionOfTypes.on('typesLoaded', this.render, this);
            },
            events: {
                'click .playerSize': 'clickCharButton',
                'click #startButton': 'clickStart',
            },
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
                newUser.textContent = `Hello${this.model.get('username')}!`;
                // Generating size buttons on load of the page
                this.model.collectionOfTypes.forEach(function(model) {
                    let sizeButtons = document.createElement('button');
                    sizeButtons.classList.add('playerSize')
                    let appendedContainer = document.getElementById('charChoice');
                    sizeButtons.textContent = `${model.get('name')}`;
                    appendedContainer.appendChild(sizeButtons);
                })
            },
        });

    }, {}]
}, {}, [1])