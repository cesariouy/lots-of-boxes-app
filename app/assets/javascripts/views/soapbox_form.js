LotsOfBoxesApp.Views.SoapboxForm = Backbone.View.extend({
  events: {
    "submit": "submit"
  },

  render: function() {
    var that = this;

    // strip post view of 'reply-to' input
    var postFormView = new LotsOfBoxesApp.Views.PostForm();
    var renderedPostForm = postFormView.render().el;
    var newForm = $(renderedPostForm).children()[0];

    var replyInput = $(newForm).children('label#reply-to')[0];
    $(replyInput).remove();

    // new 'box-title' input
    var titleInput = $(
      '<label>title:<br><input type="text" name="box[title]"></label>'
    );

    $(newForm).prepend(titleInput);

    that.$el.html(newForm);
    return that;
  },

  submit: function(event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var soapbox = new LotsOfBoxesApp.Models.Soapbox(formData.box);
    var firstPost = new LotsOfBoxesApp.Models.Post(formData.post);

    soapbox.save({}, {
      success: function(savedSoapbox) {
        firstPost.set('box_id', savedSoapbox.get('id'));
        firstPost.save();
      }
    });
  }
});