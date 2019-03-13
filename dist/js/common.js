"use strict";

$(function () {
  $.ajaxSettings.beforeSend = function (xhr, obj) {
    $("body").addClass('loadding');
  };

  $.ajaxSettings.complete = function () {
    $("body").removeClass('loadding');
  };
});
//# sourceMappingURL=common.js.map
