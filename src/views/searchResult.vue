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
          <p v-if="item.value">
            模糊匹配:{{ item.value == true ? "开" : "关" }}
          </p>
          <p v-if="item.value1">模糊度:{{ item.value1 }}</p>
          <p v-if="item.value2">
            同近义词:{{ item.value2 == true ? "开" : "关" }}
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
              <p>-{{ startChapter }}</p>
              <p>-{{ endChapter }}</p>
            </li>
            <li>
              <h3>ATA次章节：</h3>
              <p>-{{ startChapter }}</p>
              <p>-{{ endChapter }}</p>
              <p>-{{ listChapter }}</p>
            </li>
          </ul>
        </el-col>
        <el-col :md="16" :lg="18" :xl="20">
          <div class="clear">
            <el-radio-group v-model="radio" class="selectradio">
              <el-radio :label="3"> 按综合相似度排序</el-radio>
              <el-radio :label="6"> 按描述相似度排序</el-radio>
              <el-radio :label="9"> 按时间排序</el-radio>
            </el-radio-group>
            <el-checkbox v-model="checked" class="selectcheckbox">
              仅查看相关ATA</el-checkbox
            >
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
              <template #default="row">
                <div v-html="row.row.description"></div>
              </template>
            </el-table-column>
            <el-table-column prop="plannedAction" label="计划措施">
              <template #default="row">
                <div>{{ row.row.plannedAction }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="action" label="排故措施">
              <template #default="row">
                <div v-html="row.row.action"></div>
              </template>
            </el-table-column>
            <el-table-column label="查看 DE 详情">
              <template #default="row">
                <el-button size="mini" @click="lookDe(row)" class="btnfont"
                  >查看DE</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="查看相关 CC 单">
              <template #default="row">
                <el-button size="mini" @click="lookDe(row)" class="btnfont"
                  >查看CC</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="查看相关 MR 单">
              <template #default="row">
                <el-button size="mini" @click="lookDe(row)" class="btnfont"
                  >查看MR</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="收藏">
              <template #default="row">
                <el-button size="mini" @click="collection(row)" class="btnfont"
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
        <el-button class="el-icon-check refreshResult"
          >&nbsp;&nbsp;推荐排故方案</el-button
        >
        <el-button class="el-icon-back addCondition"
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
  </div>
</template>

<script>
import DeDetails from "../components/deDetails.vue";
import pagination from "../components/pagination.vue";
export default {
  components: { pagination, DeDetails },
  data() {
    return {
      items: [],
      total: 10,
      checkedNumber: 0,
      startChapter: "12:飞机维修",
      endChapter: "16:维修结果",
      listChapter: "36:就殴打Jodi",
      radio: 3,
      checked: false,
      tableData: [],
      multipleSelection: [],
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
    };
  },
  created() {
    this.getdata();
  },
  mounted() {},
  methods: {
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

      //关键词组
      var keyword = list
        .filter((item) => {
          return item.keyword;
        })
        .map((item) => item.keyword.split(","))
        .flat();
      //table
      const data = JSON.parse(localStorage.getItem("tableData"));
      const tableData = data.map((item) => {
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
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //删除条件
    del(index) {
      const list = [...this.items];
      list.splice(index, 1);
      this.items = [...list];
      localStorage.setItem("listData", JSON.stringify(this.items));
    },
    //收藏
    collection(row) {
      console.log(row);
    },
    //刷新
    refresh() {},
    //添加条件
    addCondition() {},
    closedDialog() {
      this.$refs.child.closeDialog();
    },
    lookDe(row) {
      var id = row.row.de;
      const data = JSON.parse(localStorage.getItem("tableData"));
      // console.log(data);
      const newdata = data.filter((item) => {
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
    //table checkedbox
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style  scoped>
</style>