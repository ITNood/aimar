<template>
  <div>
    <el-row class="scheme">
      <el-col :md="5" :lg="5" :xl="3">
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
      <el-col :md="19" :lg="19" :xl="21">
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
              <el-col :span="16">
                <div class="programmeDetails">
                  <div class="schemeNews">
                    <h2>B-1234 （A-320） @ SZX @ YYYY-MM-DD HH:MM</h2>
                    <p>方案 # XXXXXXXX【综合排故概率： XX %】</p>
                  </div>
                  <div class="counter">
                    针对 XXXX 出现 XXXX；XXXXXXXX 故障：
                  </div>
                  <div class="suggestionList">
                    <el-row style="width: 100%">
                      <el-col
                        v-for="(item, index) in tablelist"
                        :key="index"
                        :offset="index"
                        :span="24 - index"
                        class="contentBorder"
                      >
                        <i v-if="tablelist.length > 1 && index !== 0"
                          >若故障仍未排除：</i
                        >
                        <el-row :gutter="20">
                          <el-col :span="8">
                            <div class="listleft">
                              <p>
                                依据 <span @click="basis">{{ item.name }}</span
                                >；
                              </p>
                              <p>执行 {{ item.operation }} 操作；</p>
                              <p>【故障排除概率： {{ item.percent }} %】</p>
                              <p>
                                （参照 DE #<span
                                  v-for="de in item.de"
                                  :key="de"
                                  class="text-decoration"
                                  @click="openDe(de)"
                                  >{{ de }}; </span
                                >）
                              </p>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="listleft special">
                              <p>
                                <i
                                  :class="
                                    item.color1 == 0
                                      ? 'classA'
                                      : item.color1 == 1
                                      ? 'classB'
                                      : 'classC'
                                  "
                                ></i>
                                维修 Kit #
                                <span @click="openTable(tool)"
                                  >XXXXXXXX (1)</span
                                >
                                ：
                              </p>
                              <p>
                                <i
                                  :class="
                                    item.color2 == 0
                                      ? 'classA'
                                      : item.color2 == 1
                                      ? 'classB'
                                      : 'classC'
                                  "
                                ></i>
                                工具：<span
                                  v-for="tool in item.tools"
                                  :key="tool"
                                  @click="openTable(tool)"
                                  >{{ tool }};
                                </span>
                              </p>
                              <p>
                                <i
                                  :class="
                                    item.color3 == 0
                                      ? 'classA'
                                      : item.color3 == 1
                                      ? 'classB'
                                      : 'classC'
                                  "
                                ></i>
                                主件：<span
                                  v-for="part in item.parts"
                                  :key="part"
                                  @click="openTable(part)"
                                  >{{ part }};
                                </span>
                              </p>
                              <p>
                                <i
                                  :class="
                                    item.color4 == 0
                                      ? 'classA'
                                      : item.color4 == 1
                                      ? 'classB'
                                      : 'classC'
                                  "
                                ></i>
                                辅件:<span
                                  v-for="acce in item.acces"
                                  :key="acce"
                                  @click="openTable(acce)"
                                  >{{ acce }};
                                </span>
                              </p>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="listright">
                              <p>施工条件：</p>
                              <p>{{ item.construction }}</p>
                              <p>预计工时：</p>
                              <p>{{ item.date }}</p>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="btncenter">
                    <el-button class="el-icon-download" @click="confirm">
                      &nbsp;&nbsp;预览/下载
                    </el-button>
                    <el-button class="el-icon-edit">
                      &nbsp;&nbsp;修改
                    </el-button>
                    <el-button class="el-icon-delete">
                      &nbsp;&nbsp;弃用
                    </el-button>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
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
    <opentable :data="tables" :title="title" ref="tables" @click="cloetable" />
    <basis
      :headName="headName"
      :type="type"
      :updateDate="updateDate"
      :manual="manual"
      :chapter="chapter"
      :keyword="keyword"
      :part="part"
      :page="page"
      :section="section"
      :notestext="notestext"
      :data="data"
      ref="basisChild"
      @click="openbasis"
    />
  </div>
</template>

<script>
import solution from "../solutiongraph";
import * as echarts from "echarts";
import api from "../API/index";
import deDetails from "../components/deDetails.vue";
import Opentable from "../components/opentable.vue";
import Basis from "../components/basis.vue";
export default {
  components: { deDetails, Opentable, Basis },
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
      tablelist: [
        {
          name: "sdfasffasd",
          operation: "dadsfjioasjfi ",
          percent: "99.8",
          de: ["1263912", "1184930"],
          construction: "dkaodhfiaodhfiopshdfpiosahdfsupah ",
          date: "32h",
          tools: ["dad", "dadds", "wew"],
          parts: ["fgg", "ddgg", "ffddff"],
          acces: ["hh", "fht", "jjt"],
          color1: 0,
          color2: 2,
          color3: 1,
          color4: 1,
        },
        {
          name: "sdfasffasd",
          operation: "dadsfjioasjfi ",
          percent: "99.8",
          de: ["1263912", "1184930"],
          construction: "dkaodhfiaodhfiopshdfpiosahdfsupah ",
          date: "32h",
          tools: ["dad", "dadds", "wew"],
          parts: ["fgg", "ddgg", "ffddff"],
          acces: ["hh", "fht", "jjt"],
          color1: 0,
          color2: 2,
          color3: 1,
          color4: 1,
        },
        {
          name: "sdfasffasd",
          operation: "dadsfjioasjfi ",
          percent: "99.8",
          de: ["1263912", "1184930"],
          construction: "dkaodhfiaodhfiopshdfpiosahdfsupah ",
          date: "32h",
          tools: ["dad", "dadds", "wew"],
          parts: ["fgg", "ddgg", "ffddff"],
          acces: ["hh", "fht", "jjt"],
          color1: 0,
          color2: 2,
          color3: 1,
          color4: 1,
        },
        {
          name: "sdfasffasd",
          operation: "dadsfjioasjfi ",
          percent: "99.8",
          de: ["1263912", "1184930"],
          construction: "dkaodhfiaodhfiopshdfpiosahdfsupah ",
          date: "32h",
          tools: ["dad", "dadds", "wew"],
          parts: ["fgg", "ddgg", "ffddff"],
          acces: ["hh", "fht", "jjt"],
          color1: 0,
          color2: 2,
          color3: 1,
          color4: 1,
        },
      ],
      tables: [
        {
          type: "工具",
          name: "和第哦啊和",
          pieceNumber: "65969",
          number: 4654,
          stock: 64564,
          otherStock: "daskdhoioh ",
        },
      ],
      title: "名称",
      headName: "xxx",
      type: "737",
      updateDate: "2021-12-12",
      manual: "SDSDA",
      chapter: "34-45",
      keyword: "dafa;dadfads;faddfas;",
      part: "dafasf",
      page: "AAA",
      section: "DDD",
      notestext: "SDADAJKSDOJFOSAFOAHSFOISHAFOSFHSAIFOHSDFOIDSHFODISAFHIOA",
      data: [
        { picture_image: require("../static/pdf/3445_1.png") },
        { picture_image: require("../static/pdf/3445_2.png") },
        { picture_image: require("../static/pdf/3445_3.png") },
        { picture_image: require("../static/pdf/3445_4.png") },
        { picture_image: require("../static/pdf/3445_5.png") },
      ],
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
    //依据
    basis(name) {
      this.openbasis();
    },
    openbasis() {
      this.$refs.basisChild.closeBasis();
    },
    cloetable() {
      this.$refs.tables.closetable();
    },
    openTable(name) {
      this.cloetable();
    },
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
      // let val = this.radio;
      // if (this.arrs.filter((item) => item.key === val).length > 0) {
      //   // 弹提示已添加
      //   this.$message.warning("该方案已添加!!!");
      // } else {
      //   this.arrs.push({
      //     ...this.result[val],
      //     key: val,
      //   });
      // }
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