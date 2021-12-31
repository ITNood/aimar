<template>
  <div>
    <el-row :gutter="40">
      <el-col :md="24" :lg="15" :xl="16" class="border-right">
        <Home />
        <echarts />
      </el-col>
      <el-col :md="24" :lg="9" :xl="8">
        <el-row :gutter="40" class="border-bottom">
          <!--监控中-->
          <el-col :span="12" class="border-right" style="padding-bottom: 20px">
            <monitor :items="items" @openData="openData" />
          </el-col>
          <!--为解决-->
          <el-col :span="12">
            <notsolve :items="items" @openData="openData" />
          </el-col>
        </el-row>

        <el-row :gutter="40" class="mt20">
          <!--已分配任务-->
          <!-- <el-col :span="24" class="border-bottom" style="padding-bottom: 20px">
            <task />
          </el-col> -->
          <!--甘特图-->
          <el-col :span="24">
            <!--消息中心-->
            <new-center />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <task-card ref="task" @opendialog="opendialog" />
    <de-details
      :de="de"
      :date="date"
      :open="open"
      :close="closed"
      :terminal="terminal"
      :number="number"
      :model="model"
      :fault="faults"
      :plan="plan"
      :programme="programme"
      @closedDialog="closedDialog"
      ref="child"
    />
  </div>
</template>

<script>
import Home from "../components/home.vue";
import NewCenter from "../components/newCenter.vue";
import monitor from "../components/monitor.vue";
import Notsolve from "../components/notsolve.vue";
import Task from "../components/task.vue";
import Echarts from "../components/echarts.vue";
import TaskCard from "../components/taskCard.vue";
import DeDetails from "../components/deDetails.vue";

export default {
  components: {
    Home,
    NewCenter,
    monitor,
    Notsolve,
    Task,
    Echarts,
    TaskCard,
    DeDetails,
  },
  data() {
    return {
      items: [
        { de: "B-xxx", ataChater: "21-2151" },
        { de: "B-xxx ", ataChater: "21-2151" },
        { de: "B-xxx ", ataChater: "21-2151" },
        { de: "B-xxx ", ataChater: "21-2151" },
      ],
      //de详情
      de: "",
      date: "",
      open: 0,
      closed: 0,
      terminal: "",
      number: "",
      model: "",
      faults: "",
      plan: "",
      programme: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    openData(de) {
      console.log(de);
      this.$refs.task.close();
    },
    opendialog(row) {
      console.log(row);
      this.closedDialog();
    },
    closedDialog() {
      this.$refs.child.closeDialog();
    },
  },
};
</script>

<style  scoped>
</style>