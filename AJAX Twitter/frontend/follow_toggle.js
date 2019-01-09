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
            this.$el.text("Follow!");
        } else {
            this.$el.text("Unfollow!");
        }
    }

    handleClick(e) {
        e.preventDefault();
        if (this.followState === "unfollowed") {
            return $.ajax({
                method: 'POST',
                url: `/users/${this.userId}/follow`,
                dataType: 'json',
                success: cb => {
                    this.followState = "followed";
                    this.render();
                    console.log('now following');
                }
            });
        } else {
            return $.ajax({
                method: 'DELETE',
                url: `/users/${this.userId}/follow`,
                dataType: 'json',
                success: cb => {
                    this.followState = "unfollowed";
                    this.render();
                    console.log('no longer following');
                }
            });
        }
        
    }
}

module.exports = FollowToggle;