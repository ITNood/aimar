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
              <el-col :md="24" :lg="12" :xl="12" v-show="items[0].isshow">
                <div class="conditionTable">
                  <h4>故障描述</h4>
                  <div class="conditionTableContent clear">
                    <el-input
                      type="textarea"
                      v-model="text"
                      clearable
                      placeholder="输入故障描述"
                    ></el-input>
                    <el-button
                      size="mini"
                      class="faultSubmit"
                      @click="faultSubmit"
                      >确定</el-button
                    >
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="12" :xl="12" v-show="items[4].isshow">
                <div class="conditionTable">
                  <h4>选定飞机</h4>
                  <div class="conditionTableContent">
                    <div class="tagBorder">
                      <el-tag
                        :key="tag"
                        v-for="tag in airplane"
                        closable
                        :disable-transitions="false"
                        @close="closeAriplane(tag)"
                      >
                        {{ tag }}
                      </el-tag>
                      <el-autocomplete
                        class="input-new-tag"
                        v-model="ariValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleAriplane"
                        @blur="handleAriplane"
                        :fetch-suggestions="searchAri"
                        @select="handleAriplane"
                      >
                      </el-autocomplete>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="12" :xl="12" v-show="items[1].isshow">
                <div class="conditionTable">
                  <h4>关键词组</h4>
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
              <el-col :md="24" :lg="12" :xl="12" v-show="items[5].isshow">
                <div class="conditionTable">
                  <h4>选定机型</h4>
                  <div class="conditionTableContent">
                    <div class="tagBorder">
                      <el-tag
                        :key="tag"
                        v-for="tag in planes"
                        closable
                        :disable-transitions="false"
                        @close="closePlan(tag)"
                      >
                        {{ tag }}
                      </el-tag>
                      <el-autocomplete
                        class="input-new-tag"
                        v-model="planeValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handlePlane"
                        @blur="handlePlane"
                        :fetch-suggestions="searchPlane"
                        @select="handlePlane"
                      >
                      </el-autocomplete>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="12" :xl="12" v-show="items[2].isshow">
                <div class="conditionTable">
                  <h4>故障代码</h4>
                  <div class="conditionTableContent">
                    <div class="tagBorder">
                      <el-tag
                        :key="tag"
                        v-for="tag in codes"
                        closable
                        :disable-transitions="false"
                        @close="closeCode(tag)"
                      >
                        {{ tag }}
                      </el-tag>
                      <el-autocomplete
                        class="input-new-tag"
                        v-model="codeValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleCode"
                        @blur="handleCode"
                        :fetch-suggestions="searchCode"
                        @select="handleCode"
                      >
                      </el-autocomplete>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="12" :xl="12" v-show="items[6].isshow">
                <div class="conditionTable">
                  <h4>章节范围</h4>
                  <div class="conditionTableContent">
                    <el-row :gutter="20">
                      <el-col :span="11"
                        ><el-input
                          v-model="start"
                          placeholder="ATA 章节 (2位)"
                        ></el-input
                      ></el-col>
                      <el-col :span="2" class="line">-</el-col>
                      <el-col :span="11"
                        ><el-input
                          v-model="end"
                          placeholder="ATA 章节 (4位)"
                        ></el-input
                      ></el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="12" :xl="12" v-show="items[3].isshow">
                <div class="conditionTable">
                  <h4>模糊匹配</h4>
                  <div class="conditionTableContent">
                    <el-row :gutter="15">
                      <el-col :span="5">
                        <div class="matching">
                          <h5>模糊开关</h5>
                          <el-switch v-model="value" size="medium"> </el-switch>
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="matching">
                          <h5>模糊度调整</h5>
                          <el-slider v-model="value1"></el-slider>
                        </div>
                      </el-col>
                      <el-col :span="5">
                        <div class="matching text-right">
                          <h5>同近义词</h5>
                          <el-switch v-model="value2" size="medium">
                          </el-switch>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
              <el-col :md="24" :lg="12" :xl="12" v-show="items[7].isshow">
                <div class="conditionTable">
                  <h4>日期范围</h4>
                  <div class="conditionTableContent">
                    <el-radio-group v-model="radio">
                      <el-radio label="近半年"></el-radio>
                      <el-radio label="近一年"></el-radio>
                      <el-radio label="近两年"></el-radio>
                      <el-radio label="近三年"></el-radio>
                      <el-radio label="全部"></el-radio>
                    </el-radio-group>
                    <div class="setDate">
                      <el-row>
                        <el-col :xl="6">自定义日期</el-col>
                        <el-col :xl="18">
                          <el-date-picker
                            class="datePicker"
                            v-model="date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy/MM/dd"
                            :picker-options="pickerOptions"
                          >
                          </el-date-picker>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-button
              class="el-icon-plus addcontent"
              v-if="show"
              @click="addData"
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
                    <i class="el-icon-close" @click="close(index)"></i
                    ><i class="el-icon-edit" @click="edit(list.id)"></i>
                  </div>
                  <p>{{ list.text }}</p>
                  <p>{{ list.value }}</p>
                  <p>{{ list.value1 }}</p>
                  <p>{{ list.value2 }}</p>
                </li>
              </ul>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button class="el-icon-delete btn empty" @click="empty"
                    >&nbsp;&nbsp;清空</el-button
                  >
                </el-col>
                <el-col :span="12">
                  <el-button class="el-icon-check btn submit" @click="submit"
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
import api from "../API/index";
export default {
  data() {
    return {
      show: false,
      items: [
        { name: "故障描述", isshow: false },
        { name: "关键词组", isshow: false },
        { name: "故障代码", isshow: false },
        { name: "模糊匹配", isshow: false },
        { name: "选定飞机", isshow: false },
        { name: "选定机型", isshow: false },
        { name: "章节范围", isshow: false },
        { name: "日期范围", isshow: false },
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
      value2: true,
      radio: "近一年",
      date: "",
      pickerOptions: {
        disabledDate(time) {
          // 禁止选择未来日期（可以选择今天）
          return time.getTime() > Date.now();
        },
      },
      addCondition: [],
      //选定机型
      planes: [],
      planeValue: "",
      restPlane: [],
      //选定飞机
      airplane: [],
      ariValue: "",
      restAri: [],

      //故障代码
      codes: [],
      codeValue: "",
      restCode: [],
    };
  },

  created() {},
  mounted() {
    this.restaurants = this.loadAll();
    this.restPlane = this.loadAll();
    this.restAri = this.loadAll();
    this.restCode = this.loadAll();
  },
  updated() {
    const len = this.items.filter((item) => !!item.isshow).length;
    if (len > 0) {
      this.show = true;
    } else {
      this.show = false;
    }
  },
  methods: {
    toggleShow(index) {
      this.$set(this.items[index], "isshow", !this.items[index].isshow);
    },
    //故障描述提交渲染关键词组
    faultSubmit() {
      api
        .get(`/WordRecord/cut/${this.text}`)
        .then((res) => {
          const data = [...res.data].map((item) => {
            return item.word;
          });
          console.log(data);
          this.dynamicTags = data;
        })
        .catch((err) => {
          console.log("失败", err);
        })
        .finally(() => {});
    },
    //添加条件
    addData() {
      this.addCondition = [];
      if (this.items[0].isshow == true) {
        if (this.text) {
          this.addCondition.push({ name: "故障描述", text: this.text, id: 0 });
        }
      }
      if (this.items[1].isshow == true) {
        if (this.dynamicTags.length > 0) {
          this.addCondition.push({
            name: "关键词组",
            text: this.dynamicTags.join(","),
            id: 1,
          });
        }
      }
      if (this.items[2].isshow == true) {
        if (this.dynamicTags.length > 0) {
          this.addCondition.push({
            name: "故障代码",
            text: this.dynamicTags.join(","),
            id: 2,
          });
        }
      }
      if (this.items[3].isshow == true) {
        this.addCondition.push({
          name: "模糊匹配",
          value: this.value,
          value1: this.value1,
          value2: this.value2,
          id: 3,
        });
      }
      if (this.items[4].isshow == true) {
        if (this.dynamicTags.length > 0) {
          console.log(this.dynamicTags);
          this.addCondition.push({
            name: "选定飞机",
            text: this.dynamicTags.join(","),
            id: 4,
          });
        }
      }
      if (this.items[5].isshow == true) {
        if (this.dynamicTags.length > 0) {
          this.addCondition.push({
            name: "选定机型",
            text: this.dynamicTags.join(","),
            id: 5,
          });
        }
      }
      if (this.items[6].isshow == true) {
        if (this.start || this.end) {
          this.addCondition.push({
            name: "章节范围",
            text: this.start + "-" + this.end,
            id: 6,
          });
        }
      }
      if (this.items[7].isshow == true) {
        if (this.date) {
          this.addCondition.push({
            name: "日期范围",
            value: this.radio,
            value1: this.date.join("-"),
            id: 7,
          });
        } else {
          this.addCondition.push({
            name: "日期范围",
            value: this.radio,
            id: 7,
          });
        }
      }
      this.lists = this.addCondition;
    },

    //编辑条件
    edit(id) {
      this.items[id].isshow = true;
    },

    //删除条件
    close(index) {
      this.lists.splice(index, 1);
    },

    //清空
    empty() {
      this.lists = [];
    },

    //确认
    submit() {
      api
        .post("", { data: this.lists })
        .then((res) => {})
        .catch((err) => {})
        .finally(() => {});
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
    //选定机型
    handlePlane() {
      let planeValue = this.planeValue;
      if (planeValue) {
        this.planes.push(planeValue);
      }
      this.planeValue = "";
    },
    closeAri(tag) {
      this.planes.splice(this.planes.indexOf(tag), 1);
    },
    searchPlane(queryString, cb) {
      var restPlane = this.restPlane;
      var results = queryString
        ? restPlane.filter(this.planeFilter(queryString))
        : restPlane;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    planeFilter(queryString) {
      return (restPlane) => {
        return (
          restPlane.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    //选定飞机
    handleAriplane() {
      let ariValue = this.ariValue;
      if (ariValue) {
        this.airplane.push(ariValue);
      }
      this.ariValue = "";
    },
    closeAriplane(tag) {
      this.airplane.splice(this.airplane.indexOf(tag), 1);
    },
    searchAri(queryString, cb) {
      var restAri = this.restAri;
      var results = queryString
        ? restAri.filter(this.ariFilter(queryString))
        : restAri;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    ariFilter(queryString) {
      return (restAri) => {
        return (
          restAri.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    //故障代码
    handleCode() {
      let codeValue = this.codeValue;
      if (codeValue) {
        this.codes.push(codeValue);
      }
      this.codeValue = "";
    },
    closeCode(tag) {
      this.codes.splice(this.codes.indexOf(tag), 1);
    },
    searchCode(queryString, cb) {
      var restCode = this.restCode;
      var results = queryString
        ? restCode.filter(this.codeFilter(queryString))
        : restCode;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    codeFilter(queryString) {
      return (restCode) => {
        return (
          restCode.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
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