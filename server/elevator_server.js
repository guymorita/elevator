Users = new Meteor.Collection("users");
Competitions = new Meteor.Collection("competitions");

Meteor.startup(function () {

});
Meteor.methods({
  new_competition: function(competitionObj){
    return Competition.insert(competitionObj, function(competitionId) {
      return competitionId;
    });
  },
  increment_counter: function(competition, userId, value){

  },
  new_user: function(userid){

  },
  add_user_to_competition: function(competitionid, userId){

  },
  get_competition_object: function(competitionId){
    return Competition.find({competitionId: competitionId});
  },
  get_all_competitions: function(){
    return Competition.find({});
  }

});