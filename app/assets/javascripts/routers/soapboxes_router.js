LotsOfBoxesApp.Routers.SoapboxesRouter = Backbone.Router.extend({
  initialize: function(soapboxes) {
    this.soapboxes = soapboxes;
  },

  routes: {
    "": "index",
    "/:id": "show"
  },

  index: function() {
    var that = this;

    var view = new LotsOfBoxesApp.Views.SoapboxesIndex({
      collection: that.soapboxes
    });

    $('#soap-content').html(view.render().$el);
  }
});