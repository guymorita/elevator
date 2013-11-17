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
  // if (Session.get('current_competition_id')){
  //   var competition = Competitions.findOne({_id:Session.get('current_competition_id')});
  //   return competition && competition.users;
  //   // console.log('competition', competition);
  // }
};

Template.invite.events({
  'click .invite' : function () {
    console.log('invite');
    get_friends();
  }
});