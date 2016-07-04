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
