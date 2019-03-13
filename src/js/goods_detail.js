$(function () {
    init();
    function init() {
        goodsDetail();
        eventList();
    }
    // 请求商品详情的数据
    function goodsDetail() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/goods/detail", { goods_id: getUrl('goods_id') },
            function (result) {
                // console.log(result);
                if (result.meta.status == 200) {
                    let data = result.data;
                    let html = template('detailTpl', data);
                    $('.pyg_view').html(html);
                    // 轮播图初始化
                    var gallery = mui('.mui-slider');
                    gallery.slider({
                        interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
                    });
                } else {
                    console.log('请求失败')
                }

            }
        );
    }
    // 获取地址栏的参数  获取分类id
    function getUrl(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    function eventList() {
        // 给购物车 绑定tap点击 事件
        $(".shopping_car_btn").on("tap",function () {
          // 弹出 mui的消息提示框 自动消失
          mui.toast("请您登录账号");
          
        })
        
      }
    
})