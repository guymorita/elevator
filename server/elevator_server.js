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
  increment_counter: function(competition, value){

  },
  new_user: function(input){
    if(!input){
      return null;
    }

    var user_obj = {};
    //try getting yammer_id
    user_obj.yammer_id = '' + input.user.id;
    _.extend(user_obj, input);

    Users.upsert({yammer_id:user_obj.yammer_id}, user_obj, function(error, result){
      console.log('error', error);
      console.log('result', result);
    });

    return user_obj.yammer_id;
  },
  add_user_to_competition: function(competitionid, userId){

  },
  get_competition_object: function(competitionId){

  },
  get_all_competitions: function(){

  }

});