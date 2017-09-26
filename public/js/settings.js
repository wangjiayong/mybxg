define(['jquery','template','uploadify'],function($,template){
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success:function(data){
            var html=template('settingsTpl',data.result)
            $('#settingsInfo').html(html)
            $('#upfile').uploadify({
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/avatar',
                fileObjName : 'tc_avatar',
                width : 120,
                height : 120,
                buttonText : '',
                itemTemplate:'<span></span>',
                onUploadSuccess : function(file,data){
                    data = JSON.parse(data);
                    if(data.code == 200){
                        console.log(data.result.path);
                        $('.preview img').attr('src',data.result.path);
                    }
                }
            });
        }
    })
})