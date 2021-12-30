<template>
  <div>
    <el-row class="scheme">
      <el-col :md="5" :lg="5" :xl="4">
        <div class="entryFault">
          <h2>筛选部件</h2>
          <div class="faultInformation">
            <ul class="component">
              <li>
                <h5>飞机编号</h5>
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
                    :fetch-suggestions="querySearch"
                    @select="handleInputConfirm"
                  >
                  </el-autocomplete>
                </div>
              </li>
              <li>
                <h5>部件名</h5>
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
              </li>
              <li>
                <h5>部件号（PN）</h5>
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
              </li>
              <li>
                <el-checkbox v-model="checkbox1" class="componentbox">
                  仅查询当前在机部件</el-checkbox
                >
              </li>
              <li>
                <el-checkbox v-model="checkbox2" class="componentbox">
                  仅查询主件</el-checkbox
                >
              </li>
            </ul>
            <el-button class="el-icon-search searchbtn mt20"
              >&nbsp;&nbsp;筛选</el-button
            >
          </div>
        </div>
      </el-col>
      <el-col :md="14" :lg="14" :xl="15">
        <div class="selectedsProgramme">
          <h2>选择排故方案</h2>
          <div class="programme">
            <el-radio-group v-model="radio">
              <el-radio-button label="1">PN # ABCD123</el-radio-button>
              <el-radio-button label="2">PN # ABCD124</el-radio-button>
              <el-radio-button label="3">PN # ABCD125</el-radio-button>
              <el-radio-button label="4">PN # ABCD126</el-radio-button>
            </el-radio-group>
            <el-row class="border">
              <el-col :span="12">
                <div class="programmeDetails">
                  <h4>部件基本信息</h4>
                  <div class="news">
                    <el-row :gutter="20">
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN#：</p>
                        <p>ABCD123</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN是否在机(B-1234)：</p>
                        <p>是</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>部件名称：</p>
                        <p>ABCDEFG；ABCDEFH；ABCDE-FG</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>可替换PN：</p>
                        <p>ABCD456；ABCD567；ABCE123</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN平均在机时间：</p>
                        <p>123 天</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN平均在机时间(B-1234)：</p>
                        <p>234 天</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN故障概率：</p>
                        <p>67%</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN更换排故概率：</p>
                        <p>78%</p>
                      </el-col>
                    </el-row>
                  </div>
                  <el-table border :data="tableData" class="mt20">
                    <el-table-column
                      type="selection"
                      width="55"
                    ></el-table-column>
                    <el-table-column label="SN" prop="sn"></el-table-column>
                    <el-table-column label="在机时长" prop="date">
                      <template #default="row">{{ row.row.date }}天</template>
                    </el-table-column>
                    <el-table-column
                      label="历史更换次数"
                      prop="number"
                    ></el-table-column>
                    <el-table-column label="流转信息">
                      <template #default="row">
                        <el-button size="mini" @click="lookUp(row)"
                          >查看</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="proprammeRight">
                  <div class="programmeImg">
                    <h3>部件流转信息可视化展示 <span>beta</span></h3>
                    <img src="../static/image/img.png" />
                    <el-table :data="data" border class="mt20">
                      <el-table-column
                        label="更换时间"
                        prop="date"
                      ></el-table-column>
                      <el-table-column label="在机时长" prop="time">
                        <template #default="row">
                          {{ row.row.time }}天
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="拆下"
                        prop="remove"
                      ></el-table-column>
                      <el-table-column
                        label="装上"
                        prop="putOn"
                      ></el-table-column>
                      <el-table-column label="CC/MR记录">
                        <template #default="row">
                          <el-button size="mini" @click="record(row)"
                            >查看</el-button
                          >
                        </template>
                      </el-table-column>
                      <el-table-column label="DE记录">
                        <template #default="row">
                          <el-button size="mini" @click="DErecord(row)"
                            >查看</el-button
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :md="5" :lg="5" :xl="5">
        <div class="selecteds">
          <h2>已选择更换部件</h2>
          <div class="selectedComponent">
            <ul>
              <li v-for="(item, index) in items" :key="index">
                <p>
                  {{ item.name }}<i class="el-icon-close"></i
                  ><i class="el-icon-edit"></i>
                </p>
                <p>{{ item.text }}</p>
              </li>
            </ul>
            <el-checkbox v-model="checked1" class="check mt20">
              自动补充辅助件</el-checkbox
            >
            <el-checkbox v-model="checked2" class="check">
              自动填写部件数量</el-checkbox
            >
            <el-checkbox v-model="checked3" class="check">
              同时建议可替换件</el-checkbox
            >
            <el-button class="icon iconfont icon-download download"
              >&nbsp;&nbsp;自动生成CC单</el-button
            >
            <el-button class="icon iconfont icon-download download"
              >&nbsp;&nbsp;自动生成MR单</el-button
            >
            <el-button class="icon iconfont icon-download download"
              >&nbsp;&nbsp;领料报告下载</el-button
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      dynamicTags: [],
      inputValue: "",
      restaurants: [],
      checkbox1: false,
      checkbox2: false,
      tableData: [
        { id: 1, sn: "dsafaf", date: "225", number: 4548 },
        { id: 2, sn: "dsafaf", date: "225", number: 4548 },
      ],
      data: [
        {
          id: 1,
          date: "2021-12-14",
          time: 22,
          remove: "B-26556",
          putOn: "C-4854",
        },
      ],
      items: [
        { name: "PN # ABCD123", text: "SN # 123456" },
        { name: "PN # ABCD123", text: "SN # 123456" },
      ],
      checked1: false,
      checked2: false,
      checked3: false,
    };
  },
  created() {},
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    //CC/MR记录
    record(row) {
      console.log(row.row);
    },
    //DE记录
    DErecord(row) {
      console.log(row.row);
    },
    lookUp(row) {
      console.log(row.row);
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
</style>