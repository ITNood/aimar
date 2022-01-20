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
                方案 #{{ index + 1 }}({{ todo.solutionProbability }})
              </el-radio-button>
            </el-radio-group>
            <el-row class="border">
              <el-col :span="16" v-if="isData"
                ><el-empty description="暂无数据"></el-empty
              ></el-col>
              <el-col :span="16" v-else>
                <div
                  class="programmeDetails"
                  v-for="(obj, i) in objects"
                  :key="i"
                >
                  <div class="schemeNews">
                    <el-button
                      class="el-icon-download downloadPdf"
                      @click="confirm"
                    >
                      &nbsp;&nbsp;预览/下载
                    </el-button>
                    <h2>B-1234 （A-320） @ SZX @ YYYY-MM-DD HH:MM</h2>
                    <p>
                      方案 # {{ tabnumber }}【综合排故概率：
                      {{ obj.solutionProbability }}】
                    </p>
                  </div>
                  <div class="counter">
                    针对 {{ obj.target }} 出现 {{ obj.fault }} 故障：
                  </div>
                  <div class="suggestionList">
                    <el-row style="width: 100%">
                      <el-col
                        v-for="(item, index) in obj.solutions"
                        :key="index"
                        :offset="index"
                        :span="24 - index"
                        class="contentBorder"
                      >
                        <i v-if="obj.solutions.length > 1 && index !== 0"
                          >若故障仍未排除：</i
                        >
                        <el-row :gutter="20">
                          <el-col :span="8">
                            <div class="listleft">
                              <p>
                                依据
                                <span @click="basis">{{
                                  item.reference.join()
                                }}</span
                                >；
                              </p>
                              <p>
                                执行
                                <span class="orange">{{ item.action }}</span>
                                操作；
                              </p>
                              <p>【故障排除概率： {{ item.probability }} %】</p>
                              <p>
                                （参照 DE #<span
                                  v-for="de in obj.solutions[index].de"
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
                                <span @click="openTable(item.name)">{{
                                  item.name
                                }}</span>
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
                                  v-for="(tool, index) in item.toolPnList"
                                  :key="index"
                                  @click="openTable(tool)"
                                  >{{ tool }};
                                </span>
                                <span
                                  v-if="obj.solutions[index].istool == true"
                                  @click="moreTool(index)"
                                  >...</span
                                >
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
                                  v-for="(part, index) in item.mainPnList"
                                  :key="index"
                                  @click="openTable(part)"
                                  >{{ part }};
                                </span>
                                <span
                                  v-if="obj.solutions[index].ismain == true"
                                  @click="moreMain(index)"
                                  >...</span
                                >
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
                                辅件：<span
                                  v-for="(acce, index) in item.supportPnList"
                                  :key="index"
                                  @click="openTable(acce)"
                                  >{{ acce }};
                                </span>
                                <span
                                  v-if="obj.solutions[index].issupport == true"
                                  @click="moreSupport(index)"
                                  >...</span
                                >
                              </p>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="listright">
                              <p>施工条件：</p>
                              <p>{{ item.buildCondition }}</p>
                              <p>预计工时：</p>
                              <p>{{ item.estimateDuration }}</p>
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
    <pdf ref="pdfs" :img="img" />
  </div>
</template>

<script>
import solution from "../solutiongraph";
import * as echarts from "echarts";
import api from "../API/index";
import deDetails from "../components/deDetails.vue";
import Opentable from "../components/opentable.vue";
import Basis from "../components/basis.vue";
import pdf from "../components/previewPf.vue";
export default {
  components: { deDetails, Opentable, Basis, pdf },
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
      newdata: [],
      objects: [],
      tabnumber: 0,

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
      title: "",
      headName: "",
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
      img: [
        { img: require("../static/pdf/3445_1.png") },
        { img: require("../static/pdf/3445_2.png") },
        { img: require("../static/pdf/3445_3.png") },
        { img: require("../static/pdf/3445_4.png") },
        { img: require("../static/pdf/3445_5.png") },
      ],
      isData: false,
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
    this.$nextTick(() => {
      this.getEcharts(nodes, name, links, categories);
    });

    this.tabnumber = 1;
  },
  methods: {
    //更多工具
    moreTool(index) {
      this.cloetable();
      const data =
        this.result[this.tabnumber - 1].solutions[index].toolPnList.slice(2);
      this.title = data.join();
      console.log(data);
      data.map((item) => {
        console.log(item);
        // api
        //   .post(item)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   })
        //   .finally(() => {});
      });
    },

    //更多主件
    moreMain(index) {
      this.cloetable();
      const data =
        this.result[this.tabnumber - 1].solutions[index].mainPnList.slice(2);
      this.title = data.join();
      console.log(data);
      data.map((item) => {
        console.log(item);
        // api
        //   .post(item)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   })
        //   .finally(() => {});
      });
    },
    //更多附件
    moreSupport(index) {
      this.cloetable();
      const data =
        this.result[this.tabnumber - 1].solutions[index].supportPnList.slice(2);
      this.title = data.join();
      console.log(data);
      data.map((item) => {
        console.log(item);
        // api
        //   .post(item)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   })
        //   .finally(() => {});
      });
    },

    //依据
    basis(name) {
      this.openbasis();
      this.headName = name.target.innerText;
    },
    openbasis() {
      this.$refs.basisChild.closeBasis();
    },
    cloetable() {
      this.$refs.tables.closetable();
    },
    openTable(name) {
      console.log(name);
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
          if (res.data && res.data.length > 0) {
            this.isData = false;
            this.result = res.data;
            const data = [...res.data].map((item) => {
              return {
                ...item,
                solutions: [...item.solutions].map((e) => {
                  return {
                    ...e,
                    ismain: e.mainPnList.length > 2 ? true : false,
                    issupport: e.supportPnList.length > 2 ? true : false,
                    istool: e.toolPnList.length > 2 ? true : false,
                    mainPnList: [...e.mainPnList].slice(0, 2),
                    supportPnList: [...e.supportPnList].slice(0, 2),
                    toolPnList: [...e.toolPnList].slice(0, 2),
                  };
                }),
              };
            });
            this.objects = data;
            this.newdata = data;
          } else {
            this.isData = false;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
    //选择方案
    changeRadio(val) {
      this.tabnumber = val + 1;
      this.objects = this.newdata.filter((item, index) => val == index);
    },

    //预览下载
    confirm() {
      this.$refs.pdfs.preview();
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
            this.de = item.toString();
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