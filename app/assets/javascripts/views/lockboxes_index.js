LotsOfBoxesApp.Views.LockboxesIndex = Backbone.View.extend({
  events: {
    "click li.box-preview": "renderShow"
  },
  render: function() {
    var that = this;
    that.$el.empty();
    that.$el.html('<h1>lockBoxes</h1>');

    var $ul = $('<ul></ul>');

    _(that.collection.models).each(function(lockbox) {
      var $li = $('<li></li>');
      $li.addClass(lockbox.get('id').toString());
      $li.addClass('box-preview');

      $li.append(
        '<h3>' + lockbox.escape('title') + '</h3>'
      );

      var lastPost = new LotsOfBoxesApp.Models.Post(
        _(lockbox.get('posts')).last()
      );

      $li.addClass(lastPost.get('align'));

      var lastPostView = new LotsOfBoxesApp.Views.Post({
        model: lastPost,
        id: lastPost.get('id')
      });

      $li.append(lastPostView.render().el);
      $ul.prepend($li);
    });

    that.$el.append($ul);
    return that;
  },

  renderShow: function(event) {
    event.preventDefault();
    var classString = $(event.currentTarget).attr('class');

    var idClass = classString.split(" ")[0];

    console.log('clicking');

    Backbone.history.navigate('lock/' + idClass, {trigger: true});
  }

});