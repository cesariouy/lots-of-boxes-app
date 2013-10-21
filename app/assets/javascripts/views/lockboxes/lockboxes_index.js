LotsOfBoxesApp.Views.LockboxesIndex = Backbone.View.extend({
  initialize: function() {
    var that = this;
    that.listenOnNewBoxes();
    that.renderForm();
  },

  renderForm: function() {
    var that = this;
    that.formView = new LotsOfBoxesApp.Views.LockboxForm({
      collection: that.collection
    });
    $('#add-form').html(that.formView.render().el);
  },

  events: {
    "click li.box-preview": "renderShow"
  },

  render: function() {
    var that = this;
    that.$el.empty();
    $('#lock-content').attr('class', 'content index');

    that.$el.html(
      '<h1>lockBoxes <em>(private threads)</em></h1>'
    );

    var $ul = $('<ul></ul>');

    // boxes should be pre-sorted from controller based on most recent post
    _(that.collection.models).each(function(lockbox) {
      var $li = that.constructListItem(lockbox, "lockbox");

      //  last post
      var lastPost = new LotsOfBoxesApp.Models.Post(
        _(lockbox.get('posts')).first()  // beware first/last issue...
      );

      // alignment based on box creator, not most recent post
      var firstPost = new LotsOfBoxesApp.Models.Post(
        _(lockbox.get('posts')).last()  // beware first/last issue...
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
    var that = this;
    event.preventDefault();
    var classString = $(event.currentTarget).attr('class');
    that.stopListening();

    // first item in class is actually box id
    var idClass = classString.split(" ")[0];
    Backbone.history.navigate('lock/' + idClass, {trigger: true});
  }

});

_.extend(LotsOfBoxesApp.Views.LockboxesIndex.prototype, BoxesIndexView);
