// Users.remove({});
// Competitions.remove({});

Users = new Meteor.Collection("users");
Competitions = new Meteor.Collection("competitions");

var init_comps = [
  {
    end_date: "2013-11-23",
    goal_metric: "climing 8 floor",
    goal_number: "10",
    name: "Elevator Hater's Club",
    type: "fitness",
    users: []
  },
  {
    end_date: "2013-11-25",
    goal_metric: "working out at lunch time",
    goal_number: "5",
    name: "Run, not lunch",
    type: "fitness",
    users: []
  },
  {
    end_date: "2013-11-30",
    goal_metric: "steps per week",
    goal_number: "100000",
    name: "Proud Fitbit Owners",
    type: "health",
    users: []
  },
  {
    end_date: "2014-02-10",
    goal_metric: "run one marathon",
    goal_number: "1",
    name: "Run, Forrest, Run",
    type: "health",
    users: []
  },
  {
    end_date: "2014-03-15",
    goal_metric: "$",
    goal_number: "1000",
    name: "Cook-off for Asian Women's Shelter",
    type: "volunteer",
    users: []
  },
  {
    end_date: "2014-04-30",
    goal_metric: "ms",
    goal_number: "-100",
    name: "Reduce page load spead by 100ms, win $10k",
    type: "professional",
    users: []
  }
];

Meteor.startup(function () {
  if(Competitions.find({}).count()<5){
    _(init_comps).each(function(item){
      Competitions.insert(item);
    });
  }
});

Meteor.methods({
  new_competition: function(competitionObj){
    return Competitions.insert(competitionObj, function(competitionId) {
      return competitionId;
    });
  },
  increment_counter: function(competitionId, userId, value){
    value = value || 1;

    var comp = Competitions.findOne({_id: competitionId});
    console.log('before', comp);
    _(comp.users).each(function(user){
      if(user.userId === userId) {
        user.score += value;
      }
    });
    console.log('after', comp);
    Competitions.upsert({_id:competitionId}, comp);
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

    var query = {
      '_id': competitionId,
      'users.userId': userId
    };
    var added = Competitions.findOne(query);
    var competitionObj = Competitions.findOne({_id: competitionId});
    var randomStart = Math.floor(Math.random()*competitionObj.goal_number);
    console.log('--added', added);

    //if user hasn't been added to the competition
    if (!added){
      Competitions.update({_id:competitionId},
        {$addToSet: {'users': {'userId': userId, 'score': randomStart}}},
        function(err, result){
          console.log('insert err result', err, result);
        }
      );
    }
  },
  get_competition_object: function(competitionId){
    return Competitions.find({competitionId: competitionId});
  }
});

