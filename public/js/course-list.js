define(['jquery','template','util','state'],function($,template,util){
util.setMenu(location.pathname)
    $.ajax({
        type:'get',
        url:'/api/course',
        dateType:'json',
        success:function(data){
           var html=template('courseTpl',data)
            $('#courseInfo').html(html)
        }
    })
})