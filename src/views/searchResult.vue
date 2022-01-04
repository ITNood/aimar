<template>
  <div>
    <div class="conditionSummary">
      <div class="summaryTilte">
        <h4>筛选条件汇总</h4>
      </div>
      <el-row :gutter="40" class="conditionSummaryList">
        <el-col
          :md="8"
          :lg="6"
          :xl="4"
          v-for="(item, index) in items"
          :key="index"
        >
          <h5>
            {{ item.name }}
            <i class="el-icon-close" @click="del(index)"></i
            ><i class="el-icon-edit"></i>
          </h5>
          <p v-if="item.airplaneTypes">{{ item.airplaneTypes }}</p>
          <p v-if="item.airplanes">{{ item.airplanes }}</p>
          <p v-if="item.chapters || item.sections">
            {{ item.chapters }}一{{ item.sections }}
          </p>
          <p v-if="item.keyword">{{ item.keyword }}</p>
          <p v-if="item.text">{{ item.text }}</p>
          <p v-if="item.date">日期范围:{{ item.date }}</p>
          <p v-if="item.startDate">起始日期:{{ item.startDate }}</p>
          <p v-if="item.endDate">结束日期:{{ item.endDate }}</p>
          <p v-if="item.value || item.value1 || item.value2">
            模糊匹配:{{
              item.value == true ? "开" : "关"
            }};&nbsp;&nbsp;模糊度:{{ item.value1 }}; &nbsp;&nbsp;同近义词:{{
              item.value2 == true ? "开" : "关"
            }}
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="mt20 mb20">
      <el-button class="el-icon-refresh refreshResult" @click="refresh"
        >&nbsp;&nbsp;刷新检索结果</el-button
      >
      <el-button class="el-icon-plus addCondition" @click="addCondition"
        >&nbsp;&nbsp;添加筛选条件</el-button
      >
    </div>
    <div class="resultTable clear">
      <h4>筛选结果汇总</h4>
      <el-row :gutter="40" style="padding: 20px">
        <el-col :md="8" :lg="6" :xl="4">
          <ul class="dataList">
            <li>
              <h3>
                总条数:<span>{{ total }}</span>
              </h3>
            </li>
            <li>
              <h3>
                已选中:<span>{{ checkedNumber }}</span>
              </h3>
            </li>
            <li>
              <h3>ATA章节：</h3>
              <p>-{{ startChapter1 }}</p>
              <p v-if="show1">-{{ endChapter1 }}</p>
            </li>
            <li>
              <h3>ATA次章节：</h3>
              <p>-{{ startChapter2 }}</p>
              <p v-if="show2">-{{ endChapter2 }}</p>
              <p v-if="show3">-{{ listChapter }}</p>
            </li>
          </ul>
        </el-col>
        <el-col :md="16" :lg="18" :xl="20">
          <div class="clear">
            <el-radio-group
              v-model="radio"
              class="selectradio"
              @change="changesSort"
            >
              <el-radio label="0"> 按综合相似度排序</el-radio>
              <el-radio label="1"> 按描述相似度排序</el-radio>
              <el-radio label="2"> 按时间排序</el-radio>
            </el-radio-group>
            <!-- <el-checkbox v-model="checked" class="selectcheckbox">
              仅查看相关ATA</el-checkbox
            > -->
          </div>
          <el-table
            :data="tableData"
            border
            @selection-change="handleSelectionChange"
            :header-cell-style="{
              background: '#012A4A',
              color: '#fff',
              fontWeight: 'normal',
            }"
            max-height="500"
            class="mt20 table"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="de" label="DE号"></el-table-column>
            <el-table-column prop="ataOpen" label="开单ATA"></el-table-column>
            <el-table-column prop="ataClose" label="关单ATA"></el-table-column>
            <el-table-column prop="dateAction" label="日期"></el-table-column>
            <el-table-column prop="description" label="故障描述">
              <template slot-scope="scope">
                <div v-html="scope.row.description"></div>
              </template>
            </el-table-column>
            <el-table-column prop="plannedAction" label="计划措施">
              <template slot-scope="scope">
                <div>{{ scope.row.plannedAction }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="action" label="排故措施">
              <template slot-scope="scope">
                <div v-html="scope.row.action"></div>
              </template>
            </el-table-column>
            <el-table-column label="查看 DE 详情">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="lookDe(scope.row)"
                  class="btnfont"
                  >查看DE</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="查看相关 CC 单">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="lookDe(scope.row)"
                  class="btnfont"
                  >查看CC</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="查看相关 MR 单">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="lookDe(scope.row)"
                  class="btnfont"
                  >查看MR</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="收藏">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="collection(scope.row)"
                  class="btnfont"
                  >收藏</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="totalPage"
            :pageSize="pageSize"
            :currentPage="currentPage"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
          />
        </el-col>
      </el-row>
      <div class="mt20 mb20" style="padding-right: 20px; float: right">
        <el-button class="el-icon-check refreshResult" @click="recommend"
          >&nbsp;&nbsp;推荐排故方案</el-button
        >
        <el-button class="el-icon-back addCondition" @click="goback"
          >&nbsp;&nbsp;返回查询页面</el-button
        >
      </div>
    </div>
    <!---->
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
    <condition
      ref="conditions"
      :data="items"
      :synonym="synonym"
      @addData="addData"
    />
  </div>
</template>

<script>
import api from "../API/index";
import Condition from "../components/condition.vue";
import DeDetails from "../components/deDetails.vue";
import pagination from "../components/pagination.vue";
export default {
  components: { pagination, DeDetails, Condition },
  data() {
    return {
      items: [],
      total: 0,
      checkedNumber: 0,
      startChapter1: "",
      endChapter1: "",
      listChapter: "",
      startChapter2: "",
      endChapter2: "",
      radio: "0",
      checked: false,
      tableData: [],
      totalPage: 100,
      pageSize: 10,
      currentPage: 1,
      show: false,
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

      keywords: [],
      start: "",
      end: "",
      planes: [],
      airplane: "",
      codes: [],
      value1: 0,
      synonym: [],
      startDate: "",
      endDate: "",
      arr: [],
      multipleSelection: [],
      show1: true,
      show2: true,
      show3: true,
    };
  },
  created() {
    this.getdata();
    this.gettabledata();
  },
  mounted() {},
  methods: {
    handleSelectionChange(val) {
      console.log(val);
      this.checkedNumber = val.length;
      this.multipleSelection = val;
    },
    //推荐
    recommend() {
      this.$router.push("/failureScheme");
    },
    gettabledata() {
      this.items.forEach((item) => {
        if (item.id == 1) {
          if (this.keywords) {
            this.keywords = item.keyword.toString().split(",");
          } else {
            this.keywords = [];
          }
        }
        if (item.id == 2) {
          if (item.text) {
            this.codes = item.text.toString().split(",");
          } else {
            this.codes = [];
          }
        }
        if (item.id == 3) {
          this.value1 = item.value1;
        }
        if (item.id == 4) {
          this.airplane = item.airplanes;
        }
        if (item.id == 5) {
          if (item.airplaneTypes) {
            this.planes = item.airplaneTypes.toString().split(",");
          } else {
            this.planes = [];
          }
        }
        if (item.id == 6) {
          this.start = item.chapters;
          this.end = item.sections;
        }
        if (item.id == 7) {
          this.startDate = item.startDate;
          this.endDate = item.endDate;
        }
      });
      const data = {
        startDate: this.startDate,
        endDate: this.endDate,
        chapters: this.start,
        sections: this.end,
        airplaneTypes: this.planes,
        airplanes: this.airplane,
        keyword: this.keywords,
        synonymWords: this.synonym,
        faultCode: this.codes,
        fuzzyMatching: this.value1,
        index: "de_record_list",
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        sort: this.radio,
      };
      api
        .post("/elasticSearch/deRecord/page", data)
        .then((res) => {
          if (res.code == 200) {
            //关键词组
            var keyword = this.items
              .filter((item) => {
                return item.keyword;
              })
              .map((item) => JSON.stringify(item.keyword).split(","))
              .flat();
            //table
            this.arr = res.data.list;
            this.total = res.data.total;
            let data = [...res.data.list].slice(0, 10);
            const tableData = [...res.data.list].map((item) => {
              return {
                ...item,
                dateAction: this.formateDate(item.dateAction),
                description: this.replaces(keyword, item.description),
                action: this.getSubStr(item.action),
                if(plannedAction) {
                  plannedAction: this.getSubStr(item.plannedAction);
                },
              };
            });
            this.tableData = tableData;
            //章节
            this.startChapter1 = res.data.aAtaChapterFirst;
            if (res.data.aAtaChapterSen) {
              this.show1 = true;
              this.endChapter1 = res.data.aAtaChapterSen;
            }
            if (res.data.taSectionFirst) {
              this.startChapter2 = res.data.taSectionFirst;
            }
            if (res.data.taSectionSen) {
              this.endChapter2 = res.data.taSectionSen;
            }
            if (res.data.taSectionThr) {
              this.listChapter = res.data.taSectionThr;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
    addData(data) {
      console.log(data);
      this.items = data;
    },

    formateDate(datetime) {
      // let  = "2019-11-06T16:00:00.000Z"
      function addDateZero(num) {
        return num < 10 ? "0" + num : num;
      }
      let d = new Date(datetime);
      let formatdatetime =
        d.getFullYear() +
        "/" +
        addDateZero(d.getMonth() + 1) +
        "/" +
        addDateZero(d.getDate());
      return formatdatetime;
    },
    //替换文字显示高亮
    replaces(data, textfont) {
      const regexp = new RegExp(`(${data.join("|")})`, "ig");
      return textfont.replace(regexp, `<span style="color:#F59A23">$1</span>`);
    },

    //文字中间显示省略号
    getSubStr(str) {
      var subStr1 = str.substr(0, 4);
      var subStr2 = str.substr(str.length - 5, 4);
      var subStr = subStr1 + "..." + subStr2;
      return subStr;
    },
    getdata() {
      //条件
      const list = JSON.parse(localStorage.getItem("listData"));
      this.items = list;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.gettabledata();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.gettabledata();
    },
    //删除条件
    del(index) {
      console.log("111");
      const list = [...this.items];
      list.splice(index, 1);
      this.items = [...list];
      localStorage.setItem("listData", JSON.stringify(this.items));
      console.log(this.items);
    },
    //收藏
    collection(row) {
      console.log(row);
    },
    //刷新
    refresh() {
      this.gettabledata();
    },
    changesSort() {
      this.gettabledata();
    },
    goback() {
      localStorage.setItem("listData", JSON.stringify(this.items));
      this.$router.push("/integrated");
    },
    //添加条件
    addCondition() {
      this.$refs.conditions.close();
    },
    closedDialog() {
      this.$refs.child.closeDialog();
    },
    lookDe(row) {
      console.log(row);
      const data = row;
      var id = row.de;
      const newdata = this.arr.filter((item) => {
        console.log(item.de);
        return item.de == id;
      });
      this.closedDialog();
      this.de = newdata[0].de.toString();
      this.date = this.formateDate(newdata[0].dateAction);
      this.open = newdata[0].ataOpen;
      this.closed = newdata[0].ataClose;
      this.terminal = newdata[0].station;
      this.number = newdata[0].acId;
      this.model = newdata[0].acType;
      this.faults = newdata[0].description;
      if (newdata[0].plannedAction) {
        this.plan = newdata[0].plannedAction;
      }
      this.programme = newdata[0].action;
    },
  },
};
</script>

<style  scoped>
</style>