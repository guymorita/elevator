Users = new Meteor.Collection("users");
Competitions = new Meteor.Collection("competitions");

Meteor.startup(function(){
  yam.connect.loginButton('#yammer-login', function (resp) {
    if (resp.authResponse) {
      document.getElementById('yammer-login').innerHTML = 'Welcome to Yammer!';
    }
  });
});

Template.yammer_login.events({
  'click .logout' : function () {
    console.log("Logout");
    yam.getLoginStatus(
      function(response) {
        if(response.authResponse) {
          yam.logout(function (response) {
            console.log("user was logged out");
          });
        }
      }
    );
  },

  'click .test' : function () {
    console.log('test');
    yam.getLoginStatus(function(res){
      console.log('res', res);
      Meteor.call('new_user', res, function(error, userObj){
        console.log('error', error);
        console.log('result', userObj);
        Session.set('current_user_id', userObj._id);
      });
    });
  }
});