LotsOfBoxesApp.Views.SoapboxesIndex = Backbone.View.extend({
  render: function() {
    var that = this;
    that.$el.empty();
    that.$el.html('<h1>soapBoxes</h1>')

    var renderedContent = $('<ul></ul>');

    _(that.collection.models).each(function(soapbox) {
      var $li = $('<li></li>');
      $li.append(
        '<h3>' + soapbox.escape('title') + '</h3>'
      );

      var lastPost = new LotsOfBoxesApp.Models.Post(
        _(soapbox.get('posts')).last()
      );

      var lastPostView = new LotsOfBoxesApp.Views.Post({
        model: lastPost,
        id: lastPost.get('id'),
        className: lastPost.get('align')
      });

      $li.append(lastPostView.render().el);
      renderedContent.prepend($li);
    });

    that.$el.append(renderedContent);
    return that;
  }
});