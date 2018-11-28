'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const reload = browserSync.reload;

console.log(gulp.tasks);

gulp.task('connect-sync', ['sass'], () => {
    connect.server({}, () => {
        browserSync({
            proxy: '0.0.0.0:8000',
            notify: false, // Notificacao browserSync
            open: false, // Abre o navegador assim que o servidor for iniciado
            base: './' // Diretorio raiz do servidor
        })
    })

    gulp.watch('*.php').on('change', reload);
    gulp.watch('*.html').on('change', reload);
    gulp.watch('css/**/*.css').on('change', reload);
    gulp.watch('sass/**/*.sass', ['sass']);

})

gulp.task('sass', () => {
    gulp.src('sass/**/*.sass')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())
})

gulp.task('default', ['connect-sync']);
