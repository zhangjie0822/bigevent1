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
    // $('#btnConfirm').on('click',function(){
    //     var dataURL = $image
    //   .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    //     width: 100,
    //     height: 100
    //   })
    //   .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    //   $.ajax({
    //     method:'post',
    //     url:'/my/update/avatar',
    //     data:{
    //         avatar:dataURL
    //     },
    //     success(res){
    //         if(res.code !== 0) return layer.msg('上传头像失败')
    //         layer.msg('上传头像成功')
    //         window.parent.getUserInfo()
    //     },
    //     error(err){
    //         console.log(err)
    //     }
    //   })
    // })
    // 为确定按钮，绑定点击事件
  $('#btnConfirm').on('click', function() {
    // 1. 要拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2. 调用接口，把头像上传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })
  })
})