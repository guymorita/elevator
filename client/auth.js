Users = new Meteor.Collection("users");
Competitions = new Meteor.Collection("competitions");

Meteor.startup(function(){
  yam.connect.loginButton('#yammer-login', function (resp) {
    if (resp.authResponse) {
      Session.set('current_yammer_id', resp.user.id);

      Meteor.call('new_user', resp, function(error, userObj){
        console.log('error', error);
        console.log('result', userObj);
      });
    }
  });

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