<template>
  <div class="load_wapper">
    <div class="login">
      <h1>AiMaR</h1>
      <h1>机务维修决策辅助推荐系统</h1>
      <el-form class="form_wapper" size="mini" :model="formModel">
        <el-form-item label="用户名:">
          <el-input v-model="formModel.user"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="formModel.password"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button @click="loadBtn" type="primary" plain> 登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from "../API/index";
export default {
  components: {},
  data() {
    return {
      formModel: {
        user: "admin",
        password: "1",
      },
    };
  },
  methods: {
    loadBtn() {
      // api
      //   .post(url, { user: this.user, password: this.password })
      //   .then((res) => {})
      //   .catch((err) => {})
      //   .finally(() => {});
      let getUserRole = this.formModel.user === "admin" ? "admin" : "user";
      localStorage.setItem("userRole", getUserRole);
      // // window.location.href="/main"
      this.$router.push({ path: "/main" });
    },
  },
  mounted() {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.load_wapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(48, 65, 86);
}
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20%;
  transform: translate(-50%, -50%);
  h1 {
    color: white;
    text-align: center;
    font-size: 1.6rem;
    text-shadow: 0 0 8px white;
  }
}

.form_wapper {
  margin-top: 20px;
  background-color: #1f2d3d !important;
  padding: 10px 30px;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #fff;
  font-size: 14px;
}
</style>
