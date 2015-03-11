"use strict";

angular.module('userDashboard').filter('sampleFilterProjectType', function() {
  return function (templates, categoryFilter) {
    if (!templates) {
      return [];
    }
    if (!categoryFilter) {
      return templates;
    }

    var filtered = [];
    templates.forEach((template) => {
      if (categoryFilter === template.projectType) {
        filtered.push(template);
      }
    });
    return filtered;
  };
});
