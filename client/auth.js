Template.yammer_login.events({
  'click .login' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined'){
      console.log("Login");
    }
    yam.connect.loginButton('#yammer-login', function (resp) {
        if (resp.authResponse) {
            document.getElementById('yammer-login').innerHTML = 'Welcome to Yammer!';
        }
    });
  },

  'click .logout' : function () {
    console.log("Logout");
    yam.getLoginStatus(
      function(response) {
        if(response.authResponse) {
          yam.logout(function (response) {
            console.log("user was logged out");
          });
        }
      }
    );
  }
});