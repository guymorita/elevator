Template.open_graph.events({
  'click .post' : function () {
    console.log('post');
    yam.getLoginStatus(function(res){
      console.log('res', res);
    });
  }
});