LotsOfBoxesApp.Routers.SoapboxesRouter = Backbone.Router.extend({
  initialize: function(soapboxes) {
    this.soapboxes = soapboxes;
  },

  routes: {
    "": "redirectToIndex",
    "soap": "index",
    "soap/:id": "show"
  },

  redirectToIndex: function() {
    Backbone.history.navigate('/soap', {trigger: true});
  },

  index: function() {
    var that = this;

    var formView = new LotsOfBoxesApp.Views.SoapboxForm({});
    $('#add-form').html(formView.render().el);

    var view = new LotsOfBoxesApp.Views.SoapboxesIndex({
      collection: that.soapboxes
    });

    $('#soap-content').html(view.render().el);
  },

  show: function(boxID) {
    var that = this;
    var box = that.soapboxes.findWhere({id: parseInt(boxID)});

    var formView = new LotsOfBoxesApp.Views.PostForm({model: box});
    $('#add-form').html(formView.render().el);

    var view = new LotsOfBoxesApp.Views.SoapboxShow({model: box});
    $('#soap-content').html(view.render().el);
  }

});