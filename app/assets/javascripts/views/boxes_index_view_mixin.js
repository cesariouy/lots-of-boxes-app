var BoxesIndexView = {
  
  listenOnNewBoxes: function() {
    var that = this;
    that.listenTo(that.collection, "add", function() {
      that.collection.fetch({
        reset: true,
        success: function() {
          that.render();
        }
      });
    });
  },
  
  renderShow: function(rootStr) {
    var that = this;
    event.preventDefault();
    var classString = $(event.currentTarget).attr('class');
    that.stopListening();

    // first item in class box id
    var idClass = classString.split(" ")[0];
    Backbone.history.navigate(rootStr + idClass, {trigger: true});
  },
  
  constructListItem: function(box) {
    var $li = $('<li></li>');
    var idString = box.get('id').toString();
    $li.addClass(idString);
    $li.addClass('box-preview');

    // title
    var $h3 = $('<h3></h3>');
    var title = box.escape('title');
    var boxType = box.get('type')
    var boxNumStr = " (" + boxType + " #" + idString + ",";
    var numPostsStr = " posts: " + box.get('posts').length + ")";
    var titleContent = title + boxNumStr + numPostsStr;
    $h3.html(titleContent);

    $li.append($h3);
      
    return $li;
  }
  
};
