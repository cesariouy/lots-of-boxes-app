LotsOfBoxesApp.Views.Post = Backbone.View.extend({
  template: JST['post'],

  render: function() {
    var that = this;
    var renderedContent = that.template({post: that.model});
    that.$el.append(renderedContent);
    return that;
  }

});