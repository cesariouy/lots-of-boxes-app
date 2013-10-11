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

    var formView = new LotsOfBoxesApp.Views.LockboxForm({});
    $('#add-form').html(formView.render().el);

    var view = new LotsOfBoxesApp.Views.LockboxesIndex({
      collection: that.lockboxes
    });

    $('#lock-content').html(view.render().el);
  },

  show: function(boxID) {
    var that = this;
    var box = that.lockboxes.findWhere({id: parseInt(boxID)});

    var formView = new LotsOfBoxesApp.Views.PostForm({model: box});
    $('#add-form').html(formView.render().el);

    var view = new LotsOfBoxesApp.Views.LockboxShow({model: box});
    $('#lock-content').html(view.render().el);
  }

});