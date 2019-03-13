$(function () {
    let GoodsObj = {};
    init();
    function init() {
        goodsDetail();
        eventList();
    }
    // 请求商品详情的数据
    function goodsDetail() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/goods/detail", { goods_id: getUrl('goods_id') },
            function (result) {
                console.log(result);
                if (result.meta.status == 200) {
                    // 获取下添加到购物车  需要用到的商品对象的属性
                    GoodsObj = {
                        cat_id: result.data.cat_id,
                        goods_id: result.data.goods_id,
                        goods_name: result.data.goods_name,
                        goods_number: result.data.goods_number,
                        goods_price: result.data.goods_price,
                        goods_small_logo: result.data.goods_small_logo,
                        goods_weight: result.data.goods_weight
                    };
                    //   debugger;
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


    function eventList() {
        // 给购物车 绑定tap点击 事件
        $(".shopping_car_btn").on("tap", function () {
            // 判断会话存储有没有userinfo的信息
            let userinfo = sessionStorage.getItem('userinfo');
            // console.log(userinfo)
            if (!userinfo) {
                mui.toast('没有注册')
                setInterval(() => {
                    //  点击购物车没有登录的话  就先跳到登录页面  并把当前页的地址存起来
                    sessionStorage.setItem('pageurl', location.href);
                    location.href = 'login.html';
                }, 1000);
            } else {
                // 登录过  就发送请求
                // token 从本地存储里获取
                let token = JSON.parse(userinfo).token;
                $.ajax({
                    type: "post",
                    url: "http://api.pyg.ak48.xyz/api/public/v1/my/cart/add",
                    data: {
                        info: JSON.stringify(GoodsObj)
                    },
                    headers: {
                        Authorization: token
                    },
                    success: function (result) {
                        console.log(result);
                        // 成功后是否跳转到购物车页面
                        if (result.meta.status == 200) {
                            mui.confirm("您是否要跳转到购物车页面？", "添加成功", ["跳转", "取消"], function (editType) {
                                if(editType.index==0){
                                    location.href='cart.html'
                                }else if(editType.index==1){

                                }

                            })
                        }else{
                            console.log("请求失败")
                        }
                    }
                });
            }
        })

    }

    // 获取地址栏的参数  获取分类id
    function getUrl(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

})