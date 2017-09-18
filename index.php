<?php
header('content-type:text/html; charset=utf-8');
//echo $_SERVER['PATH_INFO'];
//设置默认目录
$dir='main';
$filename='index';
if(array_key_exists('PATH_INFO',$_SERVER)){
   $path=$_SERVER['PATH_INFO'];//如果存在就获取
   $ret=substr($path,1);
   $str=explode('/',$ret);
//    var_dump($str);
   if(count($str)==2){
   //如果数组里面有两项那么覆盖默认目录
    $dir=$str[0];
    $filename=$str[1];
  }else{
   $filename='login';//没有传入参数的话就直接跳转到登录页
  }
 }
include('./views/'.$dir.'/'.$filename.'.html');
?>