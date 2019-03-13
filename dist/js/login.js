"use strict";

$(function () {
  init();

  function init() {
    eventList();
  }

  function eventList() {
    $('.login_btn').on('tap', function () {
      // 获取用户手机和密码   进行格式验证
      var username = $('input[name="username"]').val().trim();
      var password = $('input[name="password"]').val().trim();

      if (!checkPhone(username)) {
        mui.toast('手机格式不正确');
        return;
      }

      if (password.length < 6) {
        mui.toast('密码格式不正确');
        return;
      } // 构造参数  发送请求


      $.post("http://api.pyg.ak48.xyz/api/public/v1/login", {
        username: username,
        password: password
      }, function (result) {
        console.log(result);

        if (result.meta.status == 200) {
          // 登录成功了  就把数据  存到会话存储里面
          var data = JSON.stringify(result.data);
          sessionStorage.setItem('userinfo', data);
          mui.toast('登录成功'); // 登录成功后  就要返回原来的页面  如果没有就跳回主页
          // 在加入购物车的时候就将当前页的地址存到会话存储  登录成功后直接跳转

          var pageurl = sessionStorage.getItem('pageurl'); //如果没有就跳回主页

          if (!pageurl) {
            location.href = "index.html";
          }

          setInterval(function () {
            location.href = pageurl;
          }, 1000);
        } else {
          mui.toast(result.meta.msg);
        }
      });
    });
  }

  function checkPhone(phone) {
    if (!/^1[34578]\d{9}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  }
});
//# sourceMappingURL=login.js.map
