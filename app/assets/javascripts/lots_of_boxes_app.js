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
    Backbone.history.start();
  },

  initializeMail: function(mailboxesData) {
    var mailboxes = new LotsOfBoxesApp.Collections.Mailboxes(mailboxesData);
    new LotsOfBoxesApp.Routers.MailboxesRouter(mailboxes);
    Backbone.history.start();
  }
};
