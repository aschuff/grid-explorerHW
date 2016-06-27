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
