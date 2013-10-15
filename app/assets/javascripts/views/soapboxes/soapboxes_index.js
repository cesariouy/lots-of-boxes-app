LotsOfBoxesApp.Views.SoapboxesIndex = Backbone.View.extend({
  initialize: function() {
    var that = this;

    that.listenOnSoapboxes();
    that.renderForm();
  },

  listenOnSoapboxes: function() {
    var that = this;
    that.listenTo(that.collection, "add", function() {
      that.collection.fetch({
        success: function() {
          that.render();
        }
      });
    });
    // that.listenTo(that.collection, "remove", function() {
    //   that.render();
    // });
  },

  renderForm: function() {
    var that = this;
    that.formView = new LotsOfBoxesApp.Views.SoapboxForm({
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
    $('#soap-content').attr('class', 'content index');

    that.$el.html('<h1>soapBoxes</h1>');

    var $ul = $('<ul></ul>');

    // boxes should be pre-sorted from controller based on most recent post
    _(that.collection.models).each(function(soapbox) {
      var $li = $('<li></li>');
      var idString = soapbox.get('id').toString();
      $li.addClass(idString);
      $li.addClass('box-preview');

      // title
      var $h3 = $('<h3></h3>');
      var title = soapbox.escape('title');
      var boxNumStr = " (soapbox #" + idString + ",";
      var numPostsStr = " posts: " + soapbox.get('posts').length + ")";
      var titleContent = title + boxNumStr + numPostsStr;
      $h3.html(titleContent);

      $li.append($h3);

      // last post
      var lastPost = new LotsOfBoxesApp.Models.Post(
        _(soapbox.get('posts')).first()  // beware first/last issue...
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
    var that = this;
    event.preventDefault();
    var classString = $(event.currentTarget).attr('class');
    // that.stopListening();

    // first item in class is actually box id
    var idClass = classString.split(" ")[0];
    Backbone.history.navigate('soap/' + idClass, {trigger: true});
  }

});
