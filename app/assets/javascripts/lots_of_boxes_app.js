window.LotsOfBoxesApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initializeSoap: function(soapboxesData) {
    var soapboxes = new LotsOfBoxesApp.Collections.Soapboxes(soapboxesData);
    new LotsOfBoxesApp.Routers.SoapboxesRouter(soapboxes);
    Backbone.history.start();
  },

  initializeLock: function(lockboxesData) {
    var lockboxes = new LotsOfBoxesApp.Collections.Lockboxes(lockboxesData);
    new LotsOfBoxesApp.Routers.LockboxesRouter(lockboxes);
  }
};
