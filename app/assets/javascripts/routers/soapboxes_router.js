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
    var view = new LotsOfBoxesApp.Views.SoapboxesIndex({
      collection: that.soapboxes
    });

    $('#soap-content').html(view.render().el);
  },

  show: function(boxID) {
    var that = this;
    var box = that.soapboxes.findWhere({id: parseInt(boxID)});

    box.fetch({success: function() {
      var view = new LotsOfBoxesApp.Views.SoapboxShow({model: box});
      $('#soap-content').html(view.render().el);
    }});
  }

});