$(function () {
    //需求 aja获取用户信息 渲染到用户页面
    // 这个功能,后面其他的页面/模块还要用
    getUserInfo();
    // 退出
    var layer = layui.layer;
    $("#btnLogout").on("click", function () {
        layer.confirm("是否确认退出?", { icon: 3, title: "提示" }, function () {
            // 1.清空本地token
            localStorage.removeItem("token")
            // 2.页面跳转
            location.href = "/login.html"
            // 关闭询问框
            layer.close(index)
        })
    })
})
//必须保证这个函数是全局的,后面其他功能要用
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // 配置头信息, 设置token, 身份识别认证
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: (res) => {
            console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 })
            }
            //头像和文字渲染
            renderAvatar(res.data);
        }
        //无论请求成功或失败都会执行 complete
    })
}
function renderAvatar(user) {
    //渲染用户名,如果有昵称以昵称为准
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp,&nbsp" + name)
    // 渲染头像,判断图片头像是否存在
    if (user.user_pic !== null) {
        //渲染文字头像,隐藏图片头像
        $(".layui-nav-img").show().attr("src", user.user_pic)
        $(".text-avatar").hide()
    } else {
        //渲染图片头像,隐藏文字头像
        $(".layui-nav-img").hide()
        let text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)

    }
}