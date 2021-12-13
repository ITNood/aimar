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
            <el-radio-group v-model="radio">
              <el-radio-button label="1">方案 # 12345678 (94%)</el-radio-button>
              <el-radio-button label="2">方案 # 23456789 (89%)</el-radio-button>
              <el-radio-button label="3">方案 # 34567890 (78%)</el-radio-button>
              <el-radio-button label="4">方案 # 45678901 (76%)</el-radio-button>
              <el-radio-button label="5">方案 # 56789012 (72%)</el-radio-button>
            </el-radio-group>
            <el-row class="border">
              <el-col :span="12">
                <div class="programmeDetails">
                  <ul>
                    <li>依据 <span>AMM 34-45-01</span></li>
                    <li>
                      针对 <span>XXXX</span> 出现 <span>YYYYYY</span> 故障 ；
                    </li>
                    <li>
                      <p>
                        执行 <span>ZZZ</span> 操作，执行
                        <span>ZZZXX</span> 操作；
                      </p>
                      <p>【故障排除概率： <span>72 %</span>】</p>
                      <p>（参照 DE # <span>987654,321098</span> ）</p>
                      <div class="other">
                        <h5>-若故障仍未解除：</h5>
                        <p>执行 <span>ZZXX</span> 操作；</p>
                        <p>【故障排除概率：<span> 32 %</span>】</p>
                        <p>（参照 DE # <span>987654</span>）</p>
                      </div>

                      <div class="other">
                        <h5>-若故障仍未解除：</h5>
                        <p>执行 <span>ZZXX</span> 操作；</p>
                        <p>【故障排除概率：<span> 69 %</span>】</p>
                        <p>（参照 DE # <span>987654</span>）</p>
                      </div>

                      <div class="other">
                        <h5>-若故障仍未解除：</h5>
                        <p>依据 <span>MEL 34-45-02</span> ；</p>
                        <p>执行 <span>保留、监控</span>；</p>
                        <p>（参照 DE # <span>987654</span>）</p>
                      </div>
                    </li>
                    <li>【综合排故概率： <span>94 %</span>】</li>
                    <div class="btncenter">
                      <el-button class="el-icon-check"
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
          <div class="programmeDetails">
            <h1 class="clear">
              方案 # 12345678 <i class="el-icon-close"></i
              ><i class="el-icon-edit"></i>
            </h1>
            <ul>
              <li>依据 <span>AMM 34-45-01</span></li>
              <li>针对 <span>XXXX</span> 出现 <span>YYYYYY</span> 故障 ；</li>
              <li>
                <p>
                  执行 <span>ZZZ</span> 操作，执行 <span>ZZZXX</span> 操作；
                </p>
                <p>【故障排除概率： <span>72 %</span>】</p>
                <p>（参照 DE # <span>987654,321098</span> ）</p>
                <div class="other">
                  <h5>-若故障仍未解除：</h5>
                  <p>执行 <span>ZZXX</span> 操作；</p>
                  <p>【故障排除概率：<span> 32 %</span>】</p>
                  <p>（参照 DE # <span>987654</span>）</p>
                </div>

                <div class="other">
                  <h5>-若故障仍未解除：</h5>
                  <p>执行 <span>ZZXX</span> 操作；</p>
                  <p>【故障排除概率：<span> 69 %</span>】</p>
                  <p>（参照 DE # <span>987654</span>）</p>
                </div>

                <div class="other">
                  <h5>-若故障仍未解除：</h5>
                  <p>依据 <span>MEL 34-45-02</span> ；</p>
                  <p>执行 <span>保留、监控</span>；</p>
                  <p>（参照 DE # <span>987654</span>）</p>
                </div>
              </li>
              <li>【综合排故概率： <span>94 %</span>】</li>
              <div class="mt20 submitBtn">
                <el-button class="el-icon-delete btn empty"
                  >&nbsp;&nbsp;清空</el-button
                >
                <el-button class="el-icon-check btn submit"
                  >&nbsp;&nbsp;确认</el-button
                >
              </div>
            </ul>
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
      items: [
        { name: "故障描述", text: "ABCDEFGHIGKLMNOPQRSTUVWXYZ" },
        {
          name: "关键词组",
          text: "自动抽取: ABCD , EFGH , XYZ 手动输入: ACEG , ZYX",
        },
      ],
      radio: "1",
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
</style>