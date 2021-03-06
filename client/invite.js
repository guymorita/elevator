var send_msg_to_friend = function(input){
  var payload = {
    body: 'Your challenge, should you choose to accept it. Visit The Elevator App',
    direct_to_id: input.id
  };
  yam.request({
    url: "https://www.yammer.com/api/v1/messages.json",
    method: "POST",
    data: payload,
    success: function (data) {
      console.log("The request was successful.");
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

var add_pending_user_to_comp = function (input) {
  //save yammer_id to current comp
  var competitionId = Session.get('current_competition_id');
  var userId = input.id;

  Meteor.call('add_user_to_competition', competitionId, userId, function(error, userObj){
    console.log('add_pending_user_to_comp error', error);
    console.log('add_pending_user_to_comp result', userObj);
  });
};

Template.invite.friends = function(){
  return Session.get('friends');
};

Template.invite.events({
  'click .invite_by_id' : function () {
    //this is refering to one pending_user, amazing
    console.log('invite_by_id', this);
    create_pending_user(this);
    add_pending_user_to_comp(this);
    // send_msg_to_friend(this);
  },
  'click .back-button': function(){
    Session.set('current_page', 'leaderboard_page');
  }
});