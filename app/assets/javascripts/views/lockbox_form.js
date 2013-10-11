LotsOfBoxesApp.Views.LockboxForm = Backbone.View.extend({
  events: {
    "submit #post-form": "submit",
    "submit #unlock-form": "unlock"
  },

  render: function() {
    var that = this;

    // insert unlock form
    that.$el.html('<h4>unlock a box</h4>');
    var $unlockForm = $('<form id="unlock-form"></form>');
    var $userIdInput = $(
      '<input type="hidden" name="box_membership[user_id]" value="'
      + CURRENT_USER_ID + '">');
    var $lockBoxTitleInput = $(
      '<label>title: <input type="text" name="box_membership[lockbox][title]"></label><br>'
    );
    var $lockBoxKeyInput = $(
      '<label>key: <input type="password" name="box_membership[lockbox][key]"></label><br>'
    );

    $unlockForm.append($userIdInput);
    $unlockForm.append($lockBoxTitleInput);
    $unlockForm.append($lockBoxKeyInput);
    $unlockForm.append('<input type="submit" value="unlock">');

    that.$el.append($unlockForm);
    that.$el.append('<h4>--OR-- add new lockBox</h4>');

    // strip post view of 'reply-to' input
    var postFormView = new LotsOfBoxesApp.Views.PostForm();
    var renderedPostForm = postFormView.render().el;
    var newForm = $(renderedPostForm).children()[0];

    var replyInput = $(newForm).children('label#reply-to')[0];
    $(replyInput).remove();

    // new title/key inputs
    var keyInput = $(
      '<br><label>key:<br><input type="password" name="box[key]"></label>'
    );
    $(newForm).prepend(keyInput);

    var titleInput = $(
      '<label>title:<br><input type="text" name="box[title]"></label>'
    );
    $(newForm).prepend(titleInput);

    that.$el.append(newForm);
    return that;
  },

  submit: function(event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var lockbox = new LotsOfBoxesApp.Models.Lockbox(formData.box);
    var firstPost = new LotsOfBoxesApp.Models.Post(formData.post);

    lockbox.save({}, {
      success: function(savedSoapbox) {
        firstPost.set('box_id', savedSoapbox.get('id'));
        firstPost.save();
      }
    });
  },

  unlock: function(event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var boxMembership = new LotsOfBoxesApp.Models.BoxMembership(
      formData.box_membership);
      console.log(formData);
    boxMembership.save();
  }
});
