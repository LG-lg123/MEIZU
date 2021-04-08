const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const cleanCss = require("gulp-clean-css");
//html任务（复制）
gulp.task("html", done => {
    gulp.src("*.html")
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload())
    done();
});
//css任务（转换/压缩）
gulp.task("sass", done => {
    gulp.src("sass/*.scss")
        .pipe(sass())
        .pipe(rename({
            suffix: "-min"
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload())
    done();
});
//js任务（压缩）
gulp.task("js", done => {
    gulp.src("js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload())
    done();
});
//图片压缩
gulp.task("img", done => {
    gulp.src("img/*")
        .pipe(gulp.dest("dist/img"))
    done();
});
//监听
gulp.task("watch", done => {
    gulp.watch("*.html", gulp.series("html"));
    gulp.watch("js/*.js", gulp.series("js"));
    gulp.watch("sass/*.scss", gulp.series("sass"));
    gulp.watch("img/*", gulp.series("img"));
    done();
});
//服务器
gulp.task("server", done => {
    connect.server({
        root: "dist",
        livereload: true
    })
    done();
});
//提前加载
gulp.task("build", gulp.series("html", "sass", "js", "img"));
gulp.task("default", gulp.parallel("build", "server", "watch"));