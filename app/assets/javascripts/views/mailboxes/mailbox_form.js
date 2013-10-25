LotsOfBoxesApp.Views.MailboxForm = Backbone.View.extend({
  events: {
    "submit #contact-form": "makeContact"
  },

  render: function() {
    var that = this;

    that.$el.html('<h4>add contact</h4><br>');
    var $contactForm = $('<form id="contact-form"></form>');
    var $fromInput = $(
      '<input type="hidden" name="contact[from]" value="'
      + CURRENT_USER_ID + '">');
    var $toInput = $(
      '<label>username: <input type="text" name="contact[to_str]"></label><br>'
    );

    $contactForm.append($fromInput);
    $contactForm.append($toInput);
    $contactForm.append('<br><input type="submit" value="add contact">');

    that.$el.append($contactForm);
    return that;
  },

  makeContact: function(event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var contact = new LotsOfBoxesApp.Models.Contact(formData.contact);

    contact.save({}, {
      success: function(savedContact) {
        $('form').find('input[type="text"]').val('');
        that.collection.fetch();
      },
      error: function(model, response) {
        alert(response.responseText);
      }
    });
  }

});

_.extend(LotsOfBoxesApp.Views.MailboxForm.prototype, BoxFormView);
