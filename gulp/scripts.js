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

gulp.task('scripts', ['colors'], function () {
  return gulp.src(paths.src + '/{app,components}/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.babel())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe($.ngAnnotate())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.tmp + '/babel'))
    .pipe($.size());
});

gulp.task('browserify', ['scripts'], function () {
  return gulp.src(paths.tmp + '/babel/app/index.js', { read: false })
    .pipe($.browserify( {debug : true}))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.tmp + '/serve/app'))
    .pipe($.size());
});
