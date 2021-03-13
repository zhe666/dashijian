var baseUrl = "http://ajax.frontend.itheima.net" //开发环境
// var baseUrl = "http://ajax.frontend.itheima.net"//测试环境
// var baseUrl = "http://ajax.frontend.itheima.net"//生产环境
// 拦截所有ajax请求
$.ajaxPrefilter(function (params) {
    // P拼接对应环境的api地址
    params.url = baseUrl + params.url
})

