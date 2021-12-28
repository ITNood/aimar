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
                        v-show="showAri"
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
                        v-for="tag in keywords"
                        closable
                        :disable-transitions="false"
                        @close="closeKeyword(tag)"
                      >
                        {{ tag }}
                      </el-tag>
                      <el-input
                        class="input-new-tag"
                        v-model="keywordValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handlekeyword"
                        @blur="handlekeyword"
                      >
                      </el-input>
                      <!-- <el-autocomplete
                        class="input-new-tag"
                        v-model="keywordValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handlekeyword"
                        @blur="handlekeyword"
                      >
                      </el-autocomplete> -->
                    </div>
                    <el-checkbox-group
                      v-model="checkboxValue"
                      @change="selectCheckbox"
                      class="mt20"
                    >
                      <el-checkbox label="COMPONENT"></el-checkbox>
                      <el-checkbox label="ALERT"></el-checkbox>
                      <el-checkbox label="INDICATOR"></el-checkbox>
                      <el-checkbox label="OPERATION"></el-checkbox>
                      <el-checkbox label="RESULT"></el-checkbox>
                    </el-checkbox-group>
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
                          maxlength="2"
                        ></el-input
                      ></el-col>
                      <el-col :span="2" class="line">-</el-col>
                      <el-col :span="11"
                        ><el-input
                          v-model="end"
                          placeholder="ATA 章节 (4位)"
                          maxlength="4"
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
                          <el-switch
                            v-model="value"
                            size="medium"
                            @change="vague"
                          >
                          </el-switch>
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="matching">
                          <h5>模糊度调整</h5>
                          <el-slider
                            v-model="value1"
                            @change="vagueNumber"
                            :disabled="disable"
                          ></el-slider>
                        </div>
                      </el-col>
                      <el-col :span="5">
                        <div class="matching text-right">
                          <h5>同近义词</h5>
                          <el-switch
                            v-model="value2"
                            size="medium"
                            @change="synonsm"
                          >
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
                            value-format="yyyy-MM-dd"
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
                  <p>{{ list.airplaneTypes }}</p>
                  <p>{{ list.airplanes }}</p>
                  <p>{{ list.chapters }}</p>
                  <p>{{ list.sections }}</p>
                  <p>{{ list.keyword }}</p>
                  <p>{{ list.text }}</p>
                  <p v-if="list.date">日期范围:{{ list.date }}</p>
                  <p v-if="list.startDate">起始日期:{{ list.startDate }}</p>
                  <p v-if="list.endDate">结束日期:{{ list.endDate }}</p>
                  <p v-if="list.value">
                    模糊匹配:{{ list.value == true ? "开" : "关" }}
                  </p>
                  <p v-if="list.value1">模糊度:{{ list.value1 }}</p>
                  <p v-if="list.value2">
                    同近义词:{{ list.value2 == true ? "开" : "关" }}
                  </p>
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
      showAri: true,
      synonym: [],
      disable: false,
      items: [
        { name: "故障描述", isshow: true },
        { name: "关键词组", isshow: true },
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
      checkboxValue: ["COMPONENT", "ALERT", "INDICATOR"],
      date: "",
      pickerOptions: {
        disabledDate(time) {
          // 禁止选择未来日期（可以选择今天）
          return time.getTime() > Date.now();
        },
      },
      addCondition: [],
      //关键词
      keywords: [],
      keywordValue: "",
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

      //
      number: 0,
    };
  },

  created() {
    this.getdata();
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  updated() {
    const len = this.items.filter((item) => !!item.isshow).length;
    if (len > 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    const data = JSON.parse(localStorage.getItem("ari"));
    const arr = [];
    if (this.airplane.length > 0) {
      this.airplane.forEach((item) => {
        const newdata = data.filter((e) => {
          if (e.value == item) {
            return e;
          }
        });
        arr.push(...newdata);
      });

      const newarr = arr.map((item) => {
        return { value: item.acType };
      });
      let obj = {};
      let peon = newarr.reduce((cur, next) => {
        obj[next.value] ? "" : (obj[next.value] = true && cur.push(next));
        return cur;
      }, []); //设置cur默认类型为数组，并且初始值为空的数组
      this.restPlane = peon;
    } else {
      const planeType = data.map((item) => {
        return { value: item.acType };
      });
      let obj = {};
      let peon = planeType.reduce((cur, next) => {
        obj[next.value] ? "" : (obj[next.value] = true && cur.push(next));
        return cur;
      }, []);
      this.restPlane = peon;
    }
    //是否选择飞机，已选择就隐藏输入框
    if (this.airplane.length > 0) {
      this.showAri = false;
    } else {
      this.showAri = true;
    }
  },
  methods: {
    toggleShow(index) {
      this.$set(this.items[index], "isshow", !this.items[index].isshow);
    },
    //关键词checkbox
    selectCheckbox(value) {
      const keyword = JSON.parse(localStorage.getItem("keyword"));
      if (value) {
        const arr = [];
        this.checkboxValue.forEach((item) => {
          const newdata = keyword.filter((e) => {
            if (e.category == item) {
              return e;
            }
          });
          arr.push(...newdata);
        });
        this.keywords = arr.map((item) => {
          return item.word;
        });
      }
    },
    //故障描述提交渲染关键词组
    faultSubmit() {
      if (this.text) {
        api
          .get(`/WordRecord/${this.text}/cut/synonym`)
          .then((res) => {
            const arr = [];
            this.checkboxValue.forEach((item) => {
              const newdata = [...res.data].filter((e) => {
                if (e.category == item) {
                  return e;
                }
              });
              arr.push(...newdata);
            });
            this.keywords = arr.map((item) => {
              return item.word;
            });
            localStorage.setItem("keyword", JSON.stringify(res.data));
            //同义词
            const data = [];
            arr
              .filter((item) => item.synonymWords && item.synonymWords.length)
              .map((item) => item.synonymWords)
              .forEach((item) => {
                item.forEach((obj) => {
                  data.push(obj.word);
                });
              });
            //判断同义词是否打开，赋值
            if (data) {
              localStorage.setItem("synonsm", JSON.stringify(data));
            } else {
              localStorage.removeItem("synonsm");
            }
            if (this.value2 == true) {
              this.synonym = data;
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {});
      } else {
        this.$message.warning("请输入故障描述");
      }
    },

    //同近义词选择
    synonsm(val) {
      const data = JSON.parse(localStorage.getItem("synonsm"));
      if (val == true) {
        this.synonym = data;
      } else {
        this.synonym = [];
      }
    },
    //模糊开关
    vague(val) {
      if (this.value == true) {
        this.disable = false;
        this.value1 = this.number;
      } else {
        this.disable = true;
        this.value1 = 0;
      }
    },

    vagueNumber(val) {
      this.number = val;
    },
    getdata() {
      api
        .get("/DeRecord/props")
        .then((res) => {
          //渲染选定飞机
          const data = [...res.data.planesAndTypes].map((item) => {
            return { value: item.acId, acType: item.acType };
          });
          this.restAri = data;
          if (data) {
            localStorage.setItem("ari", JSON.stringify(data));
          } else {
            localStorage.removeItem("ari");
          }
          //渲染机型
          if (this.airplane.length < 1) {
            const planeType = data.map((item) => {
              return { value: item.acType };
            });
            let obj = {};
            let peon = planeType.reduce((cur, next) => {
              obj[next.value] ? "" : (obj[next.value] = true && cur.push(next));
              return cur;
            }, []); //设置cur默认类型为数组，并且初始值为空的数组
            this.restPlane = peon;
          }
          //章节
          // const chapter = [...res.data.sections].map((item) => {
          //   return { value: item };
          // });
          // console.log("select", chapter);
        })
        .catch((err) => {
          console.log(err);
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
        if (this.keywords.length > 0) {
          this.addCondition.push({
            name: "关键词组",
            keyword: this.keywords.join(","),
            id: 1,
          });
        }
      }
      if (this.items[2].isshow == true) {
        if (this.codes.length > 0) {
          this.addCondition.push({
            name: "故障代码",
            text: this.codes.join(","),
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
        if (this.airplane.length > 0) {
          this.addCondition.push({
            name: "选定飞机",
            airplanes: this.airplane.join(),
            id: 4,
          });
        }
      }
      if (this.items[5].isshow == true) {
        if (this.planes.length > 0) {
          this.addCondition.push({
            name: "选定机型",
            airplaneTypes: this.planes.join(","),
            id: 5,
          });
        }
      }
      if (this.items[6].isshow == true) {
        if (this.start || this.end) {
          this.addCondition.push({
            name: "章节范围",
            chapters: this.start,
            sections: this.end,
            id: 6,
          });
        }
      }
      if (this.items[7].isshow == true) {
        if (this.date) {
          this.addCondition.push({
            name: "日期范围",
            date: this.radio,
            startDate: this.date[0],
            endDate: this.date[1],
            id: 7,
          });
        } else {
          this.addCondition.push({
            name: "日期范围",
            date: this.radio,
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
      console.log(this.keywords, this.text, this.lists);
      if (this.keyword || (this.lists.length && this.lists)) {
        //存储已选条件
        localStorage.setItem("listData", JSON.stringify(this.lists));

        if (this.date) {
          var startDate = this.date[0];
          var endDate = this.date[1];
        }
        const data = {
          startDate: startDate,
          endDate: endDate,
          chapters: this.start,
          sections: this.end,
          airplaneTypes: this.planes,
          airplanes: this.airplane.join(),
          keyword: this.keywords,
          synonymWords: this.synonym,
          faultCode: this.codes,
          fuzzyMatching: this.value1,
          index: "de_record_list",
        };
        api
          .post("/elasticSearch/deRecord/page", data)
          .then((res) => {
            if (res.code == 200) {
              localStorage.setItem("tableData", JSON.stringify(res.data));
              this.$message.success("成功！！！");
              this.$router.push("/searchResult");
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {});
      } else {
        this.$message.warning("请输入故障描述!!!");
      }
    },
    //关键词
    closeKeyword(tag) {
      this.keywords.splice(this.keywords.indexOf(tag), 1);
      const keyword = JSON.parse(localStorage.getItem("keyword"));
      const arr = [];
      this.keywords.map((item) => {
        const data = keyword.filter((e) => {
          return e.word == item;
        });
        arr.push(...data);
      });
      localStorage.setItem("keyword", JSON.stringify(arr));
    },
    handlekeyword() {
      let keywordValue = this.keywordValue;
      if (keywordValue) {
        this.keywords.push(keywordValue);
        console.log(this.keywords);
      }
      this.keywordValue = "";
    },
    //
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
    closePlan(tag) {
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