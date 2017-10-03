define(['jquery', 'template', 'util', 'bootstrap', 'form'], function ($, template, util) {
    util.setMenu('/course/add')
    var csid = util.qs('cs_id')
    $.ajax({
        type: 'get',
        url: '/api/course/lesson',
        data: {cs_id: csid},
        dataType: 'json',
        success: function (data) {
            var html = template('lessonTpl', data.result)
            $('#lessonInfo').html(html)
            //有与ajax是异步的所以必须等页面被渲染出来才能操作按钮的功能
            $('#addlesson').click(function () {
                var html = template('modalTpl', {op: '添加课时'})
                $('#modalInfo').html(html)
                $('#chapterModal').modal()//显示模态框的方法在bootstrap里面所以要引入editorlesson
                //添加按钮的功能，添加课时
                $('#addOrEditor').click(function () {
                    $('#lessonForm').ajaxSubmit({
                        type: 'get',
                        url: '/api/course/chapter/add',
                        data: {ct_cs_id: csid},
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 200) {
                                location.reload()//添加课时时把书发送给后台以后后台操作玩吧数据放到数据里面，location.reload()后加载当前页面把新数据又请求过来
                            }
                        }
                    })
                })
            })
            $('.editorlesson').click(function () {
                //编辑的时候要先查询在获取
                var ctid = $(this).attr('data-ctid')//先获取当前点击按钮对应的id然后再发送ajax请求数据
                $.ajax({
                    type: 'get',
                    url: '/api/course/chapter/edit',
                    data: {ct_id: ctid},
                    dataType: 'json',
                    success: function (data) {
                        //把请求过来的数据填充到模态框里面
                        data.result.op = '编辑课时'
                        var html = template('modalTpl', data.result)
                        $('#modalInfo').html(html)
                        //填充完数据再显示模态框
                        $('#chapterModal').modal()
                        //添加按钮的功能，修改课时
                        $('#addOrEditor').click(function () {
                            $('#lessonForm').ajaxSubmit({
                                type: 'get',
                                url: '/api/course/chapter/modify',
                                data: {ct_cs_id: csid,ct_id:ctid},
                                dataType: 'json',
                                success: function (data) {
                                    if (data.code == 200) {
                                        location.reload()
                                    }
                                }
                            })
                        })
                    }
                })
            })
        }
    })
})