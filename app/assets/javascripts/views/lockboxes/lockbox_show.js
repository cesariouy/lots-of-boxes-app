LotsOfBoxesApp.Views.LockboxShow = Backbone.View.extend({
  initialize: function() {
    var that = this;
    that.listenOnMemberships();
    that.listenOnPosts();
    that.renderForm();
  },

  render: function() {
    var that = this;
    that.$el.empty();
    $('#lock-content').attr('class', 'content box');

    // populate heading
    var $h2 = that.constructH2("lockbox");

    if (that.findMembership()) {
      $h2.addClass('following');
    }

    var $unfollowButton = $(
      '<button class="unfollow">LOCK</button>'
    );
    $h2.append($unfollowButton);

    that.$el.html($h2);

    var postList = $('<ul></ul>');

    // iteration first => last
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

_.extend(LotsOfBoxesApp.Views.LockboxShow.prototype, BoxShowView);
