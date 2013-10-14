LotsOfBoxesApp.Views.LockboxesIndex = Backbone.View.extend({
  events: {
    "click li.box-preview": "renderShow"
  },
  render: function() {
    var that = this;
    that.$el.empty();
    $('#lock-content').attr('class', 'content index');

    that.$el.html('<h1>lockBoxes</h1>');

    var $ul = $('<ul></ul>');

    _(that.collection.models).each(function(lockbox) {
      var $li = $('<li></li>');
      var idString = lockbox.get('id').toString();
      $li.addClass(idString);
      $li.addClass('box-preview');

      var $h3 = $('<h3></h3>');
      var titleContent = lockbox.escape('title') + " (box# " + idString + ")";
      $h3.html(titleContent);

      $li.append($h3);

      var lastPost = new LotsOfBoxesApp.Models.Post(
        _(lockbox.get('posts')).first()  // beware first/last issue...
      );

      // alignment based on box creator, not most recent post
      var firstPost = new LotsOfBoxesApp.Models.Post(
        _(lockbox.get('posts')).last() // beware first/last issue...
      );

      if (firstPost.get('user_id') === CURRENT_USER_ID) {
        $li.addClass('left');
      } else {
        $li.addClass('right');
      };

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

    Backbone.history.navigate('lock/' + idClass, {trigger: true});
  }

});