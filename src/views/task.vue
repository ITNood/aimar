<template>
  <div>
    <el-row :gutter="40">
      <el-col :md="16" :lg="18" :xl="20" class="border-right">
        <el-row :gutter="40">
          <el-col :span="12" class="border-right border-bottom" style="padding-bottom: 20px">
            <monitor />
          </el-col>
          <el-col :span="12" class="border-bottom" style="padding-bottom: 20px">
            <notsolve />
          </el-col>
        </el-row>
        <task class="mt20 border-bottom" style="padding-bottom: 20px" />
        <echarts class="mt20" />
      </el-col>
      <el-col :md="8" :lg="6" :xl="4">
        <task-news />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import monitor from "../components/monitor.vue";
import Notsolve from "../components/notsolve.vue";
import Task from "../components/task.vue";
import echarts from "../components/echarts.vue";
import TaskNews from "../components/taskNews.vue";
export default {
  components: { monitor, Notsolve, Task, echarts, TaskNews },
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