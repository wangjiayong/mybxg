define(['jquery','cookie'],function($){
    $('#loginbtn').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/login',//请求自己配置的服务器上的资源
            data:$('#loginform').serialize(),//表单属性中的name的值是发送给后台使用的,通过表单序列化获取所有要提交的表单name属性
            dataType:'json',//这里形成跨域但是这里的接口是json接口不是jsonp接口所以不能使用jsonp，只能是配置反向代理用/api代表 http://api.studyit.com而/api就是mybxg.com/api此时域名相同就不会形成跨域了
            success:function(data){
                if (data.code==200){
                    //把登录成功的数据设置在根路径（域名后面的斜杠）的cookie上让其他子页面可以获取到
                    //JSON.stringify(data.result)要把对象设置成字符串才能设置到cookie上
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'})
                    location.href='/main/index'//这个操作地址栏它会自动在http://mybxg.com后面补全/main/index（.html已经在路由分发的PHP页面中拼接上了）
                }
            }
        })
        return false;//由于按钮有submit默认提交行为提交以后会刷新页面
    })
})