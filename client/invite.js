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

var create_pending_user = function (input) {
  var pendingUser = {
    access_token: {},
    authResponse: false,
    network: {},
    perms: "",
    user: input,
    pendingUser: true
  };

  Meteor.call('new_user', pendingUser, function(error, userObj){
    console.log('pendingUser error', error);
    console.log('pendingUser result', userObj);
  });
};

Template.invite.friends = function(){
  return Session.get('friends');
};

Template.invite.events({
  'click .invite' : function () {
    console.log('invite');
    get_friends();
  },
  'click .invite_by_id' : function () {
    //this is refering to one pending_user, amazing
    console.log('invite_by_id', this);
    create_pending_user(this);
  }
});