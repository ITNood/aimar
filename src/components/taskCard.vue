<template>
  <div>
    <el-dialog
      :title="`${acid} | ${ataChater}`"
      :visible.sync="dialogVisible"
      width="80%"
      :close-on-click-modal="false"
      id="taskCard"
    >
      <el-row :gutter="30">
        <!--最近维修记录-->
        <el-col :span="12" class="mb20">
          <div class="de-title">最近维修记录：DE - 123456</div>
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
                <div class="textContent"><span>计划措施：</span>{{ plan }}</div>
              </el-col>
              <el-col :span="24">
                <div class="textContent">
                  <span>排故方案：</span>{{ programme }}
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
            <el-table-column label="时间" prop="date"></el-table-column>
            <el-table-column label="航站" prop="station"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="相关维修记录">
              <template #default="row">
                <el-button @click="opendialog(row.row)" size="mini"
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
            <el-table-column label="ATA" prop="ata"></el-table-column>
            <el-table-column label="日期" prop="date"></el-table-column>
            <el-table-column label="航站" prop="station"></el-table-column>
            <el-table-column label="故障描述" prop="describe"></el-table-column>
            <el-table-column label="计划措施" prop="plan"></el-table-column>
            <el-table-column
              label="排故方案"
              prop="programme"
            ></el-table-column>
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
            <el-table-column label="ATA" prop="ata"></el-table-column>
            <el-table-column label="日期" prop="date"></el-table-column>
            <el-table-column label="航站" prop="station"></el-table-column>
            <el-table-column label="故障描述" prop="describe"></el-table-column>
            <el-table-column label="计划措施" prop="plan"></el-table-column>
            <el-table-column
              label="排故方案"
              prop="programme"
            ></el-table-column>
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
  data() {
    return {
      dialogVisible: false,
      acid: "B-4154",
      ataChater: "14564",
      date: "2021-12-29 12:00",
      station: "T3",
      describe: "就卡了很嗲事发地哦杀父i第三方接口的算法",
      plan: "就卡了很嗲事发地哦杀父i第三方接口的算法",
      programme: "就卡了很嗲事发地哦杀父i第三方接口的算法",
      statusPlan: [
        { date: "2021-12-29 00:00", station: "SHDSH", status: "航后" },
        { date: "2021-12-29 00:00", station: "SHDSH", status: "航后" },
        { date: "2021-12-29 00:00", station: "SHDSH", status: "航后" },
      ],
      repairData: [
        {
          de: "52656",
          ata: "49849",
          date: "2021-12-29",
          station: "SAS",
          describe: "扩大是否哈桑",
          plan: "i到手的覅",
          programme: "街道荷花",
        },
        {
          de: "52656",
          ata: "49849",
          date: "2021-12-29",
          station: "SAS",
          describe: "扩大是否哈桑",
          plan: "i到手的覅",
          programme: "街道荷花",
        },
        {
          de: "52656",
          ata: "49849",
          date: "2021-12-29",
          station: "SAS",
          describe: "扩大是否哈桑",
          plan: "i到手的覅",
          programme: "街道荷花",
        },
      ],
      data: [
        {
          de: "52656",
          ata: "49849",
          date: "2021-12-29",
          station: "SAS",
          describe: "扩大是否哈桑",
          plan: "i到手的覅",
          programme: "街道荷花",
        },
        {
          de: "52656",
          ata: "49849",
          date: "2021-12-29",
          station: "SAS",
          describe: "扩大是否哈桑",
          plan: "i到手的覅",
          programme: "街道荷花",
        },
        {
          de: "52656",
          ata: "49849",
          date: "2021-12-29",
          station: "SAS",
          describe: "扩大是否哈桑",
          plan: "i到手的覅",
          programme: "街道荷花",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    opendialog(row) {
      console.log(row);
      this.$emit("opendialog", row);
    },
    close() {
      this.dialogVisible = !this.dialogVisible;
    },
  },
};
</script>

<style  scoped>
</style>