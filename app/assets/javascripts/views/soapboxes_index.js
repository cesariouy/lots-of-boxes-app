LotsOfBoxesApp.Views.SoapboxesIndex = Backbone.View.extend({
  events: {
    "click li.box-preview": "renderShow"
  },
  render: function() {
    var that = this;
    that.$el.empty();
    that.$el.html('<h1>soapBoxes</h1>');

    var boxList = $('<ul></ul>');

    _(that.collection.models).each(function(soapbox) {
      var $li = $('<li class="box-preview"></li>');

      $li.addClass(soapbox.get('id').toString());

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
      boxList.prepend($li);
    });

    that.$el.append(boxList);
    return that;
  },

  renderShow: function(event) {
    event.preventDefault();
    var classString = $(event.currentTarget).attr('class');

    var idClass = classString.split(" ")[1];

    Backbone.history.navigate('/soapboxes/' + idClass, {trigger: true});
  }

});