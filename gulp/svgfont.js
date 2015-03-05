/*******************************************************************************
 * Copyright (c) 2015 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 *******************************************************************************/

'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('generatesvgfonts', function() {
  return gulp.src('src/assets/svg/*')
    .pipe($.iconfontCss({
      fontName: 'codenvy',
      targetPath: '../styles/codenvy-font.css',
      fontPath: '../fonts/'
    }))
    .pipe($.iconfont({
      fontName: 'codenvy',
      appendCodepoints: false,
      normalize: true,
      centerHorizontally: true,
      fontHeight: 100
    }))
    .pipe( gulp.dest('src/assets/fonts') );
});



gulp.task('svgfonts', ['generatesvgfonts'], function () {
  return gulp.src(['src/assets/styles/codenvy-font.css'])
    .pipe($.replace('icon:before', 'cdvyfont:before'))
    .pipe($.replace('.icon-', '.cdvyico-'))
    .pipe(gulp.dest('src/assets/styles'));

});
