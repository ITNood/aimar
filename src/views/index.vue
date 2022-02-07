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
            <notsolve :items="lists" @openData="openData" />
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
    <task-card ref="task" @opendialog="opendialog" :cardDe="cardDe" :acid="acid" :ataChater="ataChater" :date="cardDate" :station="station" :describe="describe" :plans="plancard" :programmes="programmes" :statusPlan="statusPlan" :repairData="repairData" :data="data" />
    <de-details :de="de" :date="date" :open="open" :close="closed" :terminal="terminal" :number="number" :model="model" :fault="faults" :plan="plan" :programme="programme" @closedDialog="closedDialog" ref="child" />
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
import monitorjs from "../main_monitor_data";
import api from "../API/index";
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
      items: [],
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
      lists: [],
      cardDe: "",
      acid: "",
      ataChater: "",
      date: "",
      station: "",
      describe: "",
      plans: "",
      programmes: "",
      statusPlan: [],
      repairData: [],
      data: [],
      plancard: "",
      cardDate: "",
      deArray: [],
      newArray: [],
    };
  },
  created() {
    this.getdata();
  },
  mounted() {},
  methods: {
    getdata() {
      this.items = monitorjs.map((item) => {
        return { name: item.name, date: item.date };
      });
      this.$nextTick(() => {
        this.lists = this.items;
      });
    },
    openData(name) {
      this.$refs.task.close();
      const data = monitorjs.filter((item) => {
        if (item.name == name) {
          return item;
        }
      });
      this.cardDe = data[0].data.LastRecord;
      this.acid = data[0].name;
      this.statusPlan = data[0].data.ACStatusPlan;
      this.deArray = data[0].data.FaultRelatedRecord;
      api
        .get(`/DeRecord/by/id/${this.cardDe}`)
        .then((res) => {
          this.cardDate = res.data.dateAction;
          this.station = res.data.station;
          this.describe = res.data.description;
          this.plans = res.data.plannedAction;
          this.programmes = res.data.action;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
      this.deArray.map((item) => {
        api
          .get(`/DeRecord/by/id/${item}`)
          .then((res) => {
            this.newArray.push(res.data);
            const arr = Object.assign(res.data, { de: item });
            this.newArray.push(arr);
            this.newArray = this.unique(this.newArray, "de");
            this.repairData = this.newArray;
            this.data = this.newArray;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {});
      });
    },
    unique(arr, key) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.key) && res.set(arr.key, 1));
    },
    opendialog(row) {
      this.closedDialog();
      this.de = row.de;
      this.date = row.dateAction;
      this.open = row.ataOpen;
      this.closed = row.ataClose;
      this.terminal = row.station;
      this.number = row.acId;
      this.model = row.acType;
      this.faults = row.description;
      this.plan = row.plannedAction;
      this.programme = row.action;
    },
    closedDialog() {
      this.$refs.child.closeDialog();
    },
  },
};
</script>

<style  scoped>
</style>