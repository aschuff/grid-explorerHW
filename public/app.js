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

        var MovesModel = require('./models/movesModel');
        var MovesView = require('./views/movesView');
        var UserModel = require('./models/userModel');
        var UserView = require('./views/UserView');

        window.addEventListener('load', function() {
            // MODELS
            var movesM = new MovesModel();
            var userM = new UserModel();

            //VIEWS
            var movesV = new MovesView({
                model: movesM,
                el: document.getElementById('directions')
            });
            var userV = new UserView({
                model: userM,
                el: document.getElementById('logIn')
            });
        });
    }, {
        "./models/movesModel": 2,
        "./models/userModel": 3,
        "./views/UserView": 4,
        "./views/movesView": 5
    }],
    2: [function(require, module, exports) {
        module.exports = Backbone.Model.extend({
            defaults: {
                rightLeftMove: 0,
                upDownMove: 0,
            },

            right: function() {
                if (this.get('rightLeftMove') < 10) {
                    this.set('rightLeftMove', this.get('rightLeftMove') + 1)
                }
            },

            left: function() {
                if (this.get('rightLeftMove') > -10) {
                    this.set('rightLeftMove', this.get('rightLeftMove') - 1)
                }
            },

            up: function() {
                if (this.get('upDownMove') < 10) {
                    this.set('upDownMove', this.get('upDownMove') + 1)
                }
            },
            down: function() {
                if (this.get('upDownMove') > -10) {
                    this.set('upDownMove', this.get('upDownMove') - 1)
                }
            }
        });

    }, {}],
    3: [function(require, module, exports) {
        module.exports = Backbone.Model.extend({
            defaults: {
                username: ''
            },
            // start button function
            startButton: function(userNameValue) {
                this.set('username', userNameValue)
            }
        });

    }, {}],
    4: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                this.model.on('change', this.render, this);
            },
            events: {
                'click #startButton': 'clickStart'
            },
            // start button events
            clickStart: function() {
                let userNameValue = document.getElementById('input').value;
                console.log(userNameValue);
                this.model.startButton(userNameValue);
            },

            render: function() {
                let newUser = this.el.querySelector('#greeting');
                newUser.textContent = `Hello ${this.model.get('username')}!`;
            },
        });

    }, {}],
    5: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                this.model.on('change', this.render, this);
            },

            events: {
                'click #right': 'clickRight',
                'click #left': 'clickLeft',
                'click #up': 'clickUp',
                'click #down': 'clickDown',
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
                let rightButton = this.el.querySelector('#xAxis');
                rightButton.textContent = this.model.get('rightLeftMove');

                let leftButton = this.el.querySelector('#xAxis');
                leftButton.textContent = this.model.get('rightLeftMove');

                let upButton = this.el.querySelector('#yAxis');
                upButton.textContent = this.model.get('upDownMove');

                let downButton = this.el.querySelector('#yAxis');
                downButton.textContent = this.model.get('upDownMove');
            },
        })

    }, {}]
}, {}, [1])