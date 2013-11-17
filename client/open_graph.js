Template.open_graph.events({
  'click .post' : function () {
    console.log('post');
    yam.getLoginStatus(function(res){
      if(res.authResponse){
        console.log('res', res);
      }
    });
  }
});