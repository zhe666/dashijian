$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //点击上传按钮时候自动促发文件选择
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    // 为文件选择框绑定 change 事件
    var layer = layui.layer
    $('#file').on('change', function (e) {
        // 获取用户选择的文件
        // var filelist = e.target.files
        // if (filelist.length === 0) {
        //     return layer.msg('请选择照片！')
        // }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 前端非空校验
        if (file == undefined) {
            return layer.msg("请选择图片")
        }
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $("#btnUpload").on("click", function () {
        //获取base64类型的头像(字符串)
        var dataURL = $image
            .cropper("getCroppedCanvas", {
                //创建一个Canvas
                width: 100,
                height: 100
            })
            .toDataURL("image/png")//将canvas画布上图转换
        console.log(dataURL)
        console.log(typeof dataURL)
        // 发送ajax
        $.ajax({
            method: "post",
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("更换成功")
                window.parent.getUserInfo()
            }
        })
    })
})

