LotsOfBoxesApp.Routers.MailboxesRouter = Backbone.Router.extend({
  initialize: function(mailboxes) {
    this.mailboxes = mailboxes;
  },

  routes: {
    "": "redirectToIndex",
    "mail": "index",
    "mail/:id": "show"
  },

  redirectToIndex: function() {
    Backbone.history.navigate('/mail', {trigger: true});
  },

  index: function() {
    var that = this;
    var view = new LotsOfBoxesApp.Views.MailboxesIndex({
      collection: that.mailboxes
    });

    $('#mail-content').html(view.render().el);
  },

  show: function(boxID) {
    var that = this;
    var box = that.mailboxes.findWhere({id: parseInt(boxID)});

    box.fetch({success: function() {
      var view = new LotsOfBoxesApp.Views.MailboxShow({model: box});
      $('#mail-content').html(view.render().el);
    }});
  }

});