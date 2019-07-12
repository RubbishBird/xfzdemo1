

function Auth() {
    var self = this;
    self.maskWrapper = $('.mask-wrapper');
    self.scrollWrapper = $(".scroll-wrapper");
}

Auth.prototype.run = function(){
    var self = this;
    self.ListenShowHideEvent();
    self.listenSwitchEvent();
    self.listenSigninEvent();
};

Auth.prototype.showEvent = function(){
    var self = this;
    self.maskWrapper.show();
};

Auth.prototype.hideEvent = function(){
    var self = this;
    self.maskWrapper.hide();
};

Auth.prototype.ListenShowHideEvent = function(){
    var self = this;
    var signinbtn = $('.signin-btn');
    var signupbtn = $('.signup-btn');
    var closebtn = $('.close-btn');
    var scrollwrapper = $('.scroll-wrapper');
    signinbtn.click(function () {
        self.showEvent();
        scrollwrapper.css({'left':0});
    });
    signupbtn.click(function () {
       self.showEvent();
       scrollwrapper.css({'left':-400});
    });
    closebtn.click(function () {
       self.hideEvent();
    });
};

Auth.prototype.listenSwitchEvent = function(){
    var self = this;
    var switcher = $(".switch");
    switcher.click(function () {
        var currentLeft = self.scrollWrapper.css("left")
        currentLeft = parseInt(currentLeft)
        if(currentLeft < 0){
            self.scrollWrapper.animate({"left":"0"});
        }else {
            self.scrollWrapper.animate({"left":"-400px"})
        }
    });
};

// Auth.prototype.listenSigninEvent = function(){
//     var self = this;
//     var signinGroup = $('.signin-group');
//     var telephoneInput = signinGroup.find("input[name='telephone']");
//     var passwordInput = signinGroup.find("input[name='password']");
//     var rememberInput = signinGroup.find("input[name='remember']");
//
//     var submitBtn = signinGroup.find('.submit-btn');
//     submitBtn.click(function (event) {
//         event.preventDefault();
//         var telephone = telephoneInput.val();
//         var password = passwordInput.val();
//         var remember = rememberInput.prop('checked');
//
//         xfzajax.post({
//             'url':'/account/login/',
//             'data':{
//                 'telephone':telephone,
//                 'password':password,
//                 'remember':remember?1:0
//             },
//             'success':function (result) {
//                 if(result['code'] == 200){
//                     self.hideEvent();
//                     window.location.reload();
//                 }else{
//                     var messagecode = result['message'];
//                     if(typeof messagecode == 'string' || messagecode.constructor == String){
//                         window.messageBox.show(messagecode);
//                     }else{
//                         for(var key in messagecode){
//                             var messages = messagecode[key];
//                             var message = messages[0];
//                             window.messageBox.show(message);
//                         }
//                     }
//                 }
//
//             },
//             'fail':function (error) {
//                 console.log(error);
//
//             }
//         });
//     });
// };



$(function () {
   var auth = new Auth();
   auth.run();
});