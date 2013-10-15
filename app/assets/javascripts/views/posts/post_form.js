LotsOfBoxesApp.Views.PostForm = Backbone.View.extend({
  template: JST['posts/post_form'],

  events: {
    "submit": "submit"
  },

  render: function() {
    var that = this;
    var renderedContent = that.template({box: that.model});
    that.$el.append(renderedContent);
    return that;
  },

  submit: function(event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var post = new LotsOfBoxesApp.Models.Post(formData);
    post.save({}, {
      success: function(savedPost) {
        that.collection.add(savedPost);
      }
    });
  }
});