define(['jquery','template','util','uploadify'],function($,template,util){
    //依旧是定位到课程添加
    util.setMenu('/course/add')
    var csid=util.qs('cs_id')//获取跳转过来的页面在地址栏中的id（携带过来的）
    $.ajax({
        type:'get',
        url:'/api/course/picture',
        data:{cs_id:csid},
        dataType:'json',
        success:function(data){
            var html=template('pictureTpl',data.result)
            $('#pictureInfo').html(html)
            $('#myfile').uploadify({
                width:'80',
                height:'auto',//让文字居中
                buttonText : '选择图片',
                buttonClass : 'btn btn-success btn-sm',//以上是操作file按钮的样式
                itemTemplate:'<span></span>',//去掉图片提交时的提示信息
                swf:'/public/assets/uploadify/uploadify.swf',//需要的文件
                uploader:'/api/uploader/cover',
                fileObjName:'cs_cover_original',
                formData:{cs_id:csid},//以上是图片上传请求的路径和传递的参数
                onUploadSuccess:function(a,b,c){
                 var obj=JSON.parse(b.trim())//把返回的字符串的所有空格去掉再转换成对象
                    $('.preview img').attr('src',obj.result.path)
                }

            })
        }
    })
})