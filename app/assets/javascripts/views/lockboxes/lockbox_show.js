LotsOfBoxesApp.Views.LockboxShow = Backbone.View.extend({
  render: function() {
    var that = this;
    that.$el.empty();
    $('#lock-content').attr('class', 'content box');

    var $h2 = $('<h2></h2>');
    var title = that.model.escape('title');
    var idString = that.model.get('id').toString();
    var boxNumStr = " (lockbox #" + idString + ",";
    var numPostsStr = " posts: " + that.model.get('posts').length + ")";
    var titleContent = title + boxNumStr + numPostsStr;

    $h2.html(titleContent);
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
  }
});
