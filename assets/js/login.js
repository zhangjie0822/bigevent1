$(function(){
    // 点击“去注册账号”的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登录”的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            const pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return '两次密码不一致！'
            }
        }
    })
    // 为注册提交添加验证事件
    $('#form_reg').on('submit',function(e){
        // e.preventDefault()
        e.preventDefault()
        const data={
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data,
            success(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                $('#link_login').click()
            }
        })
        // $.post('http://www.liulongbin.top:3007/api/reguser'),
        // { username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
        // function(res){
        //     if(res.status!==0){
        //                     return console.log(res.message)
        //                 }
        //     console.log('注册成功！')
        // }
    })
    // 监听登陆表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success(res){
                if(res.status !== 0){
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                // console.log(res.token)
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})