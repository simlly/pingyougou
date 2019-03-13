
/* 开发环境做的事 */
console.log("======开发环境做的事======");

// 1 引入插件
const gulp = require("gulp");
const del = require("del");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const fileInclude = require("gulp-file-include");
const browserSync = require("browser-sync");

// 2 删除 任务
gulp.task("del", () => {
  return del(["./dist"]);
});

// 3 处理css 任务
gulp.task("css", () => {
  return (
    gulp
      .src("./src/css/*.less")
      // 2.1 在生成css文件之前 先记录以下 less文件的样子
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      )
      // 2.2 和css文件同层级 也顺带生成一个 map文件
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("./dist/css/"))
  );
});

// 4 处理js
gulp.task("js",()=>{
  return  gulp.src("./src/js/*.js")
  // 4.1 在转换成es5之前 先记录以下 es6代码的样子
  .pipe(sourcemaps.init())
  .pipe(babel())
  // 4.2 和生成的js同层级也生成 map文件 
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest("./dist/js/"));
});

// 5 处理html 任务
gulp.task("html",()=>{
  return gulp
    .src("src/*.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "src/components/",
      })
    )
    .pipe(gulp.dest("dist/"));
});

// 5.5 执行 负责第三方插件 任务
gulp.task("lib",()=>{
  return  gulp.src("./src/lib/**")
  .pipe(gulp.dest("./dist/lib/"));
});

// 6 自动打开浏览器 和 监听文件的改变 刷新浏览器
gulp.task("autopage", () => {

  browserSync({ 
    server:{
      baseDir:"./dist/"
    },
    port:9999,
    notify:false
  });
  gulp.watch(["src/*.html","src/components/*.html"],gulp.series(["html","reload"]));
  gulp.watch(["src/css/*.less"],gulp.series(["css","reload"]));
  gulp.watch(["src/js/*.js"],gulp.series(["js","reload"]));
  
});

gulp.task("reload",(done)=>{
  browserSync.reload();
  done();
});
gulp.task("default", gulp.series(["del","css","js","html","lib","autopage"]));
