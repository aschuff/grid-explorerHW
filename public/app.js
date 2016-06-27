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

        window.addEventListener('load', function() {
            // MODELS
            var movesM = new MovesModel();

            //VIEWS
            var movesV = new MovesView({
                model: movesM,
                el: document.getElementById('directions')
            });
        });
    }, {
        "./models/movesModel": 2,
        "./views/movesView": 3
    }],
    2: [function(require, module, exports) {
        module.exports = Backbone.Model.extend({
            defaults: {
                rightMove: 0,
                leftMove: 0,
                upMove: 0,
                downMove: 0,
            },

            right: function() {
                if (this.get('rightMove') < 10) {
                    this.set('rightMove', this.get('rightMove') + 1)
                }
            },

            left: function() {
                if (this.get('leftMove') > -10) {
                    this.set('leftMove', this.get('leftMove') - 1)
                }
            },

            up: function() {
                if (this.get('upMove') < 10) {
                    this.set('upMove', this.get('upMove') + 1)
                }
            },

            down: function() {
                if (this.get('downMove') > -10) {
                    this.set('downMove', this.get('downMove') - 1)
                }
            }
        });

    }, {}],
    3: [function(require, module, exports) {
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
                let rightButton = this.el.querySelector('#rightXY');
                rightButton.textContent = this.model.get('rightMove');

                let leftButton = this.el.querySelector('#leftXY');
                leftButton.textContent = this.model.get('leftMove');

                let upButton = this.el.querySelector('#upXY');
                upButton.textContent = this.model.get('upMove');

                let downButton = this.el.querySelector('#downXY');
                downButton.textContent = this.model.get('downMove');
            },
        })

    }, {}]
}, {}, [1])