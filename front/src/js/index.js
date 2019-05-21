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

}

Banner.prototype.run = function () {
    //在网页中查找所有ID=banner-ul的元素
    var bannerUl = $("#banner-ul")
    var index = 0;
    setInterval(function () {
        if(index>=3){
            index =0;
        }else{
            index++;
        }
        bannerUl.animate({"left":-798*index},500)
    },2000);
};

//以下函数内代码，会在网页元素加载完才执行
$(function () {
    var banner = new Banner();
    banner.run();

});