$(function(){
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称的长度要在1~6个字符'
            }
        }
    })
    initUserinfo()
    function initUserinfo(){
        $.ajax({
            method:'get',
            url:'/my/userinfo',
            success(res){
                if(res.status !== 0){
                    return layer.msg('获取用户信息失败')
                }
                form.val('userForm',res.data)
            }
        })
    }
    // 给重置按钮添加点击事件
    $('#btnReset').on('click',function(e){
        // 阻止默认提交行为
        e.preventDefault()
        initUserinfo()
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})