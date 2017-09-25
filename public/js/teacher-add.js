define(['jquery', 'template', 'util', 'datepicker', 'language', 'validate', 'form'], function ($, template, util) {
    var tcid = util.qs('tc_id')
    if (tcid) {
        //如果点击了编辑才会有tcid编辑讲师
        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            data: {tc_id: tcid},
            dataType: 'json',
            success: function (data) {
                data.result.op = '编辑讲师'//给对象自定义一个属性
                var html = template('teacherTpl', data.result)
                $('#teacherInfo').html(html)
                submitForm('/api/teacher/update')
            }
        })
    } else {
        //编辑讲师和添加讲师共享一个页面
        var html = template('teacherTpl', {op: '添加讲师'})//传进去一个自定义对象{op:'添加讲师'}，在模板中直接把op取出来
        $('#teacherInfo').html(html)
        submitForm('/api/teacher/add')

    }

    function submitForm(url) {
        $('#teacherform').validate({
            sendForm: false,
            valid: function () {
                //提交成功以后进行操作
                $(this).ajaxSubmit({//这里的this就是form表单
                    type: 'post',
                    url: url,
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            location.href = '/teacher/list'
                        }
                    }
                })
            },
            description: {
                tcName: {
                    required: '用户名不能为空'
                },
                tcPass: {
                    required: '密码不能为空',
                    pattern: '密码必须为6位数'
                },
                tcJoinDate: {
                    required: '日期不能为空',
                }
            }
        })
    }

    //function submitForm(url) {
    //    $('#teacherBtn').click(function () {
    //        $.ajax({
    //            type: 'post',
    //            url: url,
    //            data: $('#teacherform').serialize(),//这里是把页面上做的操作转化成数据提交给后台来处理，把数据传给后台会进行对数据的添加和修改
    //            dataType: 'json',
    //            success: function (data) {
    //                if (data.code == 200) {
    //                   location.href='/teacher/list'
    //                }
    //            }
    //
    //        })
    //    })
    //}
})