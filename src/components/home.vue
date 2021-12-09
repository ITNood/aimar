<template>
  <div>
    <el-row :gutter="40">
      <el-col
        :span="12"
        class="border-right border-bottom"
        style="padding-bottom: 20px"
      >
        <div class="queryCenter border">
          <h2>查询中心</h2>
          <div class="queryList">
            <router-link to="/main">
              <i class="icon iconfont icon-search"></i>
              <div class="queryText">
                <h3>历史维修记录查询</h3>
                <p title="DE 单号 | 故障代码 | 故障描述 | 关键词 | 综合筛选">
                  DE 单号 | 故障代码 | 故障描述 | 关键词 | 综合筛选
                </p>
              </div>
            </router-link>
            <router-link to="/main">
              <i class="icon iconfont icon-genghuanx"></i>
              <div class="queryText">
                <h3>部件更换记录查询</h3>
                <p title="CC / MR / DE 单号 | PN-SN 检索 | 部件流转追溯">
                  CC / MR / DE 单号 | PN-SN 检索 | 部件流转追溯
                </p>
              </div>
            </router-link>
            <router-link to="/main">
              <i class="icon iconfont icon-shouce"></i>
              <div class="queryText">
                <h3>维修手册依据查询</h3>
                <p title="ATA 章节 | MEL 章节 | 关联 DE 号 | AI 自动查询">
                  ATA 章节 | MEL 章节 | 关联 DE 号 | AI 自动查询
                </p>
              </div>
            </router-link>
            <router-link to="/main">
              <i class="icon iconfont icon-shoucang"></i>
              <div class="queryText">
                <h3>收藏历史记录查询</h3>
                <p title="收藏记录 | 历史查询 / 推荐记录 | AI 自动筛选查询">
                  收藏记录 | 历史查询 / 推荐记录 | AI 自动筛选查询
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="border-bottom" style="padding-bottom: 20px">
        <div class="queryCenter border">
          <h2>推荐中心</h2>
          <div class="queryList small">
            <router-link to="/main">
              <i class="icon iconfont icon-paigufangan"></i>
              <div class="queryText">
                <h3>故障排除方案推荐</h3>
                <p title="相关维修记录推荐 | 多步骤方案推荐 | 排故依据推荐">
                  相关维修记录推荐 | 多步骤方案推荐 | 排故依据推荐
                </p>
              </div>
            </router-link>
            <router-link to="/main">
              <i class="icon iconfont icon-cc"></i>
              <div class="queryText">
                <h3>部件更换方案推荐</h3>
                <p title="衰减警告 | 更换方案推荐 | 可替换件推荐 | 领料推荐">
                  衰减警告 | 更换方案推荐 | 可替换件推荐 | 领料推荐
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </el-col>

      <el-col :span="12" class="border-bottom" style="padding-bottom: 20px">
        <div class="queryCenter border mt20">
          <h2>推荐中心</h2>
          <div class="queryList small">
            <router-link to="/main">
              <i class="icon iconfont icon-weixiu"></i>
              <div class="queryText">
                <h3>维修方案整合下载</h3>
                <p title="飞机信息 | 故障描述 | 排故方案 | 排故依据相关文档">
                  飞机信息 | 故障描述 | 排故方案 | 排故依据相关文档
                </p>
              </div>
            </router-link>
            <router-link to="/main">
              <i class="icon iconfont icon-lingliao"></i>
              <div class="queryText">
                <h3>领料方案整合下载</h3>
                <p title="更换部件信息 | 部件更换方案 | 领料方案确认与修改">
                  更换部件信息 | 部件更换方案 | 领料方案确认与修改
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
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