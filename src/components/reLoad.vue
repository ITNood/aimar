<template>
  <div class="load_wapper">
    <div class="login">
      <h1>AiMaR</h1>
      <h1>机务维修决策辅助推荐系统</h1>
      <el-form class="form_wapper " size="mini" :model="formModel">
        <el-form-item label="用户名:">
          <el-input v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="formModel.password"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button @click="login" type="primary" plain> 登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from '../API/index';
export default {
  components: {},
  data() {
    return {
      formModel: {
        username: 'admin',
        password: '123456',
      },
    };
  },
  methods: {
    login() {
      api
        .post('/sys/login', {
          username: this.formModel.username,
          password: this.formModel.password,
        })
        .then((res) => {
          localStorage.setItem('Token', res.result.token);
          this.$router.push({ path: '/main' });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
  },
  mounted() {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
