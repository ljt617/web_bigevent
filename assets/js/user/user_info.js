$(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value > 6) {
        return `昵称长度不得大于6个字符`;
      }
    },
  });

  // form.verify({
  //   nickname: function(value) {
  //     if (value.length > 6) {
  //       return '昵称长度必须在 1 ~ 6 个字符之间！'
  //     }
  //   }
  // })

  initUserInfo();

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        //调用layui'中的表单方法 form.val快速为表单赋值
        form.val("formUserInfo", res.data);
        console.log(res.data);
      },
    });
  }

  // function initUserInfo() {
  //   $.ajax({
  //     method: "GET",
  //     url: "/my/userinfo",
  //     success: function (res) {
  //       if (res.status !== 0) {
  //         return layer.msg("获取用户信息失败！");
  //       }
  //       // console.log(res)
  //       // 调用 form.val() 快速为表单赋值
  //       form.val("formUserInfo", res.data);
  //     },
  //   });
  // }

  // 重置表单的数据
  $("#btnReset").on("click", function (e) {
    //阻止默认的重置行为
    e.preventDefault();
    //点击重置按钮后让表单重新获取数据赋值
    initUserInfo();
  });

  // $("#btnReset").on("click", function (e) {
  //   // 阻止表单的默认重置行为
  //   e.preventDefault();
  //   initUserInfo();
  // });

  // 监听表单的提交事件
  $(".layui-form").on("submit", function (e) {
    //阻止表单的默认提交行为
    e.preventDefault();
    // let inputParams = form.val("formUserInfo");
    // delete inputParams.username;
    //发送ajax请求
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        

        //调用父页面中的方法重新渲染用户头像和信息
        window.parent.getUserInfo();
      },
    });
  });

  // $(".layui-form").on("submit", function (e) {
  //   // 阻止表单的默认提交行为
  //   e.preventDefault();
  //   // 发起 ajax 数据请求
  //   $.ajax({
  //     method: "POST",
  //     url: "/my/userinfo",
  //     data: $(this).serialize(),
  //     success: function (res) {
  //       if (res.status !== 0) {
  //         return layer.msg("更新用户信息失败！");
  //       }
  //       layer.msg("更新用户信息成功！");
  //       // 调用父页面中的方法，重新渲染用户的头像和用户的信息
  //       window.parent.getUserInfo();
  //     },
  //   });
  // });
});
