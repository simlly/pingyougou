$(function () {
    // 定义变量 存参数  发送请求需要带过去
    let goodsObj = {
        query: '',
        cid: getUrl("cid"),
        pagenum: '1',   //第一页
        pagesize: '5'    //显示几条数据
    }
    init()
    function init() {
        getGoodsData();
    }
    // 发送请求  获取商品列表的详细信息
    function getGoodsData() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/goods/search", goodsObj, (result) => {
            if (result.meta.status == 200) {
                // 请求成功  将数据渲染会页面
                let goodsData = result.data.goods;
                let html = template('goodsTpl', { arr: goodsData });
                $('.pyg_view').html(html);
            } else {
                console.log('请求失败');
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
})