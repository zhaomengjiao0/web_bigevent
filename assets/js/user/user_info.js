$(function() {

    // 定义昵称的验证规则
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间';
            }
        }
    });


    initUserInfo();

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                form.val('formUserInfo', res.data);
            }
        });
    }


    resetFormInfo()

    // 表单数据的重置
    function resetFormInfo() {
        $('#btnReset').on('click', function(e) {
            // 禁止重置按钮的默认行为
            e.preventDefault();
            // 初始化表单信息
            initUserInfo();
        })
    }


    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 组织表单的默认提交行为
        e.preventDefault();
        // 发起Ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功！');
                // 调用父页面index中的方法重新渲染头像和信息
                window.parent.getUserInfo();
            }
        });
    })

})