define(['jquery'],function($){
    return {//工具函数里返回一个对象，在对象里可以添加多个属性方法
        qs:function(key){//查询字符串简写为qs
            var parma=location.search.substr(1)
            if (parma){
                var arr=parma.split('&')
                var result=null
                $.each(arr,function(index,item){
                    var pve=item.split('=')
                    if (pve[0]==key){
                        result=pve[1]
                        return false
                    }
                })
            }
            return result
        }
    }
})