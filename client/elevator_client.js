

Template.new_competition.test_content = function () {
  return "Welcome to elevator.";
};

Template.yammer_login.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined'){
      console.log("You pressed the button");
    }

     yam.connect.loginButton('#yammer-login', function (resp) { if (resp.authResponse) { document.getElementById('yammer-login').innerHTML = 'Welcome to Yammer!'; } });

  }
});
