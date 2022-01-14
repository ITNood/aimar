<template>
  <div>
    <el-row class="scheme">
      <el-col :md="5" :lg="5" :xl="4">
        <div class="entryFault">
          <h2>已输入故障信息</h2>
          <div class="faultInformation">
            <ul>
              <li v-for="(item, index) in items" :key="index">
                <h5>{{ item.name }}</h5>
                <p v-if="item.airplaneTypes">{{ item.airplaneTypes }}</p>
                <p v-if="item.airplanes">{{ item.airplanes }}</p>
                <p v-if="item.chapters || item.sections">
                  {{ item.chapters }} 一 {{ item.sections }}
                </p>
                <p v-if="item.keyword">{{ item.keyword }}</p>
                <p v-if="item.text">{{ item.text }}</p>
                <p v-if="item.date">日期范围:{{ item.date }}</p>
                <p v-if="item.startDate">起始日期:{{ item.startDate }}</p>
                <p v-if="item.endDate">结束日期:{{ item.endDate }}</p>
                <p v-if="item.value">
                  模糊匹配:{{ item.value == true ? "开" : "关" }}
                </p>
                <p v-if="item.value1">模糊度:{{ item.value1 }}</p>
                <p v-if="item.value2">
                  同近义词:{{ item.value2 == true ? "开" : "关" }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :md="14" :lg="14" :xl="15">
        <div class="selectedsProgramme">
          <h2>选择排故方案</h2>
          <div class="programme">
            <el-radio-group
              v-model="radio"
              class="selectRadioGroup"
              @change="changeRadio"
            >
              <el-radio-button
                :label="index"
                v-for="(todo, index) in result"
                :key="index"
              >
                方案 #{{ index + 1 }}({{ todo.SolutionProbability }})
              </el-radio-button>
            </el-radio-group>
            <el-row class="border">
              <el-col :span="12">
                <div class="programmeDetails">
                  <ul>
                    <li v-if="show">
                      依据<span>{{ reference }}</span>
                    </li>
                    <li>
                      针对 <span>{{ target }}</span> 出现
                      <span>{{ fault }}</span> 故障 ；
                    </li>
                    <li>
                      <p>
                        执行<span>{{ action }}</span> 操作；
                      </p>
                      <p>
                        【故障排除概率： <span>{{ probability }} </span>】
                      </p>
                      <p>
                        （参照 DE #
                        <span
                          v-for="(item, index) in des"
                          :key="index"
                          @click="openDe(item)"
                          class="text-decoration"
                        >
                          {{ item }};
                        </span>
                        ）
                      </p>
                      <div
                        class="other"
                        v-for="(item, index) in lists"
                        :key="index"
                      >
                        <h5>-若故障仍未解除：</h5>
                        <p>
                          执行 <span>{{ item.Action }}</span> 操作；
                        </p>
                        <p>
                          依据 <span>{{ item.Reference }}</span>
                        </p>
                        <p>
                          【故障排除概率：<span> {{ item.Probability }} </span
                          >】
                        </p>
                        <p>
                          （参照 DE #
                          <span
                            v-for="(list, index) in item.DE"
                            :key="index"
                            @click="openDe(list)"
                            class="text-decoration"
                          >
                            {{ list }}; </span
                          >）
                        </p>
                      </div>

                      <div class="other" v-if="SolutionMEL">
                        <h5>-若故障仍未解除：</h5>
                        <p>
                          依据 <span>{{ option1 }}</span> ；
                        </p>
                        <p>
                          执行 <span>{{ option2 }}</span
                          >；
                        </p>
                        <p>
                          （参照 DE #
                          <span
                            v-for="(de, index) in melDe"
                            :key="index"
                            @click="openDe(de)"
                            class="text-decoration"
                            >{{ de }}</span
                          >）
                        </p>
                      </div>
                    </li>
                    <li>
                      【综合排故概率： <span>{{ solutionProbability }}</span
                      >】
                    </li>
                    <div class="btncenter">
                      <el-button class="el-icon-check" @click="confirm">
                        &nbsp;&nbsp;确认
                      </el-button>
                      <el-button class="el-icon-edit">
                        &nbsp;&nbsp;修改
                      </el-button>
                      <el-button class="el-icon-delete">
                        &nbsp;&nbsp;弃用
                      </el-button>
                    </div>
                  </ul>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="proprammeRight">
                  <div class="programmeImg">
                    <h3>推荐推理逻辑可视化展示 <span>beta</span></h3>
                    <!-- <img src="../static/image/img.png" /> -->
                    <div class="echarts">
                      <div id="main"></div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :md="5" :lg="5" :xl="5">
        <div class="selecteds">
          <h2>已选择排故方案</h2>
          <div class="programmeDetails" style="border-right: none">
            <div v-for="(val, index) in arrs" :key="index">
              <h1 class="clear">
                方案 # {{ val.key + 1 }}
                <i class="el-icon-close" @click="close(index)"></i
                ><i class="el-icon-edit"></i>
              </h1>
              <ul>
                <li>
                  针对 <span>{{ val.SolutionHeader.Reference }}</span> 出现
                  <span>{{ val.SolutionHeader.Target }}</span> 故障 ；
                </li>
                <li>
                  <p>
                    执行 <span>{{ val.SolutionHeader.Fault }}</span> 操作，执行
                    <span>{{ val.SolutionHeader.Action }}</span> 操作；
                  </p>
                  <p>
                    【故障排除概率：
                    <span>{{ val.SolutionHeader.Probability }}</span
                    >】
                  </p>
                  <p>
                    （参照 DE #
                    <span
                      v-for="(item, index) in val.SolutionHeader.DE"
                      :key="index"
                    >
                      {{ item }};
                    </span>
                    ）
                  </p>

                  <div
                    class="other"
                    v-for="(item, index) in val.SolutionBody"
                    :key="index"
                  >
                    <h5>-若故障仍未解除：</h5>
                    <p>
                      执行 <span>{{ item.Action }}</span> 操作；
                    </p>
                    <p>
                      依据 <span>{{ item.Reference }}</span>
                    </p>
                    <p>
                      【故障排除概率：<span> {{ item.Probability }}</span
                      >】
                    </p>
                    <p>
                      （参照 DE # <span>{{ item.DE.join() }}</span
                      >）
                    </p>
                  </div>

                  <div class="other" v-if="val.SolutionMEL">
                    <h5>-若故障仍未解除：</h5>
                    <p>
                      依据 <span>{{ val.SolutionMEL.Reference }}</span> ；
                    </p>
                    <p>
                      执行 <span>{{ val.SolutionMEL.Action }}</span
                      >；
                    </p>
                    <p>
                      （参照 DE # <span>{{ val.SolutionMEL.DE.join() }}</span
                      >）
                    </p>
                  </div>
                </li>
                <li>
                  【综合排故概率： <span>{{ val.SolutionProbability }}</span
                  >】
                </li>
              </ul>
            </div>
          </div>
          <div class="mt20 submitBtn center">
            <el-button class="el-icon-delete btn empty" @click="clean">
              &nbsp;&nbsp;清空
            </el-button>
            <el-button class="el-icon-check btn submit" @click="submit">
              &nbsp;&nbsp;确认
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
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
import solution from "../solutiongraph";
import * as echarts from "echarts";
import api from "../API/index";
import deDetails from "../components/deDetails.vue";
export default {
  components: { deDetails },
  data() {
    return {
      items: [],
      radio: "0",
      reference: "",
      target: "",
      fault: "",
      action: "",
      probability: "",
      des: [],
      lists: [],
      solutionProbability: "",
      result: [],
      SolutionMEL: false,
      todos: [],
      arr: [],
      arrs: [],
      show: false,
      //DE详情
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
      chatnumber: "",
      melDe: [],
      option1: "",
      option2: "",
    };
  },
  created() {
    this.getCacheData();
    this.getdata();
  },
  mounted() {
    const number = "2151";
    const nodes = solution[number].nodes;
    const name = solution[number].categories.map((a) => {
      return a.name;
    });
    const links = solution[number].links;
    const categories = solution[number].categories;
    this.getEcharts(nodes, name, links, categories);
  },
  methods: {
    //获取缓存
    getCacheData() {
      this.items = JSON.parse(localStorage.getItem("listData"));
    },
    getdata() {
      if (this.items) {
        const data = this.items.filter((item) => {
          return item.chapters;
        });
        if (data.length > 0) {
          this.chatnumber = data[0].chapters + data[0].sections;
        }
        var airplaneTypes = this.items.filter((item) => {
          return item.airplaneTypes;
        });
        if (airplaneTypes.length > 0) {
          var ariNumber = airplaneTypes[0].airplaneTypes;
        } else {
          var ariNumber = 737;
        }
      }
      api
        .get(
          `/scheme/recommendation/by/all?acType=${ariNumber}&section=${this.chatnumber}`
        )
        .then((res) => {
          if (res.data) {
            this.result = res.data.Solutions;
            const data = res.data.Solutions[0];
            if (data.SolutionHeader.Reference) {
              this.show = true;
              this.reference = data.SolutionHeader.Reference;
            } else {
              this.show = false;
            }
            this.target = data.SolutionHeader.Target;
            this.fault = data.SolutionHeader.Fault;
            this.action = data.SolutionHeader.Action;
            this.probability = data.SolutionHeader.Probability;
            this.des = data.SolutionHeader.DE;
            this.solutionProbability = data.SolutionProbability;
            if (data.SolutionMEL) {
              this.SolutionMEL = true;
              this.option1 = data.SolutionMEL.Reference;
              this.option2 = data.SolutionMEL.Action;
              this.melDe = data.SolutionMEL.DE;
            } else {
              this.SolutionMEL = false;
            }
            this.lists = data.SolutionBody;
          }
          const number = this.chatnumber;
          if (number) {
            const nodes = solution[number].nodes;
            const name = solution[number].categories.map((a) => {
              return a.name;
            });
            const links = solution[number].links;
            const categories = solution[number].categories;
            this.getEcharts(nodes, name, links, categories);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
    //选择方案
    changeRadio(val) {
      const data = this.result[val];
      this.reference = data.SolutionHeader.Reference;
      this.target = data.SolutionHeader.Target;
      this.fault = data.SolutionHeader.Fault;
      this.action = data.SolutionHeader.Action;
      this.probability = data.SolutionHeader.Probability;
      this.de = data.SolutionHeader.DE.join();
      this.solutionProbability = data.SolutionProbability;
      if (data.SolutionMEL) {
        this.SolutionMEL = true;
        this.option1 = data.SolutionMEL.Reference;
        this.option2 = data.SolutionMEL.Action;
        this.melDe = data.SolutionMEL.DE;
      } else {
        this.SolutionMEL = false;
      }
      this.lists = data.SolutionBody;
    },

    //确认
    confirm() {
      let val = this.radio;
      if (this.arrs.filter((item) => item.key === val).length > 0) {
        // 弹提示已添加
        this.$message.warning("该方案已添加!!!");
      } else {
        this.arrs.push({
          ...this.result[val],
          key: val,
        });
      }
    },
    //关闭
    close(index) {
      const list = [...this.arrs];
      list.splice(index, 1);
      this.arrs = [...list];
    },
    //清空
    clean() {
      if (this.arrs.length > 0) {
        this.$confirm("确定要清空已选方案 ?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.arrs = [];
          })
          .catch(() => {
            this.$message.info("取消了!!!");
          });
      }
    },
    submit() {},
    openDe(item) {
      api
        .get(`/DeRecord/by/id/${item}`)
        .then((res) => {
          if (res.data) {
            this.de = item;
            this.date = res.data.dateAction;
            this.open = res.data.ataOpen;
            this.closed = res.data.ataClose;
            this.terminal = res.data.station;
            this.number = res.data.acId;
            this.model = res.data.acType;
            this.faults = res.data.description;
            this.plan = res.data.plannedAction;
            this.programme = res.data.action;
            this.closedDialog();
          } else {
            this.$message.warning("没有数据!!!");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
    closedDialog() {
      this.$refs.child.closeDialog();
    },
    getEcharts(nodes, name, links, categories) {
      let chartDom = document.getElementById("main");
      let myChart = echarts.init(chartDom);
      let option;
      myChart.showLoading();
      myChart.hideLoading();

      nodes.forEach((node) => {
        node.label = {
          show: node.symbolSize > 30,
        };
      });
      option = {
        title: {
          // text: "Les Miserables",
          // subtext: "Default layout",
          top: "bottom",
          left: "right",
        },
        tooltip: {},
        legend: [
          {
            data: name,
          },
        ],
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            // name: "Les Miserables",
            type: "graph",
            layout: "none",

            data: nodes,
            links: links,
            categories: categories,

            roam: true,
            label: {
              position: "inside",
              formatter: "{b}",
            },
            lineStyle: {
              color: "source",
              curveness: 0.3,
            },
            emphasis: {
              focus: "adjacency",
              lineStyle: {
                width: 10,
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      option && myChart.setOption(option, true);
      window.onresize = function () {
        myChart.resize();
      };
    },
  },
};
</script>

<style  scoped>
</style>