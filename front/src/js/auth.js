
// 点击登录按钮，弹出模态对话框

// $(function () {
//     $("#btn").click(function () {
//         $(".mask-wrapper").show();
//     });
//
//     $(".close-btn").click(function () {
//        $(".mask-wrapper").hide();
//     });
// });


$(function () {
    $(".switch").click(function () {
        var scrollWrapper = $(".scroll-wrapper");
        var currentLeft = scrollWrapper.css("left")
        currentLeft = parseInt(currentLeft)
        if(currentLeft < 0){
            scrollWrapper.animate({"left":"0"});
        }else {
            scrollWrapper.animate({"left":"-400px"})
        }
    });
});


function Auth() {
    var self = this;
    self.maskWrapper = $('.mask-wrapper');
}

Auth.prototype.run = function(){
    var self = this;
    self.ListenShowHideEvent();
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

$(function () {
   var auth = new Auth();
   auth.run();
});