LotsOfBoxesApp.Views.SoapboxForm = Backbone.View.extend({
  events: {
    "submit": "submit"
  },

  render: function() {
    var that = this;
    var newForm = that.modifiedPostForm("soapbox");

    // new 'box-title' input
    var titleInput = $(
      '<label>title: <input type="text" name="soapbox[title]"></label>'
    );

    var $h4 = $('<h4>add soapBox</h4><br>')
    $(newForm).prepend(titleInput);
    $(newForm).prepend($h4);

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
