module.exports = Backbone.View.extend({

  initialize: function() {
    this.model.on('change', this.render, this);
  },
  events: {

  },
  // start button events
  render: function() {

  },
});
