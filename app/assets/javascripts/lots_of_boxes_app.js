window.LotsOfBoxesApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  // initialize: function() {
  //   alert('Hello from Backbone!');
  // }

  initializeSoap: function(soapboxesData) {
    var soapboxes = new LotsOfBoxesApp.Collections.Soapboxes(soapboxesData);
    new LotsOfBoxesApp.Routers.SoapboxesRouter(soapboxes);
    Backbone.history.start();
  }
};

// $(document).ready(function(){
//   LotsOfBoxesApp.initialize();
// });
