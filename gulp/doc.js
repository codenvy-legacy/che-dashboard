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

gulp.task('ngfonts', function () {
  return gulp.src(paths.dist + '/fonts/*')
    .pipe($.flatten())
    .pipe(gulp.dest(paths.doc + '/fonts/'));
});

gulp.task('ngdocs', ['ngfonts'], function () {
  var options = {
    scripts: [paths.dist + '/scripts/vendor.js',paths.dist + '/scripts/app.js' ],
    styles: [paths.dist + '/styles/vendor.css', paths.dist + '/styles/app.css'],
    editExample: false,
    title: "User Dashboard documentation"
  }

  return gulp.src(paths.src + '/{app,components}/**/*.js')
    .pipe($.ngdocs.process(options))
    .pipe(gulp.dest(paths.doc));
});


