const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-image');

// Static server
gulp.task('browser-sync-server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"//Деректория в которой имеется наш index.html
        }
    });
    gulp.watch("src/*.html").on("change", browserSync.reload); //При изменении html файлов выполняется обновление страницы браузера
});

gulp.task('gulp-sass-watch', function() {
  return gulp.src("src/sass/**/*.+(scss|sass)")//Директория за которой следит с scss или sass файлами
          .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //Тип сохранения сжатый
          .pipe(rename({
            prefix: "",
            suffix: ".min"//Добавление суфикса для скомпелированного файла  css
          }))
          .pipe(autoprefixer())  //Добавление автопреффиксов
          .pipe(cleanCSS({compatibility: 'ie8'}))
          .pipe(gulp.dest("dist/css")) //Директория для сохранения получившегося файла css
          .pipe(browserSync.stream());  //Обновление страницы сервера
})

gulp.task('watch', function() {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('gulp-sass-watch')); //При изменении sass файлов выполняется gulp-sass-watch
  gulp.watch("src/*.html").on("change", gulp.parallel('html')); //
  gulp.watch("src/js/**/*.js", gulp.parallel("scripts"));
});

gulp.task('html', function() { //Сжатие html файла
  return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function() { //Копирование js
  return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .on("end", browserSync.reload);
});

gulp.task('mailer', function() { //Копирование mailer
  return gulp.src('src/mailer/**/*')
        .pipe(gulp.dest('dist/mailer'));
});
gulp.task('icons', function() { //Копирование icons
  return gulp.src('src/icons/**/*')
        .pipe(gulp.dest('dist/icons'));
});

gulp.task('image', function () { //сжатие и копирование img
  gulp.src('src/img/**/*')
    .pipe(image())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync-server', 'gulp-sass-watch', 'scripts', 'mailer', 'icons', 'html', 'image')); //Действия gulp по умолчанию