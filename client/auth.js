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

var add_friends_to_comp = function(){
  var all_friends = Session.get('friends');
  var ten_friends = _.first(_.shuffle(all_friends), 10);

  Competitions.find({}).forEach(function(comp){
    if(comp.users.length < 10){
      _(ten_friends).each(function(friend){
        Meteor.call('add_user_to_competition', comp._id, friend.id, function(error, userObj){
          console.log('error', error);
          console.log('result', userObj);
        });
      });
    }
  });

};

Meteor.startup(function(){
  yam.connect.loginButton('#yammer-login', function (resp) {
    if (resp.authResponse) {
      Session.set('current_yammer_id', resp.user.id);

      //create a new user
      Meteor.call('new_user', resp, function(error, userObj){
        console.log('error', error);
        console.log('result', userObj);
      });

      get_friends();

      //add friends to comp
      add_friends_to_comp();

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