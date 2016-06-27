module.exports = Backbone.Model.extend({
    defaults: {
      username: ''
    },
    // start button function
    startButton: function(userNameValue){
      this.set('username', userNameValue)
    }
  });
