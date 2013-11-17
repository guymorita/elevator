Users = new Meteor.Collection("users");
Competitions = new Meteor.Collection("competitions");

Meteor.startup(function(){
  yam.connect.loginButton('#yammer-login', function (resp) {
    if (resp.authResponse) {
      Session.set('current_yammer_id', resp.user.id);
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
  },

  'click #yammer-login' : function () {
    console.log('post login, create user');
    yam.getLoginStatus(function(res){
      console.log('res', res);
      Meteor.call('new_user', res, function(error, userObj){
        console.log('error', error);
        console.log('result', userObj);
        Session.set('current_yammer_id', userObj.yammer_id);
      });
    });
  }
});