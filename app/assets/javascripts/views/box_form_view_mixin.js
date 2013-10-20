var BoxFormView = {
  
  modifiedPostForm: function(boxType) {
    var postFormView = new LotsOfBoxesApp.Views.PostForm();
    var renderedPostForm = postFormView.render().el;
    var newForm = $(renderedPostForm).find('form');

    // strip post view of 'box', 'reply-to' inputs
    var boxIdInput = $(newForm).find('[name="post[box_id]"]');
    $(boxIdInput).remove();

    var replyInput = $(newForm).find('#reply-to');
    $(replyInput).remove();

    // rename post[] inputs to box[post][] inputs
    var userIdInput = $(newForm).find('[name="post[user_id]"]');
    userIdInput.attr('name', boxType + '[post][user_id]');

    var bodyInput = $(newForm).find('[name="post[body]"]');
    bodyInput.attr('name', boxType + '[post][body]');

    var linkInput = $(newForm).find('[name="post[link]"]');
    linkInput.attr('name', boxType + '[post][link]');

    var signatureInput = $(newForm).find('[name="post[signature]"]');
    signatureInput.attr('name', boxType + '[post][signature]');

    var alignInput = $(newForm).find('[name="post[align]"]');
    alignInput.attr('name', boxType + '[post][align]');
    
    return newForm;
  }
  
};
