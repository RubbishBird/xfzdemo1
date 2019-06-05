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
    this.index = 1;
    this.leftArrow = $('.left-arrow');
    this.rightArrow = $('.right-arrow');
    this.bannerUl = $("#banner-ul");
    this.liList = this.bannerUl.children("li");
    this.bannerCount = this.liList.length;
    this.pageControl = $('.page-control')


}

//初始化banner的方法
Banner.prototype.initBanner = function(){
    var self = this;
    var firstBanner = self.liList.eq(0).clone();
    var lastBanner = self.liList.eq(self.bannerCount-1).clone();
    self.bannerUl.append(firstBanner);
    self.bannerUl.prepend(lastBanner);
    this.bannerUl.css({"width":self.bannerwidth*(self.bannerCount+2),'left':-self.bannerwidth});
};


//初始化箭头
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


//鼠标移动到Banner上触发的方法
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

//banner单次轮播
Banner.prototype.animate = function(){
    var self =this;
    self.bannerUl.animate({"left":-798*self.index},500);
    var index = self.index;
    if(index === 0){
        index = self.bannerCount - 1;
    }else if (index === self.bannerCount + 1){
        index = 0;
    }else{
        index = self.index - 1;
    }
    //siblings()方法表示获取同类元素
    self.pageControl.children('li').eq(index).addClass("active").siblings().removeClass("active");
};


//banner自动轮播
Banner.prototype.loop = function () {
    //在网页中查找所有ID=banner-ul的元素
    var self = this;
    this.timer = setInterval(function () {
        //函数内如果是用this的话，代表的就是这个函数，而不是banner对象，因此需要定义var self = this;
        if(self.index>=self.bannerCount + 1){
            self.bannerUl.css({'left':-self.bannerwidth});
            self.index =2;
        }else{
            self.index++;
        }
        self.animate();
    },2000);
};

//点击banner中左右箭头的方法
Banner.prototype.listenArrowClick = function(){
    var self = this;
    self.leftArrow.click(function () {
        if(self.index === 0){
            self.bannerUl.css({'left':-self.bannerCount*self.bannerwidth});
            self.index = self.bannerCount - 1;
        }
        else{
            self.index--;
        }
        self.animate();
    });

    self.rightArrow.click(function () {
        if(self.index === self.bannerCount + 1 ){
            self.bannerUl.css({'left':-self.bannerwidth});
            self.index = 2;
        }
        else {
            self.index++;
        }
        self.animate();
    });
};

//初始化banner中小圆点
Banner.prototype.initPageControl = function(){
    var self =this;
    for(var i=0; i<self.bannerCount; i++){
        var circle = $('<li></li>');
        self.pageControl.append(circle);
        if(i === 0){
            circle.addClass("active");
        }
        self.pageControl.css({"width":self.bannerCount*12+8*2+16*(self.bannerCount-1)});
    }
};

//点击banner中小圆点的方法
Banner.prototype.listenPageControl = function(){
    var self = this;
    //each()方法遍历所有li标签
    self.pageControl.children('li').each(function (index,obj) {
        //index参数表示li标签下标，obj参数表示li标签
        $(obj).click(function () {
            self.index = index;
            self.animate();
        });
    });

};

Banner.prototype.run = function () {
    this.initBanner();
    this.initPageControl();
    this.loop();
    this.listenBannerHover();
    this.listenArrowClick();
    this.listenPageControl();
};


//以下函数内代码，会在网页元素加载完才执行
$(function () {
    var banner = new Banner();
    banner.run();
});