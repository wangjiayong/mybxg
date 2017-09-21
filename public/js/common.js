define(['jquery','template', 'cookie'], function ($,template) {//['jquery']引入依赖，依赖jQuery，传入jQuery用$来接收，这里的cookie已经使用了require.js是标准模块,并且被插到了jQuery上所以不用形参来接收了
    //NProgress.start();
    //NProgress.done();

    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });
//实现退出功能,博学谷中的登录的时候给服务器发送请求，服务器给浏览器设置了一个sessionID（存在cookie里的临时会话在内存里浏览器关闭内存消失），此后浏览器里的web请求都会带有sessionID
//这个是判断有没有登录的信息，当按下退出按钮时给服务器发送请求此时服务器把sessionID删除掉，那么此后浏览器里的web请求都没有这个sessionID了,在地址栏里面发送请求（默认get请求）时只要本地有cookie都会放入请求头里发送给后台
    $('#loginout').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/api/logout',
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    location.href = '/main/login'
                }
            }
        })
    })
    var ck = $.cookie('PHPSESSID')
    if (!ck && location.pathname != '/main/login') {//判断当前页面的cookie里面有没有对应的sessionID如果没有那么始终跳转到登录页面,location.pathname != '/main/login'防止在登录页面还重复跳转到登录页面
        location.href = '/main/login'
    }
    var str = $.cookie('loginInfo')
    var obj = str && JSON.parse(str)//判断一下str存不存在，如果不存在来转换就会报错
    //$('.aside .profile .avatar img').attr('src', obj.tc_avatar)
    //$('.aside .profile h4').html(obj.tc_name)
    //通过模板代替上面两句，模板直接使用的是数据对象里面的属性（在模板里被直接当作是变量来使用）
    var tpl='<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>'
    var html=template.render(tpl,obj)
    $('.aside .profile').html(html)
})