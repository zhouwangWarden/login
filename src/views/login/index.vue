<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt="" />
      </div>

      <!-- 登录表单区 -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="0px"
        class="login_form"
      >
        <div class="title-tips">欢迎登陆</div>
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="form.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-s-release"
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
          <el-button type="info" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getNewsChannel } from "../../api/Newsapi"
export default {
  data() {
    return {
      form: {
        name: "admin",
        password: "123456"
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          /*
            1,将登录成功之后token，保存到客户端的sessionStorage中
              1.1项目中除了登录之外的其他API接口，必须在登录后才能访问
              1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
            2、通过编程方式导航跳转到后台主页，路由地址是/home
            */
          sessionStorage.setItem("isLogin", true)
          this.$router.push("/home")
          this.$message({
            message: "登录成功",
            type: "success"
          })
        } else {
          this.$message({
            message: "请输入正确用户名密码",
            type: "warning"
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: rgb(140, 166, 238);
  height: 100%;
}
.login_box {
  width: 450px;
  height: 350px;
  /* 背景色，圆弧 */
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute; //定位
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end; //
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box; //使padding和border的值不会在影响元素的高度，相当于已经把它们算在content里了
}
.title-tips {
  margin-top: 29px;
  font-size: 26px;
  font-weight: 400;
  margin: 20px 20px;
  text-align: center;
}
</style>
