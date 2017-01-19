//true or false flag - false user is not signed in, true user is signed in
var signInFlag = false;

function onSignIn(googleUser) {
  
  //when a user signs in initialize a GoogleAuth object. This is needed to call related methods
  var userObject = gapi.auth2.init({
    client_id: '169674703837-r0jgn6ghdh1dfa1ilbbufb1bs8r58m1k.apps.googleusercontent.com'
  });
  //getAuthInstance provides a response object
  var authInstance = gapi.auth2.getAuthInstance();
  
  //get the status of the current user
  signInFlag = authInstance.isSignedIn.get();
  //update out signInFlag
  signOutDisplay();
  
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  var userName =  profile.getName();
  $('.userName').text('Player: '+ userName);
  
  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  //object of google data to passed during ajax call to database, needed to add a new user to db upon first login
  var dataToSend = {
    userEmail: profile.getEmail(),
    userName: userName
  };
  login_user(dataToSend); //function to make ajax call
};

//Signs a user out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    signInFlag = auth2.isSignedIn.get();
    signOutDisplay();
    console.log(' User signed out.');
  });
}

//Determines whether user is signed in out not
function signOutDisplay(){
  if (signInFlag === false) {
    $('.g-signin2').show();
    $('.signOut').hide();
    $('.toolTip').removeClass('hideClass');
    $('.playerItem').hide();
  }
  else{
    $('.g-signin2').hide();
    $('.signOut').show();
    $('.toolTip').addClass('hideClass');
    $('.playerItem').show();
  }
}

//on documentload check if user is signed in
$(document).ready(function(){
  signOutDisplay();
});