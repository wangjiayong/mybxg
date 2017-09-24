define(['jquery','template'],function($,template){
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
        }
    })
})