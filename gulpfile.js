const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('browser-sync-server', function() {
    browserSync.init({
        server: {
            baseDir: "src"//Деректория в которой имеется наш index.html
        }
    });
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
          .pipe(gulp.dest("src/css")) //Директория для сохранения получившегося файла css
          .pipe(browserSync.stream());  //Обновление страницы сервера
})

gulp.task('watch', function() {
  gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('gulp-sass-watch')); //При изменении sass файлов выполняется gulp-sass-watch
  gulp.watch("src/*.html").on("change", browserSync.reload); //При изменении html файлов выполняется обновление страницы браузера
})

gulp.task('default', gulp.parallel('watch', 'browser-sync-server', 'gulp-sass-watch')); //Действия gulp по умолчанию