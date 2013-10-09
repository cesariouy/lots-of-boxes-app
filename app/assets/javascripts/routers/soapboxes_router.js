LotsOfBoxesApp.Routers.SoapboxesRouter = Backbone.Router.extend({
  initialize: function(soapboxes) {
    this.soapboxes = soapboxes;
  },

  routes: {
    "": "index",
    "soapboxes/:id": "show"
  },

  index: function() {
    var that = this;

    var view = new LotsOfBoxesApp.Views.SoapboxesIndex({
      collection: that.soapboxes
    });

    $('#soap-content').html(view.render().el);
  },

  show: function(boxID) {
    var that = this;

    var box = that.soapboxes.findWhere({id: parseInt(boxID)});

    var view = new LotsOfBoxesApp.Views.SoapboxShow({
      model: box
    });

    $('#soap-content').html(view.render().$el);
  }

});