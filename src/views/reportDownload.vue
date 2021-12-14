<template>
  <div>
    <el-row class="integrated">
      <el-col :md="5" :lg="5" :xl="4">
        <div class="screenCondition">
          <h2>选择筛选条件</h2>
          <ul>
            <li
              class="el-icon-plus"
              v-for="(item, index) in items"
              :key="index"
              @click="toggleShow(index)"
              :class="item.isshow ? 'current' : ''"
            >
              &nbsp;&nbsp;{{ item.name }}
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :md="14" :lg="14" :xl="15">
        <div class="integrateedContent">
          <h2>输入筛选条件</h2>
          <div class="conditionList">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12" :xl="12">
                <div class="conditionTable">
                  <h4>报告生成记录</h4>
                  <div class="conditionTableContent">
                    <el-table :data="reportRecord" border>
                      <el-table-column
                        type="selection"
                        width="55"
                      ></el-table-column>
                      <el-table-column
                        label="生成时间"
                        prop="date"
                      ></el-table-column>
                      <el-table-column
                        label="报告类型"
                        prop="reportType"
                      ></el-table-column>
                      <el-table-column
                        label="报告ID"
                        prop="reportId"
                      ></el-table-column>
                      <el-table-column label="查看报告">
                        <template #default="row">
                          <el-button size="mini" @click="lookReport(row)"
                            >查看</el-button
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="12" :xl="12">
                <div class="conditionTable">
                  <h4>维修手册下载</h4>
                  <div class="conditionTableContent">
                    <div class="tagBorder">
                      <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                      >
                        {{ tag }}
                      </el-tag>
                      <el-autocomplete
                        class="input-new-tag"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                        :fetch-suggestions="querySearch"
                        @select="handleInputConfirm"
                      >
                      </el-autocomplete>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="12" :xl="12">
                <div class="conditionTable">
                  <h4>DE 工单下载</h4>
                  <div class="conditionTableContent">
                    <div class="tagBorder">
                      <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                      >
                        {{ tag }}
                      </el-tag>
                      <el-autocomplete
                        class="input-new-tag"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                        :fetch-suggestions="querySearch"
                        @select="handleInputConfirm"
                      >
                      </el-autocomplete>
                    </div>
                    <el-checkbox-group v-model="checkedCities" class="mt20">
                      <el-checkbox
                        v-for="(city, index) in cities"
                        :label="index"
                        :key="index"
                        >{{ city }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="12" :xl="12">
                <div class="conditionTable">
                  <h4>工单/报告搜索</h4>
                  <div
                    class="conditionTableContent"
                    style="min-height: 400px !important"
                  >
                    <el-row>
                      <el-col :span="24">
                        <span>报告类型</span
                        ><el-select v-model="reportType">
                          <el-option
                            v-for="(list, index) in todos"
                            :key="index"
                            >{{ list }}</el-option
                          >
                        </el-select>
                      </el-col>
                      <el-col :span="24" class="mt20">
                        <el-date-picker
                          v-model="date"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                        >
                        </el-date-picker>
                      </el-col>
                    </el-row>
                    <div class="tagInput" style="padding-left: 100px">
                      <p>关键词搜索</p>
                      <div class="tagBorder mt20">
                        <el-tag
                          :key="tag"
                          v-for="tag in dynamicTags"
                          closable
                          :disable-transitions="false"
                          @close="handleClose(tag)"
                        >
                          {{ tag }}
                        </el-tag>
                        <el-autocomplete
                          class="input-new-tag"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm"
                          @blur="handleInputConfirm"
                          :fetch-suggestions="querySearch"
                          @select="handleInputConfirm"
                        >
                        </el-autocomplete>
                      </div>
                    </div>
                    <div class="reportTable">
                      <el-input
                        placeholder="请输入内容"
                        v-model="searchValue"
                        class="input-with-select"
                      >
                        <el-button
                          slot="append"
                          icon="el-icon-search"
                        ></el-button>
                      </el-input>

                      <el-table :data="reportData" border>
                        <el-table-column
                          type="selection"
                          width="55"
                        ></el-table-column>
                        <el-table-column
                          label="生成时间"
                          prop="date"
                        ></el-table-column>
                        <el-table-column
                          label="报告类型"
                          prop="reportType"
                        ></el-table-column>
                        <el-table-column
                          label="报告Id"
                          prop="reportId"
                        ></el-table-column>
                        <el-table-column label="查看报告">
                          <template #default="row">
                            <el-button size="mini" @click="lookReport(row)"
                              >查看</el-button
                            >
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-button class="el-icon-plus addcontent"
              >&nbsp;&nbsp;添加</el-button
            >
          </div>
        </div>
      </el-col>
      <el-col :md="5" :lg="5" :xl="5">
        <div class="selecteds">
          <h2>选定筛选条件</h2>
          <div class="selectedsList">
            <div class="selectedsContentList">
              <ul>
                <li v-for="(list, index) in lists" :key="index">
                  <div class="name">
                    {{ list.name }}
                    <i class="el-icon-close"></i><i class="el-icon-edit"></i>
                  </div>
                  <p>{{ list.text }}</p>
                </li>
              </ul>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button class="el-icon-delete btn empty"
                    >&nbsp;&nbsp;清空</el-button
                  >
                </el-col>
                <el-col :span="12">
                  <el-button class="el-icon-check btn submit"
                    >&nbsp;&nbsp;确认</el-button
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const cityOptions = [
  "同时下载关联DE工单",
  "同时下载相关CC工单",
  "同时下载相关MR工单",
];
export default {
  data() {
    return {
      isshow: false,
      items: [
        { name: "报告生成记录", isshow: false },
        { name: "收藏历史记录", isshow: false },
        { name: "维修手册下载", isshow: false },
        { name: "DE 工单下载", isshow: false },
        { name: "CC 工单下载", isshow: false },
        { name: "MR 工单下载", isshow: false },
        { name: "工单/报告搜索", isshow: false },
      ],
      lists: [
        { name: "故障描述", text: "ABCDEFGHIGKLMNOPQRSTUVWXYZ" },
        {
          name: "关键词组",
          text: "自动抽取: ABCD , EFGH , XYZ 手动输入: ACEG , ZYX",
        },
      ],
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
          id: 1,
          date: "2021-12-14",
          reportType: "维修报告",
          reportId: "156456",
        },
      ],
      reportData: [
        {
          id: 1,
          date: "2021-12-14",
          reportType: "维修报告",
          reportId: "156456",
        },
      ],
      checkedCities: [],
      cities: cityOptions,
      todos: [],
      date: "",
      reportType: "",
      searchValue: "",
    };
  },

  created() {},
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    //查看报告
    lookReport(row) {},
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