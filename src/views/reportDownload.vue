<template>
  <div>
    <el-row class="integrated">
      <el-col :md="5" :lg="5" :xl="4">
        <div class="screenCondition">
          <h2>选择类型</h2>
          <ul>
            <li class="el-icon-plus" v-for="(item, index) in items" :key="index" @click="toggleShow(index)" :class="item.isshow ? 'current' : ''">
              &nbsp;&nbsp;{{ item.name }}
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :md="14" :lg="14" :xl="15">
        <div class="integrateedContent">
          <h2>选择工单/报告</h2>
          <div class="conditionList">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12" :xl="12">
                <div class="conditionTable">
                  <h4>报告生成记录</h4>
                  <div class="conditionTableContent" style="height: 500px !important">
                    <el-table :data="reportRecord" border row-key="id" ref="multipleTable" @selection-change="handleSelectionChange">
                      <el-table-column type="selection" width="55" :selectable="renderSelectable"></el-table-column>
                      <el-table-column label="生成时间" prop="date"></el-table-column>
                      <el-table-column label="报告类型" prop="reportType"></el-table-column>
                      <el-table-column label="报告ID" prop="reportId"></el-table-column>
                      <el-table-column label="查看报告">
                        <template slot-scope="scope">
                          <el-button size="mini" @click="lookReport(scope.$index)">
                            查看
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="12" :xl="12">
                <div class="conditionTable">
                  <h4>工单/报告搜索</h4>
                  <div class="conditionTableContent" style="min-height: 500px !important">
                    <el-row>
                      <el-col :span="24">
                        <span>报告类型： &nbsp;&nbsp;</span>
                        <el-select v-model="reportType">
                          <el-option v-for="(list, index) in todos" :key="index">{{ list }}</el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="24" class="mt20">
                        <span>日期选择：&nbsp;&nbsp;</span>
                        <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                      </el-col>
                    </el-row>
                    <div class="tagInput" style="padding-left: 100px">
                      <p>关键词搜索</p>
                      <div class="tagBorder mt20">
                        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                          {{ tag }}
                        </el-tag>
                        <el-autocomplete class="input-new-tag" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" :fetch-suggestions="querySearch" @select="handleInputConfirm">
                        </el-autocomplete>
                      </div>
                    </div>
                    <div class="reportTable">
                      <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                      </el-input>

                      <el-table :data="reportData" border ref="listdata" row-key="id" @selection-change="handleSelectionChange1">
                        <el-table-column type="selection" width="55" :selectable="renderSelectable"></el-table-column>
                        <el-table-column label="生成时间" prop="date"></el-table-column>
                        <el-table-column label="报告类型" prop="reportType"></el-table-column>
                        <el-table-column label="报告Id" prop="reportId"></el-table-column>
                        <el-table-column label="查看报告">
                          <template slot-scope="scope">
                            <el-button size="mini" @click="lookReport(scope.$index)">
                              查看
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-button class="el-icon-plus addcontent">
              &nbsp;&nbsp;添加
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :md="5" :lg="5" :xl="5">
        <div class="selecteds">
          <h2>确定下载</h2>
          <div class="selectedsList">
            <div class="selectedsContentList">
              <ul>
                <li v-for="(list, index) in lists" :key="index">
                  <div class="name">
                    {{ list.reportType }}
                    <i class="el-icon-close" @click="deltel(index)"></i><i class="el-icon-edit"></i>
                  </div>
                  <p>{{ list.reportId }}</p>
                </li>
              </ul>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button class="el-icon-delete btn empty" @click="remove">
                    &nbsp;&nbsp;清空
                  </el-button>
                </el-col>
                <el-col :span="12">
                  <el-button class="icon iconfont icon-download btn submit" @click="download">
                    &nbsp;&nbsp;下载
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false" id="pdf">
      <div>
        <img v-for="(item, index) in imgs" :src="item" :key="index" width="50%" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { downloadFile } from "@/utlis/utlis";
const cityOptions = [
  "同时下载关联DE工单",
  "同时下载相关CC工单",
  "同时下载相关MR工单",
];
export default {
  data() {
    return {
      img: [
        require("../static/pdf/3445_1.png"),
        require("../static/pdf/3445_2.png"),
        require("../static/pdf/3445_3.png"),
        require("../static/pdf/3445_4.png"),
        require("../static/pdf/3445_5.png"),
      ],
      img2: [
        require("../static/pdf/3453_1.png"),
        require("../static/pdf/3453_2.png"),
        require("../static/pdf/3453_3.png"),
        require("../static/pdf/3453_4.png"),
        require("../static/pdf/3453_5.png"),
        require("../static/pdf/3453_6.png"),
      ],
      img3: [
        require("../static/pdf/4951_1.png"),
        require("../static/pdf/4951_2.png"),
        require("../static/pdf/4951_3.png"),
        require("../static/pdf/4951_4.png"),
        require("../static/pdf/4951_5.png"),
        require("../static/pdf/4951_6.png"),
      ],
      dialogVisible: false,
      isshow: false,
      items: [
        { name: "报告生成记录", isshow: true },
        { name: "收藏历史记录", isshow: false },
        { name: "维修手册下载", isshow: false },
        { name: "CC 工单下载", isshow: false },
        { name: "MR 工单下载", isshow: false },
        { name: "工单/报告搜索", isshow: false },
      ],
      lists: [],
      text: "",
      dynamicTags: [],
      inputValue: "",
      restaurants: [],
      start: "",
      end: "",
      value: true,
      value1: 0,
      radio: 3,
      date: "",
      pickerOptions: {
        disabledDate(time) {
          // 禁止选择未来日期（可以选择今天）
          return time.getTime() > Date.now();
        },
      },
      reportRecord: [
        {
          type: 1,
          id: 3445,
          date: "20YY-MM-DD",
          reportType: "推荐方案",
          reportId: "2022-3445",
        },
        {
          type: 2,
          id: 3453,
          date: "20YY-MM-DD",
          reportType: "推荐方案",
          reportId: "2022-3453",
        },
        {
          type: 3,
          id: 4951,
          date: "20YY-MM-DD",
          reportType: "推荐方案",
          reportId: "2022-4951",
        },
      ],
      reportData: [
        {
          type: 4,
          id: 3445,
          date: "20YY-MM-DD",
          reportType: "推荐方案",
          reportId: "2022-3445",
        },
        {
          type: 5,
          id: 3453,
          date: "20YY-MM-DD",
          reportType: "推荐方案",
          reportId: "2022-3453",
        },
        {
          type: 6,
          id: 4951,
          date: "20YY-MM-DD",
          reportType: "推荐方案",
          reportId: "2022-4951",
        },
      ],
      checkedCities: [],
      cities: cityOptions,
      todos: [],
      date: "",
      reportType: "",
      searchValue: "",
      imgs: [],
      dataselection: [],
      listselection: [],
    };
  },
  created() {},
  mounted() {},
  computed: {
    renderSelectable: function () {
      return (row, index) => {
        return !row.disabled;
      };
    },
  },
  methods: {
    //清空
    remove() {
      this.lists = [];
      this.$refs.multipleTable.clearSelection();
      this.$refs.listdata.clearSelection();
    },
    //删除选中(动态删除已勾选的table)
    deltel(index) {
      let type = this.lists[index].type;
      const list = [...this.lists];
      list.splice(index, 1);
      this.lists = [...list];
      if (this.reportData.some((item) => item.type === type)) {
        const data = this.reportData.filter((item) => {
          if (type == item.type) {
            return item;
          }
        });
        this.$refs.listdata.toggleRowSelection(data[0], false);
      } else {
        const data = this.reportRecord.filter((item) => {
          if (type == item.type) {
            return item;
          }
        });
        this.$refs.multipleTable.toggleRowSelection(data[0], false);
      }
    },
    // 数组对象去重
    deWeightFour(arr, key) {
      let obj = {};
      arr = arr.reduce(function (a, b) {
        obj[b[key]] ? "" : (obj[b[key]] = true && a.push(b));
        return a;
      }, []);
      return arr;
    },
    //表一勾选
    handleSelectionChange(val) {
      this.dataselection = [...val];
      this.lists = this.deWeightFour([...this.listselection, ...val], "type");
    },
    //表二勾选
    handleSelectionChange1(val) {
      this.listselection = [...val];
      this.lists = this.deWeightFour([...this.dataselection, ...val], "type");
    },
    download() {
      this.lists.forEach((item, index) => {
        try {
          downloadFile(`${item.id}.pdf`, `${location.origin}/${item.id}.pdf`);
        } catch (e) {
          console.log("download error", e);
        }
      });
    },
    //查看报告
    lookReport(index) {
      this.dialogVisible = true;
      if (index == 0) {
        this.imgs = this.img;
      } else if (index == 1) {
        this.imgs = this.img2;
      } else {
        this.imgs = this.img3;
      }
    },
    toggleShow(index) {
      this.$set(this.items[index], "isshow", !this.items[index].isshow);
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        console.log(this.dynamicTags);
      }
      this.inputValue = "";
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号",
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113",
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101",
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
      ];
    },
  },
};
</script>

<style  scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>