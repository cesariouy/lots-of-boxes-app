LotsOfBoxesApp.Routers.LockboxesRouter = Backbone.Router.extend({
  initialize: function(lockboxes) {
    this.lockboxes = lockboxes;
  },

  routes: {
    "": "redirectToIndex",
    "lock": "index",
    "lock/:id": "show"
  },

  redirectToIndex: function() {
    Backbone.history.navigate('/lock', {trigger: true});
  },

  index: function() {
    var that = this;
    var view = new LotsOfBoxesApp.Views.LockboxesIndex({
      collection: that.lockboxes
    });

    $('#lock-content').html(view.render().el);
  },

  show: function(boxID) {
    var that = this;
    var box = that.lockboxes.findWhere({id: parseInt(boxID)});

    box.fetch({success: function() {
      var view = new LotsOfBoxesApp.Views.LockboxShow({model: box});
      $('#lock-content').html(view.render().el);
    }});
  }

});