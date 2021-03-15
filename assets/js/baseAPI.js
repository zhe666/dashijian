var baseUrl = "http://ajax.frontend.itheima.net" //开发环境
// var baseUrl = "http://ajax.frontend.itheima.net"//测试环境
// var baseUrl = "http://ajax.frontend.itheima.net"//生产环境
// 拦截所有ajax请求
$.ajaxPrefilter(function (options) {
    // 拼接对应环境的api地址
    options.url = baseUrl + options.url

    // 身份认证
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
        //3如果身份认证失败跳转到登录页面
        // 无论请求成功还是请求失败都执行complete
        options.complete = function (res) {
            console.log(res.responseJSON)
            //判断 如果状态码是1 错误信息是身份认证失败，那么就跳转到登录界面
            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message === "身份认证失败！") {
                //跳转到登录页面，销毁token
                localStorage.removeItem("token")
                location.href = "/login.html"
            }
        }
    }

})
//嵌套错误
//！感叹号错误
//直接复制