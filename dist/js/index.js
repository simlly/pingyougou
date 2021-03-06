"use strict";

$(function () {
  init(); // 加载就会执行的 函数

  function init() {
    sildeData();
    catesData();
    goodsList();
  } // 轮播图部分


  function sildeData() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata", function (result) {
      // console.log(result);
      if (result.meta.status == 200) {
        // 获取成功
        var data = result.data;
        var html = template('slideTpl', {
          arr: data
        });
        $('.pyg_slide').html(html); // 初始化轮播图

        var gallery = mui('.mui-slider');
        gallery.slider({
          interval: 3000
        });
      } else {
        console.log('请求失败');
      }
    });
  } // 分类菜单部分


  function catesData() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/catitems", function (result) {
      var data = result.data;

      if (result.meta.status == 200) {
        var html = '';

        for (var i = 0; i < data.length; i++) {
          html += " <a href=\"javascript:;\"><img src=\"".concat(data[i].image_src, "\" alt=\"\"></a>");
        }

        $('.pyg_cates').html(html); // console.log(html);
      } else {
        console.log('请求失败');
      }
    });
  } // 商品列表数据部分


  function goodsList() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/goodslist", function (result) {
      var data = result.data;

      if (result.meta.status == 200) {
        var html = template('goodsTpl', {
          arr: data
        });
        $('.pyg_goodslist').html(html);
      } else {
        console.log('请求失败');
      } // console.log(html)

    });
  }
});
//# sourceMappingURL=index.js.map
