//working
var getCurrentUser = function () {
  yam.request({
    url: "https://www.yammer.com/api/v1/users/current.json",
    method: "GET",
    success: function (user) { //print message response information to the console
      console.log("The request was successful.");
      console.log(user);
    },
    error: function (user) {
      console.log("There was an error with the request.");
    }
  });
};

//not working
var postToActivity = function () {
  var payload = {    //use the data object literal to specify parameters, as documented in the REST API section of this developer site
    "activity":{
      "actor":{"name":"Sidd Singh",
      "email":"sidd@xyz.com"},
      "action":"create",
      "object": {
      "url":"https://www.sched.do",
      "title":"Lunch Meeting"
      },
      "message":"Hey, let’s get sushi!",
      "users":[
      {"name":"Adarsh Pandit",
      "email":"adarsh@xyz.com"}
      ]
    }
  };

  yam.request({
    url: "https://www.yammer.com/api/v1/activity.json",     //this is one of many REST endpoints that are available
    method: "POST",
    data: payload,
    success: function (user) { //print message response information to the console
      console.log("The request was successful.");
      console.log(user);
    },
    error: function (user) {
      console.log("There was an error with the request.");
    }
  });
};

//working
var getAllUsers = function () {
  yam.request({
    url: "https://www.yammer.com/api/v1/users.json",
    method: "GET",
    success: function (data) {
      console.log("The request was successful.");
      console.log(data);
    },
    error: function (data) {
      console.log("There was an error with the request.");
    }
  });
};

Template.open_graph.events({
  'click .post' : function () {
    console.log('post');
    yam.getLoginStatus(function(res){
      if(res.authResponse){
        console.log("logged in");
        getCurrentUser();
      } else {
        console.log('logged out');
      }
    });
  }
});