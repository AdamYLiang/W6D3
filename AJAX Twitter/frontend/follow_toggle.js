const APIUtil = require('./api_util.js');

class FollowToggle {
    constructor (button, option) {
        this.$el = $(button);
        this.userId = $(button).data('user-id'); 
        this.followState = this.$el.data('initial-follow-state');
        
        this.render();
        this.$el.on('click', (e) => this.handleClick(e));

    }

    render() {
        if(this.followState === "unfollowed") {
            this.$el.prop("disabled", false);
            this.$el.text("Follow!");
        } else if (this.followState === "followed") {
            this.$el.prop("disabled", false);
            this.$el.text("Unfollow!");
        } else if (this.followState === "following" || "unfollowing"){
            this.$el.prop("disabled", true);
        }
    }

    handleClick(e) {
        e.preventDefault();
        if (this.followState === "unfollowed") {
            this.followState = "following";
            this.render();

            APIUtil.followUser(this.userId).then( () => {
                this.followState = "followed";
                this.render();
            });
        } else {
            this.followState = "unfollowing";
            this.render();
            
            APIUtil.unfollowUser(this.userId).then( () => {
                this.followState = "unfollowed";
                this.render();
            });
        }
        
    }
}

module.exports = FollowToggle;