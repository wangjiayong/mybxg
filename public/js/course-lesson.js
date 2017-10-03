define(['jquery','template','util'],function($,template,util){
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
        }
    })
})