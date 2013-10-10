LotsOfBoxesApp.Views.PostForm = Backbone.View.extend({
  template: JST['post_form'],

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
    event.preventDefault();
    var that = this;
    console.log(event.target);
    var formData = $(event.target).serializeJSON();
    console.log(formData);

    var post = new LotsOfBoxesApp.Models.Post(formData);
    console.log(post);

    post.save();
  }
});