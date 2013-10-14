LotsOfBoxesApp.Views.SoapboxShow = Backbone.View.extend({
  render: function() {
    var that = this;
    that.$el.empty();
    $('#soap-content').attr('class', 'content box');

    var $h2 = $('<h2></h2>');
    var title = that.model.escape('title');
    var idString = that.model.get('id').toString();
    var titleContent = title + " (box# " + idString + ")";

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
