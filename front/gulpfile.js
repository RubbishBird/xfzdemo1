var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cache = require("gulp-cache");
var imagemin = require("gulp-imagemin");
var bs = require("browser-sync").create();
var sass = require("gulp-sass")

var path = {
    'html':'./templates/**/',
    'css' : './src/css/',
    'images' : './src/images/',
    'js' : './src/js/',
    'css_dist' : './dist/css/',
    'images_dist' : './dist/images/',
    'js_dist' : './dist/js/',
};

// 处理html文件的任务
gulp.task('html',function () {
    // 找到html的文件
   gulp.src(path.html + '*.html')
       // 重新加载浏览器
       .pipe(bs.stream())
});


//定义一个处理css的任务
gulp.task("css",function () {
    // 找到所有css文件
    gulp.src(path.css + '*.scss')
        .pipe(sass().on("error",sass.logError))
        // 对css文件进行压缩
        .pipe(cssnano())
        // 对css文件进行重命名
        .pipe(rename({"suffix":".min"}))
        // 将处理后的css文件放在dist下的css文件夹下
        .pipe(gulp.dest(path.css_dist))
        // 重新加载浏览器页面
        .pipe(bs.stream())
});


//定义一个处理js的任务
gulp.task("js",function () {
    // 找到所有js文件
   gulp.src(path.js + '*.js')
       // 对所有js文件进行"丑化"处理
       .pipe(uglify())
       .pipe(gulp.dest(path.js_dist))
       .pipe(bs.stream())
});

// 定义一个处理images的任务
gulp.task('images',function () {
   gulp.src(path.images + '*.*')
        // 对所有js文件先进行缓存处理，再进行压缩
       .pipe(cache(imagemin()))
       .pipe(gulp.dest(path.images_dist))
       .pipe(bs.stream())
});

// 定义监听文件修改的任务
gulp.task('watch',function () {
    // 监听到css文件发生变化，执行css的任务
   gulp.watch(path.css + '*.scss',['css']);
   gulp.watch(path.html + '*.html',['html']);
   gulp.watch(path.js + '*.js',['js']);
   gulp.watch(path.images + '*.*',['images']);
});


// 初始化browser-sync的任务，即代码发生修改，浏览器及时响应效果
gulp.task('bs',function () {
   bs.init({
       'server':{
           'baseDir':'./'
       }
   });
});


// 创建一个默认的任务，即创建bs服务器并且监听文件的修改
// 先执行bs任务，再执行watch任务
gulp.task('default',['bs','watch']);