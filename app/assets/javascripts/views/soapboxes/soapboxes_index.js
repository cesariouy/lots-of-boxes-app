LotsOfBoxesApp.Views.SoapboxesIndex = Backbone.View.extend({
  initialize: function() {
    var that = this;
    that.listenOnNewBoxes();
    that.renderForm();
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

    that.$el.html(
      '<h1>soapBoxes <em>(public discussions)</em></h1>'
    );

    var $ul = $('<ul></ul>');

    // boxes should be pre-sorted from controller based on most recent post
    _(that.collection.models).each(function(soapbox) {
      var $li = that.constructListItem(soapbox, "soapbox");

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
    that.stopListening();

    // first item in class is actually box id
    var idClass = classString.split(" ")[0];
    Backbone.history.navigate('soap/' + idClass, {trigger: true});
  }

});

_.extend(LotsOfBoxesApp.Views.SoapboxesIndex.prototype, BoxesIndexView);
