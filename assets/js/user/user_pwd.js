$(function () {
  //定义from模块
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: function (value) {
      if (value === $('input[name="oldPwd"]').val()) {
        return `与原密码相同请更换`;
      }
    },
    rePwd: function (value) {
      if (value !== $('input[name="newPwd"]').val()) {
        return `两次密码不一致请重新输入`;
      }
    },
  });

  // 设置ajax请求
  $(".layui-form").on("submit", function (e) {
    //阻止默认提交行为
    e.preventDefault();
    //发起ajax请求
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: {
        oldPwd: $('[name="oldPwd"]').val(),
        newPwd: $('[name="newPwd"]').val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        layer.msg(res.message);
        //重置表单用dom对象方法
        $(".layui-form")[0].reset();
      },
    });
  });

  // form.verify({
  //   pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  //   samePwd: function(value) {
  //     if (value === $('[name=oldPwd]').val()) {
  //       return '新旧密码不能相同！'
  //     }
  //   },
  //   rePwd: function(value) {
  //     if (value !== $('[name=newPwd]').val()) {
  //       return '两次密码不一致！'
  //     }
  //   }
  // })

  // $(".layui-form").on("submit", function (e) {
  //   e.preventDefault();
  //   $.ajax({
  //     method: "POST",
  //     url: "/my/updatepwd",
  //     data: $(this).serialize(),
  //     success: function (res) {
  //       if (res.status !== 0) {
  //         return layui.layer.msg("更新密码失败！");
  //       }
  //       layui.layer.msg("更新密码成功！");
  //       // 重置表单
  //       $(".layui-form")[0].reset();
  //     },
  //   });
  // });
});
