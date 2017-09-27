define(['jquery', 'template', 'ckeditor', 'uploadify', 'region', 'datepicker', 'language', 'validate', 'form'], function ($, template, CKEDITOR) {
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            var html = template('settingsTpl', data.result)
            $('#settingsInfo').html(html)
            //头像上传
            $('#upfile').uploadify({
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/avatar',
                fileObjName: 'tc_avatar',
                width: 120,
                height: 120,
                buttonText: '',
                itemTemplate: '<span></span>',
                onUploadSuccess: function (file, data) {
                    data = JSON.parse(data);
                    if (data.code == 200) {
                        console.log(data.result.path);
                        $('.preview img').attr('src', data.result.path);
                    }
                }
            });
            //省市县三级联动
            $('#pcd').region({
                url: '/public/assets/jquery-region/region.json'
            })
            //处理富文本
            CKEDITOR.replace('editor', {
                toolbarGroups: [
                    {name: 'clipboard', groups: ['clipboard', 'undo']},
                    {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
                ]
            })
            //处理表单提交
            $('#settingsForm').validate({
                sendForm: false,
                valid: function () {
                    var p = $('#p').find('option:selected').text();
                    var c = $('#c').find('option:selected').text();
                    var d = $('#d').find('option:selected').text();
                    var hometown = p + '|' + c + '|' + d
                    for (var key in CKEDITOR.instances) {
                        CKEDITOR.instances[key].updateElement()
                    }
                    $(this).ajaxSubmit({
                        type: 'post',
                        url: '/api/teacher/modify',
                        dataType: 'json',
                        data: {tc_hometown: hometown},
                        success: function (data) {
                            if (data.code == 200) {
                                location.reload()
                            }
                        }
                    })
                }
            })

        }
    })
})