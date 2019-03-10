$(function () {
    let CateDatas;
    init();
    function init() {
        categoies();
        eventList();
    }
    // 判断有没有缓存
    let sseionStr = sessionStorage.getItem('cates');
    // 把缓存数据 重新解析成 对象格式
    let sessObj = JSON.parse(sseionStr);
    if (!sseionStr) {
        categoies();
    } else {
        // 如果有缓存  看是否失效
        if (Date.now() - sessObj.time > 500000) {
            categoies();
        } else {
            CateDatas = sessObj.data;
            // 左右渲染
            leftData();
            rightData(0);
        }

    }



    // 绑定点击事件
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
                // 会话存储
                let sseionObj = {
                    data: CateDatas,
                    time: Date.now()
                }
                // 千万要将对象转换成字符串  在存进去
                sessionStorage.setItem("cates", JSON.stringify(sseionObj));
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
        var leftScroll = new IScroll('.left_box');
    }
    // 右边页面的渲染
    function rightData(index) {
        // 根据索引值  获取到对应的数据
        let item2Obj = CateDatas[index];
        let rightData = item2Obj.children;
        let html = template('cateTpl', { arr: rightData })
        $('.right_box').html(html);


        // 判断图片是否加载完毕  然后初始化iscroll(图片加载事件)
        let imgLength=$('.item_list img').length;
        
        $('.item_list img').on('load',()=>{
            imgLength--;
            console.log(imgLength)
            if(imgLength==0){
                var rightScroll = new IScroll('.right_box');
            }
        })
        
    }
})