define(['jquery', 'template', 'util'], function ($, template, util) {
    util.setMenu('/course/add')//不管是从哪个页面跳转过来的都让它选中课程添加
    var csid = util.qs('cs_id')//本页面的数据请求需要其他页面传过来的id（获取地址栏里面的id）
    var flag = util.qs('flag')//自定义一个flag，来判断跳转到当前页面是需要进行编辑还是添加操作
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        data:{cs_id:csid},//传到后台不同的id返回不同的数据
        dataType:'json',
        success:function(data){
            console.log(data);
            if (flag){
             data.result.operate='课程编辑'
         }else {
             data.result.operate='课程添加'
         }
            var html=template('basicTpl',data.result)
            $('#basicInfo').html(html)
        }
    })
})