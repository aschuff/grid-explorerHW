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
