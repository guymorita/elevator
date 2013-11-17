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
  increment_counter: function(competitionId, userId, value){
    // Competition.update({_id: competitionId}, {users: }
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

    return user_obj;
  },
  add_user_to_competition: function(competitionId, userId){
    // find the array index of the user in the competition
    competitionId = competitionId || "fwqgvwvRrKiKLSMtv";
    userId = userId || "LsosJQvweuyZGeadh";

    var query = {
      '_id': competitionId,
      'users.userId': userId
    };
    var competition = Competitions.findOne(query);

    console.log('--competition', competition);

    if (!competition){
      Competitions.update({_id:competitionId},
        {$addToSet: {'users': {'userId': userId, 'score': 0}}},
        function(err, result){
          console.log('insert err result', err, result);
        }
      );
    }
  },
  get_competition_object: function(competitionId){
    return Competition.find({competitionId: competitionId});
  },
  get_all_competitions: function(){
    return Competition.find({});
  }
});

// Competition = {
//   users: [
//     {
//       userId: 123,
//       score: 3
//     }
//   ]
// }

