$(function () {
    // 1定义密码规则
    let form = layui.form
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/
            , "密码必须6到12位,且不能出现空格"
        ],
        // 新旧不重复
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "新密码和旧密码不能相同"
            }
        },
        // 两次新密码必须相同
        rePwd: function (value) {
            //value是两次输入的新密码,新密码需要重新获取
            if (value !== $("[name=newPwd]").val()) {
                return "两次新密码输入不一致"
            }
        }
    })
    // 修改密码
    $("form").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                //成功提示 清空密码
                layui.layer.msg("恭喜您,密码修改成功")
                $(".layui-form")[0].reset()
            }
        })
    })
})