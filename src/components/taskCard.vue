<template>
  <div>
    <el-dialog
      :title="`${acid}`"
      :visible.sync="dialogVisible"
      width="80%"
      :close-on-click-modal="false"
      id="taskCard"
    >
      <el-row :gutter="30">
        <!--最近维修记录-->
        <el-col :span="12" class="mb20">
          <div class="de-title">最近维修记录：DE - {{ cardDe }}</div>
          <div class="tableDetails">
            <el-row :gutter="30">
              <el-col :span="12">
                <div class="textContent"><span>日期：</span>{{ date }}</div>
              </el-col>
              <el-col :span="12">
                <div class="textContent"><span>航站：</span>{{ station }}</div>
              </el-col>
              <el-col :span="24">
                <div class="textContent">
                  <span>故障描述：</span>{{ describe }}
                </div>
              </el-col>
              <el-col :span="24">
                <div class="textContent">
                  <span>计划措施：</span>{{ plans }}
                </div>
              </el-col>
              <el-col :span="24">
                <div class="textContent">
                  <span>排故方案：</span>{{ programmes }}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!--飞行状态与计划-->
        <el-col :span="12" class="mb20" style="height: 329px">
          <div class="de-title">飞行状态与计划：{{ acid }}</div>
          <el-table
            :data="statusPlan"
            border
            :header-cell-style="{
              background: '#F2F2F2',
            }"
            max-height="280"
          >
            <el-table-column label="时间" prop="time"></el-table-column>
            <el-table-column label="航站" prop="station"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="相关维修记录">
              <template #default="row">
                <el-button @click="opendialogs(row.row)" size="mini"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <!--故障相关维修记录-->
        <el-col :span="12">
          <div class="de-title">故障相关维修记录</div>
          <el-table :data="repairData" border>
            <el-table-column label="DE" prop="de"></el-table-column>
            <el-table-column label="ATA" prop="ataClose"></el-table-column>
            <el-table-column label="日期" prop="dateAction"></el-table-column>
            <el-table-column label="航站" prop="station"></el-table-column>
            <el-table-column label="故障描述" prop="description">
              <template slot-scope="scope"
                ><div class="fonthide" v-html="scope.row.description"></div
              ></template>
            </el-table-column>
            <el-table-column label="计划措施" prop="plan">
              <template slot-scope="scope"
                ><div class="fonthide" v-html="scope.row.plan"></div
              ></template>
            </el-table-column>
            <el-table-column label="排故方案" prop="action">
              <template slot-scope="scope"
                ><div class="fonthide" v-html="scope.row.action"></div
              ></template>
            </el-table-column>
            <el-table-column label="查看详情">
              <template #default="row">
                <el-button size="mini" @click="opendialog(row.row)"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <!--历史相关维修记录-->
        <el-col :span="12">
          <div class="de-title">历史相关维修记录</div>
          <el-table :data="data" border>
            <el-table-column label="DE" prop="de"></el-table-column>
            <el-table-column label="ATA" prop="ataClose"></el-table-column>
            <el-table-column label="日期" prop="dateAction"></el-table-column>
            <el-table-column label="航站" prop="station"></el-table-column>
            <el-table-column label="故障描述" prop="description">
              <template slot-scope="scope"
                ><div class="fonthide" v-html="scope.row.description"></div
              ></template>
            </el-table-column>
            <el-table-column label="计划措施" prop="plan">
              <template slot-scope="scope"
                ><div class="fonthide" v-html="scope.row.plan"></div
              ></template>
            </el-table-column>
            <el-table-column label="排故方案" prop="action">
              <template slot-scope="scope"
                ><div class="fonthide" v-html="scope.row.action"></div
              ></template>
            </el-table-column>
            <el-table-column label="查看详情">
              <template #default="row">
                <el-button size="mini" @click="opendialog(row.row)"
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "taskCard",
  props: {
    acid: String,
    ataChater: String,
    cardDe: String,
    cardDate: String,
    station: String,
    describe: String,
    plancard: String,
    programmes: String,
    statusPlan: Array,
    data: Array,
    repairData: Array,
    date: String,
    plans: String,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    opendialog(row) {
      console.log(row);
      this.$emit("opendialog", row);
    },
    opendialogs(row) {},
    close() {
      this.dialogVisible = !this.dialogVisible;
    },
  },
};
</script>

<style  scoped>
</style>