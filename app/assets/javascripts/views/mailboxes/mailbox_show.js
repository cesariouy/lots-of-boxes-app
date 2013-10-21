LotsOfBoxesApp.Views.MailboxShow = Backbone.View.extend({
  initialize: function() {
    var that = this;
    that.listenOnPosts();
    that.renderForm();
  },

  render: function() {
    var that = this;
    that.$el.empty();
    $('#mail-content').attr('class', 'content box');

    // populate heading
    var $h2 = that.constructH2("mailbox");

    that.$el.html($h2);

    var postList = $('<ul></ul>');

    // beware iteration (first => last / last => first)
    var clonedPosts = that.posts.clone();
    var sortedPosts = _(clonedPosts.models).sortBy(function(post) {
      return post.get('id');
    });

    _(sortedPosts).each(function(post) {
      var $li = $('<li></li>');

      // posts should align based on author
      var postAlign;
      if (post.get('user_id') === CURRENT_USER_ID) {
        postAlign = 'left';
      } else {
        postAlign = 'right';
      };


      var postView = new LotsOfBoxesApp.Views.Post({
        model: post,
        id: post.get('id'),
        className: 'post ' + postAlign
      });

      $li.html(postView.render().el);
      postList.append($li);
    });

    that.$el.append(postList);
    return that;
  }// ,
//
//   unfollow: function(event) {
//     var that = this;
//     event.preventDefault();
//
//     var boxMembership = that.findMembership();
//     boxMembership.destroy({
//       success: function() {
//       }
//     });
//   }

});

_.extend(LotsOfBoxesApp.Views.MailboxShow.prototype, BoxShowView);
