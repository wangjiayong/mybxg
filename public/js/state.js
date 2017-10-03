define(['jquery'],function($){
    //define是引入依赖的
    $(document).ajaxStart(function(){
         $('.overlay').show()
    })
    $(document).ajaxStop(function(){
        setTimeout(function(){
            $('.overlay').hide()
        },500)

    })
})