<template>
  <div class="repair">
    <el-row :gutter="20">
      <el-col :span="4" :offset="2">
        <div class="choselist">
          <router-link to="/integrated">
            <h2>综合筛选</h2>
            <h2>查询模式</h2>
            <div class="text">
              <p>故障描述 | 关键词组</p>
              <p>故障代码 | 模糊匹配</p>
              <p>指定飞机 | 指定机型</p>
              <p>章节范围 | 日期范围</p>
            </div>
            <el-button class="selectBtn">选择</el-button>
          </router-link>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="choselist">
          <router-link to="/faultDescription">
            <h2>故障描述</h2>
            <h2>查询模式</h2>
            <div class="text">
              <p>故障描述手动输入</p>
              <p>关键词组自动提取</p>
              <p>关键词组手动选取</p>
              <p>历史记录自动匹配</p>
            </div>
            <el-button class="selectBtn">选择</el-button>
          </router-link>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="choselist">
          <router-link to="/keyword">
            <h2>关键词组</h2>
            <h2>查询模式</h2>
            <div class="text">
              <p>关键词组手动输入</p>
              <p>同近义词自动匹配</p>
              <p>关联词组手动选取</p>
              <p>历史记录自动匹配</p>
            </div>
            <el-button class="selectBtn">选择</el-button>
          </router-link>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="choselist">
          <router-link to="/faultCode">
            <h2>故障代码</h2>
            <h2>查询模式</h2>
            <div class="text">
              <p>故障代码手动输入</p>
              <p>相关代码自动匹配</p>
              <p>二级代码手动选取</p>
              <p>历史记录自动匹配</p>
            </div>
            <el-button class="selectBtn">选择</el-button>
          </router-link>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="choselist">
          <router-link to="/deOrder">
            <h2>DE 单号</h2>
            <h2>查询模式</h2>
            <div class="text">
              <p>DE 单号手动输入</p>
              <p>相关单号自动匹配</p>
              <br />
              <br />
            </div>
            <el-button class="selectBtn">选择</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <div class="choseTitle">选择查询方式</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
</style>