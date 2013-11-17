var get_friends = function(){
  yam.request({
    url: "https://www.yammer.com/api/v1/users.json",
    method: "GET",
    success: function (data) {
      console.log("The request was successful.");
      console.log(data);
      Session.set('friends', data);
    },
    error: function (data) {
      console.log("There was an error with the request.");
    }
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
    console.log('invite_by_id', this);
  }
});