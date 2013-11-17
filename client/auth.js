Users = new Meteor.Collection("users");
Competitions = new Meteor.Collection("competitions");

var get_friends = function(){
  yam.request({
    url: "https://www.yammer.com/api/v1/users.json",
    method: "GET",
    success: function (data) {
      console.log("The request was successful.");
      Session.set('friends', data); //output
    },
    error: function (data) {
      console.log("There was an error with the request.");
    }
  });
};

Meteor.startup(function(){
  yam.connect.loginButton('#yammer-login', function (resp) {
    if (resp.authResponse) {
      Session.set('current_yammer_id', resp.user.id);

      Meteor.call('new_user', resp, function(error, userObj){
        console.log('error', error);
        console.log('result', userObj);
      });

      get_friends();

    }
  });

  //dummy data
  Session.set('current_competition_id', 'fwqgvwvRrKiKLSMtv');

});

Template.yammer_login.yammer_id = function(){
  return Session.get('current_yammer_id');
};

Template.yammer_login.events({
  'click .logout' : function () {
    console.log("Logout");
    yam.getLoginStatus(
      function(response) {
        if(response.authResponse) {
          yam.logout(function (response) {
            console.log("user was logged out");
            Session.set('current_yammer_id', undefined);
          });
        }
      }
    );
  }
});