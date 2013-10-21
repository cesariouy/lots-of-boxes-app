LotsOfBoxesApp.Views.LockboxForm = Backbone.View.extend({
  events: {
    "submit #post-form": "submit",
    "submit #unlock-form": "unlock"
  },

  render: function() {
    var that = this;

    // insert unlock form
    that.$el.html('<h4>unlock box</h4><br>');
    var $unlockForm = $('<form id="unlock-form"></form>');
    var $userIdInput = $(
      '<input type="hidden" name="box_membership[user_id]" value="'
      + CURRENT_USER_ID + '">');
    var $lockboxTitleInput = $(
      '<label>title: <input type="text" name="box_membership[lockbox][title]"></label><br>'
    );
    var $lockboxKeyInput = $(
      '<label>key: <input type="password" name="box_membership[lockbox][key]"></label><br>'
    );

    $unlockForm.append($userIdInput);
    $unlockForm.append($lockboxTitleInput);
    $unlockForm.append($lockboxKeyInput);
    $unlockForm.append('<input type="submit" value="unlock"><br><br>');

    that.$el.append($unlockForm);
    that.$el.append('<h4>OR add new lockBox</h4><br>');

    var newForm = that.modifiedPostForm("lockbox");

    // new title/key inputs
    var keyInput = $(
      '<br><label>key: <input type="password" name="lockbox[key]"></label>'
    );
    $(newForm).prepend(keyInput);

    var titleInput = $(
      '<label>title: <input type="text" name="lockbox[title]"></label>'
    );
    $(newForm).prepend(titleInput);

    that.$el.append(newForm);
    return that;
  },

  submit: function(event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var lockbox = new LotsOfBoxesApp.Models.Lockbox(formData.lockbox);

    lockbox.save({}, {
      success: function(savedBox) {
        $('form').find('input[type="text"]').val('');
        $('form').find('textarea').val('');
        $('form').find('input[type="password"]').val('');
        that.collection.add(savedBox);
      }
    });
  },

  unlock: function(event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var boxMembership = new LotsOfBoxesApp.Models.BoxMembership(
      formData.box_membership);

    boxMembership.save({}, {
      success: function(savedMembership) {
        $('form').find('input[type="text"]').val('');
        $('form').find('input[type="password"]').val('');
        var unlockedBox = savedMembership.get('box');
        that.collection.add(unlockedBox);
      }
    });
  }
});

_.extend(LotsOfBoxesApp.Views.LockboxForm.prototype, BoxFormView);
