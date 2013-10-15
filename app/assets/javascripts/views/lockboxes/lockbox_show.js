LotsOfBoxesApp.Views.LockboxShow = Backbone.View.extend({
  initialize: function() {
    var that = this;
    that.listenOnMemberships();
    that.listenOnPosts();
    that.renderForm();
  },

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

  render: function() {
    var that = this;
    that.$el.empty();
    $('#lock-content').attr('class', 'content box');

    // populate heading
    var $h2 = $('<h2></h2>');
    if (that.findMembership()) {
      $h2.addClass('following');
    }

    var title = that.model.escape('title');
    var idString = that.model.get('id').toString();
    var boxNumStr = " (lockbox #" + idString + ",";
    var numPostsStr = " posts: " + that.model.get('posts').length + ") ";
    var titleContent = title + boxNumStr + numPostsStr;
    $h2.html(titleContent);

    var $unfollowButton = $(
      '<button class="unfollow">LOCK</button>'
    );
    $h2.append($unfollowButton);

    that.$el.html($h2);

    var postList = $('<ul></ul>');

    // beware iteration (first => last / last => first)
    var clonedPosts = that.posts.clone();
    var sortedPosts = _(clonedPosts.models).sortBy(function(post) {
      return post.get('id');
    });

    _(sortedPosts).each(function(post) {
      var $li = $('<li></li>');

      var postView = new LotsOfBoxesApp.Views.Post({
        model: post,
        id: post.get('id'),
        className: 'post ' + post.get('align')
      });

      $li.html(postView.render().el);
      postList.append($li);
    });

    that.$el.append(postList);
    return that;
  },

  unfollow: function(event) {
    var that = this;
    event.preventDefault();

    var boxMembership = that.findMembership();
    boxMembership.destroy({
      success: function() {
      }
    });
  }

});
