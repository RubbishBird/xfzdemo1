//面向对象
//通过this关键字，绑定属性，并且指定它的值
//原型链
//添加方法：在Banner.prototype上绑定方法就可以了

// function Banner() {
//     //这里面写的代码，相当于python中的__init__方法的代码
//     console.log("init")
// }
//
// Banner.prototype.greet = function () {
//     console.log("hello")
// }
//
// var banner = new Banner()
// banner.greet();

function Banner() {
    this.bannerwidth = 798;
    this.bannerGroup = $("#banner-group");
    this.index = 0;
    this.leftArrow = $('.left-arrow');
    this.rightArrow = $('.right-arrow');
    this.bannerUl = $("#banner-ul");
    this.liList = this.bannerUl.children("li");
    this.bannerCount = this.liList.length;
    this.listenBannerHover();

}

Banner.prototype.initBanner = function(){
    var self = this;
    this.bannerUl.css({"width":self.bannerwidth*self.bannerCount});
};

Banner.prototype.initPageControl = function(){
    var self =this;
    var pageControl = $(".page-control");
    for(var i=0; i<self.bannerCount; i++){
        var circle = $('<li></li>');
        pageControl.append(circle);
        if(i === 0){
            circle.addClass("active");
        }
        pageControl.css({"width":self.bannerCount*12+8*2+16*(self.bannerCount-1)});
    }
};

Banner.prototype.toggleArrow = function(isShow){
    if(isShow){
        var self = this;
        this.leftArrow.show();
        this.rightArrow.show();
    }else{
        this.leftArrow.hide();
        this.rightArrow.hide();
    }
};

Banner.prototype.listenBannerHover = function (){
    var self = this;    //这行代码的意思是将this指向Banner()对象
    this.bannerGroup.hover(function () {
        //第一个函数：把鼠标移动到banner上执行的函数
        // 关闭定时器
        clearInterval(self.timer);
        self.toggleArrow(true);
    },function () {
       //第二个函数，把鼠标从banner上移走会执行的函数
        self.loop();
        self.toggleArrow(false);

    });

};

Banner.prototype.animate = function(){
    var self =this;
    self.bannerUl.animate({"left":-798*self.index},500);
};

Banner.prototype.loop = function () {
    //在网页中查找所有ID=banner-ul的元素
    var self = this;
    this.timer = setInterval(function () {
        //函数内如果是用this的话，代表的就是这个函数，而不是banner对象，因此需要定义var self = this;
        if(self.index>=3){
            self.index =0;
        }else{
            self.index++;
        }
        self.animate();
    },1000);
};

Banner.prototype.listenArrowClick = function(){
    var self = this;
    self.leftArrow.click(function () {
        if(self.index === 0){
            self.index = self.bannerCount - 1;
        }
        else{
            self.index--;
        }
        self.animate();
    });

    self.rightArrow.click(function () {
        if(self.index === self.bannerCount -1 ){
            self.index = 0;
        }
        else {
            self.index++;
        }
        self.animate();
    });
};

Banner.prototype.run = function () {
    this.initBanner();
    this.initPageControl();
    this.loop();
    this.listenArrowClick();
};


//以下函数内代码，会在网页元素加载完才执行
$(function () {
    var banner = new Banner();
    banner.run();

});