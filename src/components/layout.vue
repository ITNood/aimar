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
        <el-header>
          <div class="header" style="text-align: right; position: relative">
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
          </div>

          <div class="tagtitle">
            <div class="tabs clear">
              <el-tag
                v-for="tag in getrouterList"
                :key="tag.path"
                :closable="tag.clearclose"
                @close="handleCloseTag(tag)"
                @click="tabs(tag.path)"
                :class="tag.current == true ? 'current' : ''"
              >
                {{ tag.title }}
              </el-tag>
            </div>
          </div>
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
import { mapActions, mapGetters } from "vuex";
export default {
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
      tags: [],
    };
  },
  created() {
    this.title = this.$route.meta.title;
  },
  watch: {
    //路由变化,设置标签
    $route(newValue, oldValue) {
      this.setTags(newValue);

      this.title = newValue.meta.title;
      if (
        newValue.fullPath !== "/searchResult" &&
        newValue.fullPath !== "/integrated" &&
        newValue.fullPath !== "/failureScheme"
      ) {
        localStorage.removeItem("listData");
      }
    },
  },
  mounted() {
    this.setTags(this.$route);
  },
  computed: {
    ...mapGetters(["getrouterList"]),
    getRoutes() {
      return global.antRouter;
    },
  },
  methods: {
    ...mapActions(["addRouter", "deleteRouter"]),
    tabs(path) {
      this.$router.push(path);
    },

    handleCloseTag(tag) {
      //关闭标签
      if (this.getrouterList.length > 0) {
        const index = this.getrouterList.findIndex(
          (item) => item.title === tag.title
        );
        if (index === -1) {
          this.$router.push({ title: "总控制台" });
        } else if (this.$route.path === tag.path) {
          if (index === this.getrouterList.length - 1) {
            // 最后一个 往前一个挪
            this.$router.push(this.getrouterList[index - 1].path);
          } else {
            // 往后面挪
            this.$router.push(this.getrouterList[index + 1].path);
          }
        }
      } else {
        this.$router.push({ title: "总控制台" });
      }
      this.deleteRouter(tag.title);
    },
    setTags(route) {
      const isExsit = this.tags.some((item) => {
        return item.path === route.fullPath;
      });
      if (isExsit == false) {
        this.addRouter({
          title: route.meta.title, //标签名
          path: route.fullPath, //路由
          current: false,
          clearclose: !(route.meta.title == "总控制台"),
        });
      }
      //tag标签对应当前路由背景色
      this.getrouterList.map((item) => {
        if (item.path === route.fullPath) {
          item.current = true;
        } else {
          item.current = false;
        }
      });
    },
    //退出系统
    outSystem() {
      this.$confirm("是否退出登录？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("Token");
          this.$router.push("/");
        })
        .catch(() => {
          console.log("没有退出登录状态！！！");
        });
    },
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
