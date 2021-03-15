$(function () {
    // 1自定义验证规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1-6位之间！"
            }
        }
    })
    // 2展示用户信息(后面这个功能还要用)
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            data: {},
            success: (res) => {
                console.log(res)
                if (res.status != 0) {
                    return layer.msg(res.message)

                }
                //成功后渲染用户信息
                form.val("formUserInfo", res.data)
            }
        })
    }

    // $("form").on("reset", function (e) {
    //     e.preventDefault()
    // })
    $("#btnReset").on("click", function (e) {
        e.preventDefault()
        //需要使用上面的用户渲染方法实现数据重置信息
        initUserInfo()
    })
    $(".layui-form").on("submit", function (e) {
        // 阻止默认提交
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 成功后弹出提示
                layer.msg("恭喜您，用户信息修改成功！")
                console.log(window)
                console.log(window.parent)
                // 通过本页面查找windown,找父页面window，然后在找父页面的函数调用
                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo()
            }
        })
    })
})