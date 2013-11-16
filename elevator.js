Users = new Meteor.Collection("users")
Competitions = new Meteor.Collection("competitions")

if (Meteor.isClient) {
  Template.new_competition.test_content = function () {
    return "Welcome to elevator.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
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
    new_user: function(userid){

    },
    add_user_to_competition: function(competitionid, userId){

    },
    get_competition_object: function(competitionId){

    },
    get_all_competitions: function(){

    }

  });
}
