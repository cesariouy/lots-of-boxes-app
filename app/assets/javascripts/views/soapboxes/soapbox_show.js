LotsOfBoxesApp.Views.SoapboxShow = Backbone.View.extend({
  initialize: function() {
    var that = this;
    that.listenOnMemberships();
    that.listenOnPosts();
    that.renderForm();
  },

  render: function() {
    var that = this;
    that.$el.empty();
    $('#soap-content').attr('class', 'content box');

    // populate heading
    var $h2 = that.constructH2("soapbox");

    if (that.findMembership()) {
      $h2.addClass('following');
    }

    var $followButton = $(
      '<button class="follow">follow</button>'
    );
    var $unfollowButton = $(
      '<button class="unfollow">unfollow</button>'
    );
    $h2.append($followButton);
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

  follow: function(event) {
    var that = this;
    event.preventDefault();

    var boxMembership = new LotsOfBoxesApp.Models.BoxMembership({
      box_id: that.model.get('id'),
      user_id: CURRENT_USER_ID
    });

    boxMembership.save({}, {
      success: function(savedMembership) {
        that.boxMemberships.add(savedMembership);
      }
    });
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

_.extend(LotsOfBoxesApp.Views.SoapboxShow.prototype, BoxShowView);
