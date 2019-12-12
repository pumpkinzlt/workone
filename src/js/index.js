
$(function(){
    var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        //自动播放
        autoplay: true,

    })


    //   二级菜单
    // $(function(){
    //     //入口函数
    //     //首先把所有二级菜单先隐藏
    //     $('.box').hide();
    //     $('.chenshan').has('.box').mouseenter(function(){
    //         $(this).children().show()
    //     })
    //     $('.chenshan').has('.box').mouseleave(function(){
    //         $(this).children().hide()
    //     })
    // })


    // 关键字搜索
    var input = getElements("search")[0];//搜索关键字输入框
    var keywordBox = getElements("keyword")[0];//显示关键字结果的盒子
    var flag = true;//判断用户是否输入完成,默认是完成的

    input.addEventListener('compositionstart', function () {
        flag = false;
    })
    input.addEventListener('compositionend', function () {
        flag = true;
    })

    input.oninput = function () {
        keywordBox.style.display = "block";

        setTimeout(function () {
            if (flag) {

                var keyword = input.value;//输入的关键字

                //方法二
                ajax({
                    dataType: 'jsonp',
                    url: 'https://suggest.taobao.com/sug',
                    data: {
                        code: "utf-8",
                        q: keyword,
                        _ksTS: "1563970517892_385",
                        k: 1,
                        area: "c2c",
                        bucketid: 10
                    },
                    success: function (data) {
                        var result = data.result;//是一个数组
                        var str = "";
                        result.forEach(function (value) {
                            str += "<li>" + value[0] + "</li>"
                        })
                        keywordBox.innerHTML = str;
                    }
                })
            }
        }, 0)
    }
    input.onblur = function () {
        keywordBox.style.display = "none";
    }


    // 倒计时
    var intDiff = parseInt(60);//倒计时总秒数量
    function timer(intDiff) {
        window.setInterval(function () {
            var day = 0,
                hour = 0,
                minute = 0,
                second = 0;//时间默认值        
            if (intDiff > 0) {
                day = Math.floor(intDiff / (60 * 60 * 24));
                hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            }
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            $('#day_show').html(day + "天");
            $('#hour_show').html('<s id="h"></s>' + hour + '时');
            $('#minute_show').html('<s></s>' + minute + '分');
            $('#second_show').html('<s></s>' + second + '秒');
            intDiff--;
        }, 1000);
    }
    $(function () {
        timer(intDiff);
    });

    
})