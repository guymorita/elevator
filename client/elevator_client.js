Template.new_competition.test_content = function () {
  return "Welcome to elevator.";
};

Template.all_users.get_all_users = function(){
  return Users.find({});
};

Template.new_competition.events({
  'click #new_competition__create': function(){
    var new_competition_obj = {};
    new_competition_obj.name = $('.new-competition__name').val();
    new_competition_obj.type = $('.new-competition__type').val();
    new_competition_obj.goal_number = $('.new-competition__goal-number').val();
    new_competition_obj.goal_metric = $('.new-competition__goal-metric').val();
    new_competition_obj.end_date = $('.new-competition__end-date').val();
    new_competition_obj.users = [{userId: Session.get('current_user_id'), score: 0}]
    Competitions.insert(new_competition_obj, function(err, id){
      if (err){
        return err;
      }
      console.log('competition inserted, id', id);
      Session.set('current_competition_id', id);
    });
  }
});