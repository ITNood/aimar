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
                <p>{{ item.text }}</p>
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
                >方案 #{{ index + 1 }}
              </el-radio-button>
            </el-radio-group>
            <el-row class="border">
              <el-col :span="12">
                <div class="programmeDetails">
                  <ul>
                    <li>
                      针对 <span>{{ reference }}</span> 出现
                      <span>{{ target }}</span> 故障 ；
                    </li>
                    <li>
                      <p>
                        执行 <span>{{ fault }}</span> 操作，执行
                        <span>{{ action }}</span> 操作；
                      </p>
                      <p>
                        【故障排除概率： <span>{{ probability }} </span>】
                      </p>
                      <p>
                        （参照 DE # <span>{{ de }}</span> ）
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
                          依据 <span>{{ item.Reference }}}</span>
                        </p>
                        <p>
                          【故障排除概率：<span> {{ item.Probability }} </span
                          >】
                        </p>
                        <p>
                          （参照 DE # <span>{{ item.DE.join() }}</span
                          >）
                        </p>
                      </div>

                      <div class="other" v-if="SolutionMEL">
                        <h5>-若故障仍未解除：</h5>
                        <p>依据 <span>MEL 34-45-02</span> ；</p>
                        <p>执行 <span>保留、监控</span>；</p>
                        <p>（参照 DE # <span>987654</span>）</p>
                      </div>
                    </li>
                    <li>
                      【综合排故概率： <span>{{ solutionProbability }}</span
                      >】
                    </li>
                    <div class="btncenter">
                      <el-button class="el-icon-check" @click="confirm"
                        >&nbsp;&nbsp;确认</el-button
                      >
                      <el-button class="el-icon-edit"
                        >&nbsp;&nbsp;修改</el-button
                      >
                      <el-button class="el-icon-delete"
                        >&nbsp;&nbsp;弃用</el-button
                      >
                    </div>
                  </ul>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="proprammeRight">
                  <div class="programmeImg">
                    <h3>推荐推理逻辑可视化展示 <span>beta</span></h3>
                    <img src="../static/image/img.png" />
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
                    <span>{{ val.SolutionHeader.DE.join() }}</span> ）
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

                  <div class="other" v-if="val.SolutionMEL.length > 0">
                    <h5>-若故障仍未解除：</h5>
                    <p>
                      依据 <span>{{ item.SolutionMEL.Reference }}</span> ；
                    </p>
                    <p>执行 <span>保留、监控</span>；</p>
                    <p>
                      （参照 DE # <span>{{ item.SolutionMEL.DE.join() }}</span
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
            <el-button class="el-icon-delete btn empty" @click="clean"
              >&nbsp;&nbsp;清空</el-button
            >
            <el-button class="el-icon-check btn submit"
              >&nbsp;&nbsp;确认</el-button
            >
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
      items: [
        { name: "故障描述", text: "ABCDEFGHIGKLMNOPQRSTUVWXYZ" },
        {
          name: "关键词组",
          text: "自动抽取: ABCD , EFGH , XYZ 手动输入: ACEG , ZYX",
        },
      ],

      radio: "0",
      reference: "",
      target: "",
      fault: "",
      action: "",
      probability: "",
      de: "",
      lists: [],
      solutionProbability: "",
      result: [],
      SolutionMEL: false,
      todos: [],
      arr: [],
      arrs: [],
    };
  },
  created() {
    this.getdata();
  },
  mounted() {},
  methods: {
    getdata() {
      api
        .get(`/scheme/recommendation/by/all?manufacturer=Airbus&section=2151`)
        .then((res) => {
          const arr = [];
          this.result = res.data.Solutions;
          const data = res.data.Solutions[0];
          this.reference = data.SolutionHeader.Reference;
          this.target = data.SolutionHeader.Target;
          this.fault = data.SolutionHeader.Fault;
          this.action = data.SolutionHeader.Action;
          this.probability = data.SolutionHeader.Probability;
          this.de = data.SolutionHeader.DE.join();
          this.solutionProbability = data.SolutionProbability;
          if (data.SolutionMEL.length) {
            this.SolutionMEL = true;
          } else {
            this.SolutionMEL = false;
          }
          this.lists = data.SolutionBody;
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
      if (data.SolutionMEL.length) {
        this.SolutionMEL = true;
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
      this.$confirm("确定要清空已选方案 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.arrs = [];
      });
    },
  },
};
</script>

<style  scoped>
</style>