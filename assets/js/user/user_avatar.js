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

    // 上传文件的按钮
    $('#btnChoose').on('click', function () {
        $('#file').trigger('click')
    })
    // 要去选择某个图片（怎么知道用户选择了图片？）（答：文件选择框的change事件）
    $('#file').on('change', function (e) {
        const fileList = e.target.files  //伪数组
        if (fileList.length === 0) return layer.msg('请选择图片')

        const blobUrl = URL.createObjectURL(fileList[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', blobUrl)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
})