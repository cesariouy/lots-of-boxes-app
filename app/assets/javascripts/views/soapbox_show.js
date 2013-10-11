LotsOfBoxesApp.Views.SoapboxShow = Backbone.View.extend({
  render: function() {
    var that = this;
    that.$el.empty();

    var title = $('<h2></h2>');
    title.html(that.model.escape('title'));
    that.$el.html(title);

    var postList = $('<ul></ul>');
    var posts = new LotsOfBoxesApp.Collections.Posts(that.model.get('posts'));

    // for some reason this iterates from the last post to the first...
    _(posts.models).each(function(post) {
      var $li = $('<li></li>');

      var postView = new LotsOfBoxesApp.Views.Post({
        model: post,
        id: post.get('id'),
        className: 'post ' + post.get('align')
      });

      $li.html(postView.render().el);
      postList.prepend($li);
    });

    that.$el.append(postList);
    return that;
  }
});
