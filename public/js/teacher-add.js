define(['jquery','template','util'],function($,template,util){
    var tcid=util.qs('tc_id')
   if (tcid){
    //如果点击了编辑才会有tcid编辑讲师
       $.ajax({
           type:'get',
           url:'/api/teacher/edit',
           data:{tc_id:tcid},
           dataType:'json',
           success:function(data){
               data.result.op='编辑讲师'//给对象自定义一个属性
              var html=template('teacherTpl',data.result)
               $('#teacherInfo').html(html)
           }
       })
   }else {
       //编辑讲师和添加讲师共享一个页面
       var html=template('teacherTpl',{op:'添加讲师'})//传进去一个自定义对象{op:'添加讲师'}，在模板中直接把op取出来
       $('#teacherInfo').html(html)
   }
})