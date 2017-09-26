require.config({
    baseUrl:'/public/assets',//指定paths里面的文件目录
    paths:{//给各个文件取别名，把baseUrl和paths里的路径组合起来就是一个完整的路径了
        jquery:'jquery/jquery',//后缀名不用写
        cookie:'jquery-cookie/jquery.cookie',//这里配置的别名用在引入依赖的时候和入口文件
        bootstrap:'bootstrap/js/bootstrap.min',
        template:'artTemplate/template-web',
        datepicker:'bootstrap-datepicker/js/bootstrap-datepicker',
        language:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate:'validate/jquery-validate',
        form:'jquery-form/jquery.form',
        util:'../js/util',
        common:'../js/common',
        login:'../js/login',
        teacherlist:'../js/teacher-list',
        teacheradd:'../js/teacher-add',
        settings:'../js/settings'
    },
    shim:{
        bootstrap:{
            deps:['jquery']//由于bootstrap不是标准模块，并且依赖于jquery
        },
        language:{
            deps:['jquery','datepicker']
        },
        validate:{
            deps:['jquery']
        }
    }
})