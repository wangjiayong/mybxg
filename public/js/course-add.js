define(['jquery','util','form'],function($,util){
    util.setMenu(location.pathname)
    $('#courseBtn').click(function(){
        $('#courseForm').ajaxSubmit({
            //利用表单提交插件，发送ajax请求会自动把，表单中的信息（如name里的）发送到后台所以不用写data了
            type:'post',
            url:'/api/course/create',
            dataType:'json',
            success:function(data){
                if (data.code==200){
                    location.href='/course/basic?cs_id='+data.result.cs_id
                }
            }
        })
    })
})