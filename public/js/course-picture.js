define(['jquery', 'template', 'util', 'uploadify', 'jcrop','form'], function ($, template, util) {
    //依旧是定位到课程添加
    util.setMenu('/course/add')
    var csid = util.qs('cs_id')//获取跳转过来的页面在地址栏中的id（携带过来的）
    $.ajax({
        type: 'get',
        url: '/api/course/picture',
        data: {cs_id: csid},
        dataType: 'json',
        success: function (data) {
            var html = template('pictureTpl', data.result)
            $('#pictureInfo').html(html)
            //图片上传
            $('#myfile').uploadify({
                width: '80',
                height: 'auto',//让文字居中
                buttonText: '选择图片',
                buttonClass: 'btn btn-success btn-sm',//以上是操作file按钮的样式
                itemTemplate: '<span></span>',//去掉图片提交时的提示信息
                swf: '/public/assets/uploadify/uploadify.swf',//需要的文件
                uploader: '/api/uploader/cover',
                fileObjName: 'cs_cover_original',
                formData: {cs_id: csid},//以上是图片上传请求的路径和传递的参数
                onUploadSuccess: function (a, b, c) {
                    var obj = JSON.parse(b.trim())//把返回的字符串的所有空格去掉再转换成对象
                    $('.preview img').attr('src', obj.result.path)
                }

            })
            //图片裁切
            $('#jcropBtn').click(function () {
                var flag = $(this).attr('data-flag')
                if (flag) {
                    //再次点击的时候跳转到下一步
                    //把下面设置好的表单信息提交给后台来进行对图片的裁切
                    //jcrop插件只是负责得到选区的左上角坐标和宽高放入表单里面，裁切是后台来操作
                    $('#cropForm').ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/picture',
                        data:{cs_id:csid},//表单里没有而后台需要这个参数，把本页面的csid传过去
                        dataType:'json',
                        success:function(data){
                            location.href='/course/lesson?cs_id='+data.result.cs_id
                        }
                    })
                } else {
                    //第一次点击
                    $(this).text('保存图片').attr('data-flag', true)
                    //实现裁切功能
                    cropImage()
                }
            })
            //封装裁切图片的方法
            var img = $('.preview img').eq(0)//获取图片
            function cropImage() {
                img.Jcrop({
                    aspectRatio: 2,//把选区的宽高形成比例关系
                }, function () {
                    console.log(this);
                    //获取当前图片的宽高
                    var width = this.ui.stage.width
                    var height = this.ui.stage.height
                    //计算选区的参数左上角坐标和宽高
                    var x = 0
                    var y = (height - width / 2) / 2//以下都是自定义
                    var w = width
                    var h = width / 2
                    //初始化默认选区的参数
                    var allinp = $('#cropForm').find('input')
                    allinp.eq(0).val(x)
                    allinp.eq(1).val(y)
                    allinp.eq(2).val(w)
                    allinp.eq(3).val(h)
                    //使用以上参数动态创建选区
                    this.newSelection();
                    this.setSelect([x, y, w, h])
                    //初始化缩略预览图(左上角的显示部分选区和预览图不一样，但是都在这里面进行创建和操作)
                    this.initComponent('Thumbnailer', {
                        width: 240,
                        height: 120,
                        thumb: '.thumb'//自己对插件进行扩展
                    })
                    $('.jcrop-thumb').css({//jcrop-thumb插件里缩略图的类名
                        position: 'absolate',
                        top: 0,
                        left: 0
                    })
                    //监控选区的变化的三个事件,这些事件必须加在图片的父容器上
                    img.parent().on('cropstart', 'cropmove', 'cropend', function (a, b, c) {
                        //设置表单，把选区的左上角坐标和宽高放入表单里面
                        //console.log(c);
                        //事件每次发生的时候重新设置上新的数据
                        allinp.eq(0).val(c.x)
                        allinp.eq(1).val(c.y)
                        allinp.eq(2).val(c.w)
                        allinp.eq(3).val(c.h)
                    })
                })
            }
        }
    })
})