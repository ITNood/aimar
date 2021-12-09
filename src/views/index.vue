<template>
  <div>
    <el-row :gutter="40">
      <el-col :md="24" :lg="15" :xl="16" class="border-right">
        <Home />
        <!--消息中心-->
        <new-center />
      </el-col>
      <el-col :md="24" :lg="9" :xl="8">
        <el-row :gutter="40" class="border-bottom">
          <!--监控中-->
          <el-col :span="12" class="border-right" style="padding-bottom: 20px">
            <monitor />
          </el-col>
          <!--为解决-->
          <el-col :span="12">
            <notsolve />
          </el-col>
        </el-row>

        <el-row :gutter="40" class="mt20">
          <!--已分配任务-->
          <el-col :span="24" class="border-bottom" style="padding-bottom: 20px">
            <task />
          </el-col>
          <!--甘特图-->
          <el-col :span="24" class="mt20">
            <echarts />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Home from "../components/home.vue";
import NewCenter from "../components/newCenter.vue";
import monitor from "../components/monitor.vue";
import Notsolve from "../components/notsolve.vue";
import Task from "../components/task.vue";
import Echarts from "../components/echarts.vue";

export default {
  components: { Home, NewCenter, monitor, Notsolve, Task, Echarts },
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