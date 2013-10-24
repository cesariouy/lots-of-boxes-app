var BoxShowView = {

  listenOnMemberships: function() {
    var that = this;
    that.boxMemberships = new LotsOfBoxesApp.Collections.BoxMemberships(
      that.model.get('box_memberships')
    );
    that.listenTo(that.boxMemberships, "add", function() {
      that.render();
    });
    that.listenTo(that.boxMemberships, "remove", function() {
      that.render();
    });
  },

  listenOnPosts: function() {
    var that = this;
    that.posts = new LotsOfBoxesApp.Collections.Posts(
      that.model.get('posts')
    );
    that.listenTo(that.posts, "add", function() {
      that.model.fetch({
        success: function() {
          that.posts.reset(that.model.get('posts'));
          that.render();
        }
      });
    });
    // that.listenTo(that.posts, "remove", function() {
    //   that.render();
    // });
  },

  renderForm: function() {
    var that = this;
    that.formView = new LotsOfBoxesApp.Views.PostForm({
      model: that.model,
      collection: that.posts
    });
    $('#add-form').html(that.formView.render().el);
  },

  events: {
    "click button.follow": "follow",
    "click button.unfollow": "unfollow"
  },

  findMembership: function() {
    var that = this;
    var boxMembership = that.boxMemberships.findWhere({
      user_id: CURRENT_USER_ID
    });

    return boxMembership;
  },

  constructH2: function(boxType) {
    var that = this;
    var $h2 = $('<h2></h2>');

    var title = that.model.escape('title');
    var idString = that.model.get('id').toString();
    var boxNumStr = " (" + boxType + " #" + idString + ",";
    var numPostsStr = " posts: " + that.model.get('posts').length + ") ";

    var titleContent = title + '<em>' + boxNumStr + numPostsStr + '</em>';
    $h2.html(titleContent);

    return $h2;
  }

};
