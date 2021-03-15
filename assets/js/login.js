// 入口函数
$(function () {
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on("click ", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    // 自定义验证规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6-16位,且不能输入空格"
        ],
        //确认密码规则
        // 选择器必须带空格,选择的是后代中的input,name属性值位password的哪一个标签
        repwd: function (value) {
            var pwd = $(".reg-box input[name=password]").val()
            //比较
            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        }
    })
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val()
            },
            success: (res) => {
                if (res.status != 0) {
                    return alert(res.message)
                }
                layer.msg("注册成功,请登录", { icon: 1 });
                $("#link_login").click()//调用登录表单
                $('#form_reg')[0].reset();//reset重置表单
            }
        })
    })
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                //校验返回状态
                console.log(res)
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //保存token,跳转页面
                localStorage.setItem("token", res.token)
                location.href = "/index.html" //跳转页面
            }
        })
    })
}
)
