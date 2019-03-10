$(function () {
    init()
    // 加载就会执行的 函数
    function init() {
        sildeData();
        catesData();
        goodsList();
    }

    // 轮播图部分
    function sildeData() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata", (result) => {
            // console.log(result);
            if (result.meta.status == 200) {
                // 获取成功
                let data = result.data;
                let html = template('slideTpl', { arr: data });
                $('.pyg_slide').html(html);
                // 初始化轮播图
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 3000
                });
            } else {
                console.log('请求失败');
            }
        }
        );
    }
    // 分类菜单部分
    function catesData() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/home/catitems", (result) => {
           
            let data = result.data;
            if (result.meta.status == 200) {
                let html = '';
                for (let i = 0; i < data.length; i++) {
                    html += ` <a href="javascript:;"><img src="${data[i].image_src}" alt=""></a>`
                }
                $('.pyg_cates').html(html);
                // console.log(html);

            } else {
                console.log('请求失败');
            }
        }
        );

    }

    // 商品列表数据部分
    function goodsList() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/home/goodslist", (result) => {
            let data = result.data;
            if (result.meta.status == 200) {
                let html=template('goodsTpl',{arr:data});
                $('.pyg_goodslist').html(html);

            } else {
                console.log('请求失败');
            }
            console.log(html)
        }
        );
    }
})