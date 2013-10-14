LotsOfBoxesApp.Views.SoapboxShow = Backbone.View.extend({
  initialize: function() {
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
    $('#soap-content').attr('class', 'content box');

    // populate heading
    var $h2 = $('<h2></h2>');
    if (that.findMembership()) {
      $h2.addClass('following');
    }

    var title = that.model.escape('title');
    var idString = that.model.get('id').toString();
    var boxNumStr = " (soapbox #" + idString + ",";
    var numPostsStr = " posts: " + that.model.get('posts').length + ") ";
    var titleContent = title + boxNumStr + numPostsStr;
    $h2.html(titleContent);

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
    var reversedPosts = that.model.get('posts');
    var unReversedPosts = reversedPosts.reverse();
    var posts = new LotsOfBoxesApp.Collections.Posts(unReversedPosts);

    _(posts.models).each(function(post) {
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
      wait: true,
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
      wait: true,
      success: function() {
      }
    });
  }

});
