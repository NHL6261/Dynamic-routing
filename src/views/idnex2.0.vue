<template>
  <div class="login-swiper">
    <el-row :gutter="24" class="login-wrap">
      <el-col :span="24">
        <ul class="menu-list">
          <li
            v-for="(item, index) in menuTab"
            :key="index"
            :class="{current : item.current}"
            @click="toggleMenu(item)"
          >{{item.title}}</li>
        </ul>
        <div v-if="isShow">
          <el-form
            ref="loginRef"
            :model="loginForm"
            label-width="80px"
            :rules="loginRules"
            status-icon
          >
            <el-form-item class="margin-setting" prop="emil">
              <label :class="{ label: color }">邮箱</label>
              <el-input v-model="loginForm.emil"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <label :class="{ label: color }">密码</label>
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>

            <el-form-item prop="passwords" v-if="model === 'register' ">
              <label :class="{ label: color }">重复密码</label>
              <el-input type="password" v-model="loginForm.passwords"></el-input>
            </el-form-item>
            <el-form-item prop="verification">
              <label :class="{ label: color }">验证码</label>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-input v-model="loginForm.verification"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-button @click="getVerCoede" type="success">获取验证码</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-button style="margin-top: 10px" type="primary" @click="login">{{menuTab.current  ? '登录' : '注册'}}</el-button>
          </el-form>
        </div>
      </el-col>
      <el-col :span="24"></el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import { validate_email, validate_password } from "@/utils/valited";
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      // 验证手机号的正则表达式
      const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regEmail.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入正确邮箱!"));
      }
    };
    // 检验密码
    const validate_password_rules = (rule, value, callback) => {
      let regPassword = validate_password(value);
      let passwords_value = this.loginForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regPassword) {
        callback(new Error("请入 >=6 并且 <= 20 位的密码，包含数字、字母"));
      } else if (passwords_value && passwords_value !== value) {
        callback(new Error("两次密码不一致，请重新输入"));
      } else {
        callback();
      }
    };
    // 检验确认密码
    const validate_passwords_rules = (rule, value, callback) => {
      if (this.model === "login") {
        callback();
        return false
      }else if (this.loginForm.password !== this.loginForm.passwords) {
        callback(new Error("两次密码不一致，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        {
          title: "登录",
          current: true,
          type: 'login'
        },
        {
          title: "注册",
          current: false,
          type: 'register'
        },
      ],
      color: true,
      loginForm: {
        emil: "",
        password: "",
        passwords: "",
        verification: "",
      },
      isSelected: true,
      isShow: true,
      model:'login',
      // 验证规则
      loginRules: {
        emil: [
          { required: true, message: "请输入您的邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入您的密码!", trigger: "blur" },
          { validator: validate_password_rules, trigger: "blur" },
        ],
        passwords: [
          { required: true, message: "重复密码不能为空!", trigger: "blur" },
          { validator: validate_passwords_rules, trigger: "blur" },
        ],
        verification: [
          { required: true, message: "验证码不能为空!", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach((elem, index) => {
        elem.current = false
      })
      // 高光
      data.current = true
      // 注册
      this.model = data.type
      // this.isShow = false
    },
    // 获取验证码
    getVerCoede() {},
    // 登录验证
    login() {
      this.$refs.loginRef.validate((valid) => {
        console.log(valid);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-swiper {
  height: 100vh;
  overflow: hidden;
  background-color: #344a5f;
  position: relative;
}
.login-wrap {
  width: 330px;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-30%);
}
.menu-list {
  text-align: center;
}
.menu-list > li {
  display: inline-block;
  width: 88px;
  line-height: 36px;
  font-size: 14px;
  border-radius: 2px;
  cursor: pointer;
}
.current {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
}
.margin-setting {
  margin-left: 0px !important;
}
.el-button {
  width: 100%;
}
.el-form-item {
  margin-bottom: 5px;
}
.label {
  color: #fff;
  font-size: 14px;
}
</style>
