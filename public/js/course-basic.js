define(['jquery', 'template', 'util','ckeditor','validate','form'], function ($, template, util,CKEDITOR) {
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
            //一二级菜单关联，使用后台接口的方式
            $('#firstType').change(function(){
                var pid=$(this).val()
                $.ajax({
                    type:'get',
                    url:'/api/category/child',//通过后台的方式来实现下拉菜单的关联关系
                    data:{cg_id:pid},//把获取的id发送给后台
                    datatype:'json',
                    success:function(data){
                       var tpl=' <option value="">请选择二级分类</option>{{each result}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}'
                        var html=template.render(tpl,data)
                        $('#secondType').html(html)
                    }
                })
            })
            //该页面的富文本部分
            CKEDITOR.replace('editor')//自定义可以参考settings.js里面
            //提交表单
            $('#basicForm').validate({
                sendForm:false,//阻止默认提交
                valid:function(){
                    //表单提交的时候富文本需要单独处理
                    for (var key in CKEDITOR.instances){
                        CKEDITOR.instances[key].updateElement()
                    }
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/basic',
                        data:{cs_id:csid},
                        dataType:'json',
                        success:function(data){
                           if (data.code==200){
                               location.href='/course/picture?cs_id='+data.result.cs_id
                           }
                        }
                    })
                }
            })
        }
    })
})