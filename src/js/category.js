$(function () {
    let CateDatas;
    init();
    function init() {
        categoies();
        eventList();
    }
    function eventList(params) {
        $(".left_menu ").on("tap", "li", function () {
            $(this).addClass("active").siblings().removeClass("active");
            // 获取 被点击的li标签的索引 $(this).index()
            let index = $(this).index();
            rightData(index);

        })
    }

    // 发送一次请求    获取到数据 
    function categoies() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/categories", (result) => {
            if (result.meta.status == 200) {
                CateDatas = result.data;
                // 渲染左边
                leftData();
                // 右边页面的渲染
                rightData(0);
            } else {
                console.log('请求失败');
            }

        }
        );

    }
    // 左边的渲染
    function leftData() {

        let html = '';
        // console.log(html)
        for (let i = 0; i < CateDatas.length; i++) {
            html += `<li class="${i == 0 ? "active" : ""}">${CateDatas[i].cat_name}</li>`
        }
        $('.left_menu').html(html);
        // console.log(CateDatas[0].cat_name)
    }
    // 右边页面的渲染
    function rightData(index) {
        // 根据索引值  获取到对应的数据
        let item2Obj = CateDatas[index];
        let rightData = item2Obj.children;
        let html = template('cateTpl', { arr: rightData })
        $('.right_box').html(html);
        // console.log(CateDatas)
    }
})