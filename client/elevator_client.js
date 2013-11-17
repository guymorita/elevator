Template.logged_in.logged_in = function(){
  return !Session.equals('current_yammer_id', undefined);
};

Template.logged_in.new_competition_page = function(){
  return Session.equals('current_page', 'new_competition_page');
};

Template.logged_in.all_competition_page = function(){
  return Session.equals('current_page', 'all_competition_page');
};

Template.logged_in.leaderboard_page = function(){
  return Session.equals('current_page', 'leaderboard_page');
};

Template.logged_in.add_friend_page = function(){
  return Session.equals('current_page', 'add_friend_page');
}

Template.all_users.get_all_users = function(){
  return Users.find({});
};

Template.leaderboard.user_list = function(){
  Meteor.call('add_user_to_competition', Session.get('current_competition_id'), Session.get('current_yammer_id'));
  if (Session.get('current_competition_id')){
    competition = Competitions.findOne({_id:Session.get('current_competition_id')});
    var finalLeaderboardArray = [];
    var userObj;
    _.each(competition.users,function(value){
      userObj = Users.findOne({yammer_id: ''+value.userId});
      if (userObj){
        finalLeaderboardArray.push(_.extend({}, value, userObj.user));
      }
    });
    return finalLeaderboardArray;
  }
};

Template.all_competitions.all_comps = function(){
  return Competitions.find({});
};

Template.nav_bar.events({
  'click .new-competition__button': function(){
    Session.set('current_page', 'new_competition_page');
  },
  'click .competition-list': function(){
    Session.set('current_page', 'all_competition_page');
  }
})

Template.all_competitions.events({
  'click .leaderboard-page-button': function(e){
    if (e && e.target){
      Session.set('current_page', 'leaderboard_page');
      Session.set('current_competition_id', e.target.id);
    }
  }
})

Template.new_competition.events({
  'click #new_competition__create': function(){
    var new_competition_obj = {};
    new_competition_obj.name = $('.new-competition__name').val();
    new_competition_obj.type = $('.new-competition__type').val();
    new_competition_obj.goal_number = $('.new-competition__goal-number').val();
    new_competition_obj.goal_metric = $('.new-competition__goal-metric').val();
    new_competition_obj.end_date = $('.new-competition__end-date').val();
    new_competition_obj.users = [{userId: Session.get('current_yammer_id'), score: 0}];
    Competitions.insert(new_competition_obj, function(err, id){
      if (err){
        return err;
      }
      console.log('competition inserted, id', id);
      Session.set('current_competition_id', id);
    });
  }
});

Template.leaderboard.events({
  'click .leaderboard-buttons-plus-one': function (){
    var competitionId = Session.get('current_competition_id'),
        userId = Session.get('current_yammer_id'),
        value = 1;
    Meteor.call('increment_counter', competitionId, userId, value, function(error, userObj){
      console.log('error', error);
      console.log('result', userObj);
    });
  },
  'click .leaderboard-buttons-plus-five': function (){
    var competitionId = Session.get('current_competition_id'),
        userId = Session.get('current_yammer_id'),
        value = 5;
    Meteor.call('increment_counter', competitionId, userId, value, function(error, userObj){
      console.log('error', error);
      console.log('result', userObj);
    });
  },
  'click .add-friends': function(){
    Session.set('current_page', 'add_friend_page');
  }
});