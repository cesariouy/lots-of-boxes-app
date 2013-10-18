LotsOfBoxesApp.Views.MailboxesIndex = Backbone.View.extend({
  initialize: function() {
    var that = this;
    that.listenOnMailboxes();
    that.renderForm();
  },

  listenOnMailboxes: function() {
    var that = this;
    that.listenTo(that.collection, "sync", function() {
      // that.collection.fetch({
      //   reset: true,
      //   success: function() {
      //     that.render();
      //   }
      // });
      that.render();
    });
    // that.listenTo(that.collection, "remove", function() {
    //   that.render();
    // });
  },

  renderForm: function() {
    var that = this;
    that.formView = new LotsOfBoxesApp.Views.MailboxForm({
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
    $('#mail-content').attr('class', 'content index');

    that.$el.html('<h1>mailBox <em>(private messages)</em></h1>');

    var $ul = $('<ul></ul>');

    // boxes should be pre-sorted from controller based on most recent post
    _(that.collection.models).each(function(mailbox) {
      var $li = $('<li></li>');
      var idString = mailbox.get('id').toString();
      $li.addClass(idString);
      $li.addClass('box-preview');

      //  title
      var $h3 = $('<h3></h3>');
      var title = mailbox.escape('title');
      var boxNumStr = " (lockbox #" + idString + ",";
      var numPostsStr = " posts: " + mailbox.get('posts').length + ")";
      var titleContent = title + boxNumStr + numPostsStr;
      $h3.html(titleContent);

      $li.append($h3);

      //  last post
      var lastPost = new LotsOfBoxesApp.Models.Post(
        _(mailbox.get('posts')).first()  // beware first/last issue...
      );

      // // alignment based on box creator, not most recent post
      // var firstPost = new LotsOfBoxesApp.Models.Post(
      //   _(mailbox.get('posts')).last()  // beware first/last issue...
      // );

      // alignment based on last respondent
      if (lastPost.get('user_id') === CURRENT_USER_ID) {
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
    Backbone.history.navigate('mail/' + idClass, {trigger: true});
  }

});

_.extend(LotsOfBoxesApp.Views.MailboxesIndex.prototype, BoxesIndexView);
