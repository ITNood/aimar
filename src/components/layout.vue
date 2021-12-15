<template>
  <div class="app_wapper">
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside class="slider_container">
        <el-menu
          class="sub_meuns_wapper"
          mode="vertical"
          unique-opened
          :default-active="$route.path"
          text-color="#fff"
          active-text-color="#42b983"
        >
          <!-- 菜单组件 -->
          <div class="logo">
            <h2>AiMaR</h2>
            <p>机务维修决策辅助推荐系统</p>
          </div>
          <!--路由组件-->
          <side-Meuns :routes="getRoutes"></side-Meuns>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-container class="app_content">
        <el-header height="70px" style="text-align: right; position: relative">
          <h4>{{ title }}</h4>
          <router-link to="/main">
            <i class="icon iconfont icon-setting-fill"></i>
          </router-link>
          <el-badge :value="total" class="item">
            <i class="icon iconfont icon-lingdang"></i>
          </el-badge>
          <el-badge :value="total2" class="item">
            <i class="icon iconfont icon-email"></i>
          </el-badge>
          <el-badge :value="total3" class="item">
            <i class="icon iconfont icon-warning"></i>
          </el-badge>
          <el-dropdown>
            <span
              class="el-dropdown-link"
              style="color: #858796; font-weight: 800"
            >
              <img
                src="../assets/logo.png"
                style="width: 40px; border-radius: 50%"
              />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><i class="el-icon-user-solid"></i>个人中心</el-dropdown-item
              >
              <el-dropdown-item
                ><i class="el-icon-s-tools"></i>设置</el-dropdown-item
              >
              <el-dropdown-item style="border-bottom: 1px solid #e3e6f0"
                ><i class="el-icon-s-operation"></i>活动日志</el-dropdown-item
              >
              <el-dropdown-item @click.native="outSystem"
                ><i class="el-icon-s-unfold"></i>登出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-popconfirm title="确定退出登录吗？" @confirm="outSystem" >
            <el-button slot="reference" type="primary" size="mini">退出</el-button>
          </el-popconfirm> -->
        </el-header>
        <!-- 内容区域 -->
        <el-main>
          <!-- 二级路由跳转 -->
          <router-view />
        </el-main>
        <el-footer id="footer" height="100px">
          <p>
            Aircraft Maintenance Recommender System · AiMaR ·
            机务维修决策辅助推荐系统 · V.7.0.1 · DEMO
          </p>
          <p>
            Artifactor Technology © Copyright Reserved. | 2019 - 2021 |
            智因科技（深圳）有限公司 © 版权所有
          </p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// 左侧菜单组件
import sideMeuns from "@/components/sideMeuns";
import { permissionRouter } from "@/router";
export default {
  computed: {
    getRoutes() {
      return global.antRouter;
    },
  },
  components: {
    sideMeuns,
  },
  data() {
    return {
      userRole: "Topest",
      isCollapse: false,
      total: 3,
      total2: 3,
      total3: 3,
      search: "",
      title: "",
    };
  },
  created() {
    this.title = this.$route.meta.title;
  },
  updated() {
    this.title = this.$route.meta.title;
  },
  methods: {
    outSystem() {
      //退出系统
      this.$confirm("是否退出登录？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.setItem("userRole", "unload");
          this.$router.push("/");
        })
        .catch(() => {
          console.log("没有退出登录状态！！！");
        });

      // window.location.href = window.location.origin + window.location.pathname
    },
    onReload() {
      this.$router.push("/main");
    },
  },
  mounted() {
    // console.log("菜单的展开跟路由有关系，查看elementui--el-menu  的default-active 属性")
    // console.log(this.$route.path)
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.input-with-select {
  width: 400px;
  position: absolute;
  left: 20px;
  top: 15px;
}
.input-with-select .el-button {
  background: rgb(3, 59, 102);
}
.input-with-select /deep/ .el-input-group__append,
.input-with-select /deep/.el-input-group__prepend {
  border-color: rgb(3, 59, 102) !important;
}
.input-with-select /deep/ .el-button i {
  color: white !important;
  font-size: 16px;
}
.el-dropdown {
  padding-left: 20px;
  border-left: 1px solid #e3e6f0;
  margin-left: 10px;
  margin-top: 15px;
  cursor: pointer;
}
.el-dropdown span {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white !important;
}
.el-header::after {
  clear: both;
  display: block;
  overflow: visible;
  content: "";
}
/*wapper*/
.app_wapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.app_content {
  margin-left: 230px;
  /* border: 1px solid #eee; */
  box-sizing: border-box;
}

.item {
  font-size: 18px;
  color: white;
  margin: 0 15px;
  height: 50px;
  line-height: 30px;
  cursor: pointer;
}
.item p {
  margin: 0;
  font-size: 14px;
}

.app_wapper .el-aside,
.slider_container .el-menu {
  color: #333;
  transition: width 0.28s;
  width: 230px !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  background: #012a4a;
  overflow-y: auto;
}
.sub_meuns_wapper /deep/ .el-menu-item {
  color: rgba(255, 255, 255, 0.8) !important;
  margin-bottom: 1px;
}
.sub_meuns_wapper /deep/ .router-link-active .is-active,
.sub_meuns_wapper /deep/ .el-menu-item:focus,
.sub_meuns_wapper /deep/ .el-menu-item:hover,
.sub_meuns_wapper /deep/ .el-submenu__title:focus,
.sub_meuns_wapper /deep/ .el-submenu__title:hover,
.sub_meuns_wapper /deep/ .el-submenu__title:focus i,
.sub_meuns_wapper /deep/ .el-submenu__title:hover i {
  background: #409eff !important;
  color: white !important;
}
.sub_meuns_wapper /deep/ .el-menu-item:focus i,
.sub_meuns_wapper /deep/ .el-menu-item:hover i {
  color: white;
}
</style>
