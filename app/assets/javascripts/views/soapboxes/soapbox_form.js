LotsOfBoxesApp.Views.SoapboxForm = Backbone.View.extend({
  events: {
    "submit": "submit"
  },

  render: function() {
    var that = this;
    var postFormView = new LotsOfBoxesApp.Views.PostForm();
    var renderedPostForm = postFormView.render().el;
    var newForm = $(renderedPostForm).find('form');

    // strip post view of 'box', 'reply-to' inputs
    var boxIdInput = $(newForm).find('[name="post[box_id]"]');
    $(boxIdInput).remove();

    var replyInput = $(newForm).find('#reply-to');
    $(replyInput).remove();

    // rename post[] inputs to soapbox[post][] inputs
    var userIdInput = $(newForm).find('[name="post[user_id]"]');
    userIdInput.attr('name', 'soapbox[post][user_id]');

    var bodyInput = $(newForm).find('[name="post[body]"]');
    bodyInput.attr('name', 'soapbox[post][body]');

    var linkInput = $(newForm).find('[name="post[link]"]');
    linkInput.attr('name', 'soapbox[post][link]');

    var signatureInput = $(newForm).find('[name="post[signature]"]');
    signatureInput.attr('name', 'soapbox[post][signature]');

    var alignInput = $(newForm).find('[name="post[align]"]');
    alignInput.attr('name', 'soapbox[post][align]');

    // new 'box-title' input
    var titleInput = $(
      '<label>title:<br><input type="text" name="soapbox[title]"></label>'
    );
    $(newForm).prepend(titleInput);

    that.$el.html(newForm);
    return that;
  },

  submit: function(event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var soapbox = new LotsOfBoxesApp.Models.Soapbox(formData.soapbox);

    soapbox.save({}, {
      success: function(savedBox) {
        $('form').find('input[type="text"]').val('');
        $('form').find('textarea').val('');
        that.collection.add(savedBox);
      }
    });
  }
});

_.extend(LotsOfBoxesApp.Views.SoapboxForm.prototype, BoxFormView);
