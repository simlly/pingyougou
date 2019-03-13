"use strict";

$(function () {
  init();

  function init() {
    eventList();
  }

  function eventList() {
    // 绑定验证码  点击事件
    $('.verify_btn').on('tap', function () {
      // 1.验证手机号码是否合法
      var mobile_txt = $('input[name="mobile"]').val().trim();

      if (!checkPhone(mobile_txt)) {
        mui.toast('输入手机号不合法');
        return;
      } // 2.发送请求到后台


      $.post("http://api.pyg.ak48.xyz/api/public/v1/users/get_reg_code", {
        mobile: mobile_txt
      }, function (result) {
        // 判断是否请求成功
        if (result.meta.status == 200) {
          console.log(result); // let data = result.data;
          // 2.发送验证码成功后禁用按钮  开始倒计时
          // $(".verify_btn").attr('disabled', 'disabled');

          var time = 5;
          $(".verify_btn").attr('disabled', 'disabled').text("".concat(time, " \u79D2\u540E\u518D\u83B7\u53D6")); // $(".verify_btn").text(`${time} 秒后再获取`);

          var timeId = setInterval(function () {
            time--;
            $(".verify_btn").text("".concat(time, " \u79D2\u540E\u518D\u83B7\u53D6"));

            if (time == 0) {
              clearInterval(timeId);
              $(".verify_btn").removeAttr('disabled').text('获取验证码');
            }
          }, 1000);
        } else {
          console.log('请求失败');
        }
      });
    }); // 绑定注册点击事件

    $('.register_btn').on('tap', function () {
      // 获取到所有表单里的元素的值
      var mobile_tex = $('input[name="mobile"]').val().trim();
      var code_tex = $('input[name="code"]').val().trim();
      var email_tex = $('input[name="email"]').val().trim();
      var pwd_tex = $('input[name="pwd"]').val().trim();
      var pwd2_tex = $('input[name="pwd2"]').val().trim();
      var gender_tex = $('input[name="gender"]').val().trim(); // 逐步验证

      if (!checkPhone(mobile_tex)) {
        mui.toast('输入手机号不合法');
        return;
      }

      if (code_tex.length != 4) {
        mui.toast('请输入正确的验证码');
        return;
      }

      if (!checkEmail(email_tex)) {
        mui.toast('邮箱格式不正确');
        return;
      }

      if (pwd_tex.length < 6) {
        mui.toast('密码格式不正确');
        return;
      }

      if (pwd2_tex != pwd_tex) {
        mui.toast('请输入正确密码');
        return;
      } // 验证完毕   发送请求到后台完成注册


      $.post("http://api.pyg.ak48.xyz/api/public/v1/users/reg", {
        mobile: mobile_tex,
        code: code_tex,
        email: email_tex,
        pwd: pwd_tex,
        gender: gender_tex
      }, function (result) {
        console.log(result.meta.status);

        if (result.meta.status == 200) {
          // 注册成功  显示成功提示 跳转到登录页面
          // console.log(1111);
          mui.toast('注册成功');
          setInterval(function () {
            location.href = 'login.html';
          }, 1000);
        } else {
          mui.toast(result.meta.msg);
        }
      });
    });
  } // 验证 手机合法性


  function checkPhone(phone) {
    if (!/^1[34578]\d{9}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  } // 验证邮箱


  function checkEmail(myemail) {
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

    if (myReg.test(myemail)) {
      return true;
    } else {
      return false;
    }
  }
});
//# sourceMappingURL=register2.js.map
