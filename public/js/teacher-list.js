define(['jquery','template','util','bootstrap','state'],function($,template,util){
    util.setMenu(location.pathname)
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success:function(data){
            var html=template('teacherTpl',data)
            $('#teacherInfo').html(html)

            $('.eod').click(function(){
                //把此功能需要传给后台的数据先渲染到td上然后点击的时候来获取
                var that=this
                var td=$(this).closest('td')
               var tcid=td.attr('data-tcid')
               var tcstatus=td.attr('data-tcstatus')
                $.ajax({
                    type:'post',
                    url:'/api/teacher/handle',
                    data:{tc_id:tcid,tc_status:tcstatus},//传过去1返回0，传过去0返回1
                    dataType:'json',
                    success:function(data){
                        if (data.code==200){
                            td.attr('data-tcstatus',data.result.tc_status)
                            if (data.result.tc_status==0){
                                $(that).text('注销')
                            }else {
                                $(that).text('启用')
                            }
                        }
                    }
                })
            })

           $('.chak').click(function(){
               var td=$(this).closest('td')
               var tcid=td.attr('data-tcid')
               $.ajax({
                   type:'get',
                   url:'/api/teacher/view',
                   data:{tc_id:tcid},
                   dataType:'json',
                   success:function(data){
                       var html=template('modalTpl',data.result)//data.result是一个对象不需要遍历
                       $('#modalinfo').html(html)
                       $('#teacherModal').modal()
                   }
               })
           })
        }
    })
})