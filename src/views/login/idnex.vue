<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current': item.current}"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
      <!--表单 start-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-from" v-show="model === 'register'">
          <label for="passwords">重复密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input id="code" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getCodeHandle"
                :disabled="CodeButtonStatus.status"
              >{{CodeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
          >{{ model === 'login' ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import sha1 from "js-sha1";
import {
  reactive,
  ref,
  isRef,
  toRefs,
  onMounted,
  watch,
  onUnmounted,
} from "@vue/composition-api";
import {
  stripscript,
  validatePass,
  validateEmail,
  validateVCode,
} from "@/utils/validate";
export default {
  name: "login",
  setup(props, { refs, root }) {
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback(); //true
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login, 直接通过
      if (model.value === "login") {
        callback();
      }
      // 过滤后的数据
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validateVCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    /*
     * 声明数据
     */
    // 这里面放置data数据、生命周期、自定义的函数
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" },
    ]);
    // 定义发送验证码状态
    const CodeButtonStatus = reactive({
      status: false,
      text: "获取验证码",
    });
    // 模块值
    const model = ref("login");
    // 登录按钮禁用
    const loginButtonStatus = ref(true);
    // 倒计时
    const timer = ref(null);
    // 表单的验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }],
    });

    // 表单绑定数据
    // 410293095@qq.com
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: "",
    });
    /**
     * 声明函数
     */
    
    // 切换模块
    const toggleMenu = (data) => {
      menuTab.forEach((elem, index) => {
        elem.current = false;
      });
      // 高光
      data.current = true;
      // 修改模块值
      model.value = data.type;
      resetFromData();
      clearCountDown();
    };

    // 获取验证码
    const getCodeHandle = () => {
      if (model.value === "login") {
        if (ruleForm.username == "") {
          root.$message({
            showClose: true,
            message: "请输入您的邮箱!",
            type: "error",
          });
          return;
        } else if (validateEmail(ruleForm.username)) {
          root.$message.error("邮箱格式有误,请从新输入!");
          return;
        } else {
          CodeButtonStatus.status = true;
          CodeButtonStatus.text = "发送中";
          getCodeInfo();
        }
      } else if (model.value === "register") {
        if (ruleForm.username == "") {
          root.$message.error("请输入您要注册的邮箱地址！");
          return;
        } else if (ruleForm.password == "") {
          root.$message.error("请输入您的密码！");
          return;
        } else if (ruleForm.password !== ruleForm.passwords) {
          root.$message.error("请确认重复密码正确!");
          return false;
        } else {
          CodeButtonStatus.status = true;
          CodeButtonStatus.text = "发送中";
          getCodeInfo();
        }
      }
    };
    // 获取验证码方法
    const getCodeInfo = () => {
      let VerificData = {
        username: ruleForm.username,
        module: model.value,
      };
      root.$http.login.GetSms(VerificData).then((res) => {
        countDown(60);
        if (res.data.resCode === 0) {
          root.$message.success(res.data.message);
          // let code = res.data.message.substring(res.data.message.length - 6);
          // ruleForm.code = code;
          loginButtonStatus.value = false;
        }
      });
    };

    // 登录预验证
    const submitForm = (loginForm) => {
      refs[loginForm].validate((valid) => {
        if (valid) {
          model.value === "login" ? login() : register();
        }
      });
    };

    // 登录 板块请求方法
    const login = () => {
      let loginData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
      };
      root.$http.login
        .Login(loginData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          root.$message.error(error);
        });
    };

    // 注册 板块请求方法
    const register = () => {
      let registerData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
      };
      root.$http.login.RegiSter(registerData).then((res) => {
        console.log(res.data);
        if (res.data.resCode === 0) {
          root.$message.success(res.data.message);
          toggleMenu(menuTab[0]);
          clearCountDown();
        }
      });
    };

    // 倒计时
    const countDown = (number) => {
      // 多次点击 有就清掉
      timer.value && clearInterval(timer.value);
      // 循环定时器
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          CodeButtonStatus.status = false;
          CodeButtonStatus.text = "再次获取";
        } else {
          CodeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };

    // 清除倒计时
    const clearCountDown = () => {
      clearInterval(timer.value);
      CodeButtonStatus.status = false;
      CodeButtonStatus.text = "获取验证码";
    };

    // 清除表单数据
    const resetFromData = () => {
      // 重置表单
      // this.$refs[formName].resetFields(); //2.0
      refs.loginForm.resetFields(); // 3.0
    };

    
    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() => {
    });
    onUnmounted(() => {
      clearInterval(timer.value);
    });
    return {
      loginButtonStatus,
      CodeButtonStatus,
      clearCountDown,
      getCodeHandle,
      getCodeInfo,
      toggleMenu,
      submitForm,
      countDown,
      register,
      ruleForm,
      menuTab,
      login,
      model,
      rules,
      timer,
    };
  },
};
</script>
<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100vh;
  background-color: #344a5f;
  overflow: hidden;
}
.login-wrap {
  width: 330px;
  height: 100%;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>