
//操作导航条的
function FrontBase() {

}

FrontBase.prototype.run = function(){
    var self = this;
    self.listenAuthBoxHover();
};

FrontBase.prototype.listenAuthBoxHover = function () {
    var authBox = $('.auth-box');
    var userMoreBox = $('.user-more-box');
    authBox.hover(function () {
        userMoreBox.show();
    },function () {
        userMoreBox.hide();
    });

};


//操作登录注册的
function Auth() {
    var self = this;
    self.maskWrapper = $('.mask-wrapper');
    self.scrollWrapper = $(".scroll-wrapper");
    self.smsCaptcha = $('.sms-captcha-btn');
}

Auth.prototype.run = function(){
    var self = this;
    self.ListenShowHideEvent();
    self.listenSwitchEvent();
    self.listenSigninEvent();
    self.listenImgCaptchaEvent();
    self.listenSmsCaptchaEvent();
};

Auth.prototype.showEvent = function(){
    var self = this;
    self.maskWrapper.show();
};

Auth.prototype.hideEvent = function(){
    var self = this;
    self.maskWrapper.hide();
};

Auth.prototype.smsSuccessEvent = function(){
    var self = this;
    messageBox.showSuccess('短信验证码发送成功！')
        self.smsCaptcha.addClass('disabled');
        var count = 60;
        self.smsCaptcha.unbind('click');
        var timer = setInterval(function () {
           self.smsCaptcha.text(count+'s');
           count-= 1;
           if(count<=0){
               clearInterval(timer);
               self.smsCaptcha.removeClass('disabled');
               self.smsCaptcha.text('发送验证码');
               self.listenSmsCaptchaEvent();
           }
        },1000);

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

Auth.prototype.listenImgCaptchaEvent = function(){
    var ImageCaptcha = $('.img_captcha');
    ImageCaptcha.click(function () {
        ImageCaptcha.attr('src','account/img_captcha'+'?random='+Math.random())
    });
};

Auth.prototype.listenSmsCaptchaEvent = function(){
    var self = this;
    var telephoneInput = $(".signup-group input[name = 'telephone']");
    self.smsCaptcha.click(function () {
       var telephone = telephoneInput.val();
       if(!telephone){
           window.messageBox.showInfo('请输入手机号码！');
       }
       xfzajax.get({
           'url':'/account/sms_captcha',
           'data':{
               'telephone':telephone
           },
           'success':function (result) {
               if(result['code']==200){
                   self.smsSuccessEvent();
               }
           },
           'fail':function (error) {
               console.log(error)
           }
       })
    });
};


Auth.prototype.listenSigninEvent = function(){
    var self = this;
    var signinGroup = $('.signin-group');
    var telephoneInput = signinGroup.find("input[name='telephone']");
    var passwordInput = signinGroup.find("input[name='password']");
    var rememberInput = signinGroup.find("input[name='remember']");

    var submitBtn = signinGroup.find('.submit-btn');
    submitBtn.click(function (event) {
        event.preventDefault();
        var telephone = telephoneInput.val();
        var password = passwordInput.val();
        var remember = rememberInput.prop('checked');

        xfzajax.post({
            'url':'/account/login/',
            'data':{
                'telephone':telephone,
                'password':password,
                'remember':remember?1:0
            },
            'success':function (result) {
                    self.hideEvent();
                    window.location.reload();
            },
        });
    });
};

Auth.prototype.listenSignupEvent = function(){
    var signupGroup = $('.signup-group');
    var submitBtn = signupGroup.find('.submit-btn');

    var telephoneInput = signupGroup.find("input[name='telephone']");
    var usernameInput = signupGroup.find("input[name='username']");
    var imgCaptchaInput = signupGroup.find("input[name='img-captcha']");
    var password1Input = signupGroup.find("input[name='password1']");
    var password2Input = signupGroup.find("input[name='password2']");
    var smscaptchaInput = signupGroup.find("input[name='sms-captcha']");

    var telephone = telephoneInput.val();
    var username = usernameInput.val();
    var imgCaptcha = imgCaptchaInput.val();
    var password1 = password1Input.val();
    var password2 = password2Input.val();
    var smscaptcha = smscaptchaInput.val();

    xfzajax.post({
        'url':'/account/register',
        'data':{
            'telephone':telephone,
            'username':username,
            'imgCaptcha':imgCaptcha,
            'password1':password1,
            'password2':password2,
            'smscaptcha':smscaptcha,
        },
        'success':function (result) {
                window.location.reload()
        },
    });
};



$(function () {
   var auth = new Auth();
   auth.run();
});


$(function () {
    var frontBase = new FrontBase();
    frontBase.run();
})