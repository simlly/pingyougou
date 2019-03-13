"use strict";

$(function () {
  // 定义变量 存参数  发送请求需要带过去
  var goodsObj = {
    query: '',
    cid: getUrl("cid"),
    pagenum: '1',
    //第一页
    pagesize: '5' //显示几条数据

  };
  var TotalPage = 1;
  init(); // mui上拉刷新下拉加载

  function init() {
    eventList();
    mui.init({
      pullRefresh: {
        container: ".pyg_view",
        down: {
          auto: true,
          //  触发下拉刷新时自动触发   初始化的时候刷新  生成页面标签
          callback: function callback() {
            var cd = function cd(goodsData) {
              var html = template('goodsTpl', {
                arr: goodsData
              });
              $('.goods_list').html(html); // 结束下拉刷新

              mui('.pyg_view').pullRefresh().endPulldownToRefresh(); // 重置 组件

              mui('.pyg_view').pullRefresh().refresh(true);
              goodsObj.pagenum = 1;
            };

            getGoodsData(cd);
          }
        },
        up: {
          //  触发上拉刷新时自动触发
          callback: function callback() {
            // 判断当前是否>=最大的页数  是就结束上拉加载
            if (goodsObj.pagenum >= TotalPage) {
              mui(".pyg_view").pullRefresh().endPullupToRefresh(true);
            } else {
              goodsObj.pagenum++; // 数据回来之后

              var cb = function cb(goodsData) {
                var html = template("goodsTpl", {
                  arr: goodsData
                }); // append 追加

                $(".goods_list").append(html); // 结束上拉组件
                // 结束上拉加载更多 如果没有数据 传入 true 否则 传入 false

                mui(".pyg_view").pullRefresh().endPullupToRefresh(false);
              };

              getGoodsData(cb);
            }
          }
        }
      }
    });
  } // 因为在MUI框架中  会默认a标签不跳转   所以 用tap事件  跳转


  function eventList() {
    // a标签  绑定tap点击事件    (箭头函数this是不绑定的   或获取上下函数的this做自己的)
    $('.goods_list').on('tap', 'a', function () {
      var href = this.href;
      location.href = href; // console.log(this.href)
    });
  } // 发送请求  获取商品列表的详细信息


  function getGoodsData(cd) {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/goods/search", goodsObj, function (result) {
      if (result.meta.status == 200) {
        // 请求成功  将数据渲染会页面
        var goodsData = result.data.goods; // 计算总页码

        TotalPage = Math.ceil(result.data.total / goodsObj.pagesize);
        cd(goodsData);
      } else {
        console.log('请求失败');
      }
    });
  } // 获取地址栏的参数  获取分类id


  function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }
});
//# sourceMappingURL=goods_list.js.map
