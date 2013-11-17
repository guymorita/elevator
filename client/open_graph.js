Template.open_graph.events({
  'click .post' : function () {
    console.log('post');
    yam.getLoginStatus(function(res){
      if(res.authResponse){
        console.log("logged in");

        var payload = {    //use the data object literal to specify parameters, as documented in the REST API section of this developer site
          "letter": "a",
          "page": "2",
        };

        yam.request({
          url: "https://www.yammer.com/api/v1/networks/current.json",     //this is one of many REST endpoints that are available
          method: "GET",
          // data: payload,
          success: function (user) { //print message response information to the console
            console.log("The request was successful.");
            console.log(user);
          },
          error: function (user) {
            console.log("There was an error with the request.");
          }
        });
      } else {
        console.log('logged out');
      }
    });
  }
});