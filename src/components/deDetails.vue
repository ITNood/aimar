<template>
  <div>
    <el-dialog
      :title="`DE${de}详细信息`"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
    >
      <el-row :gutter="30" class="dialog-de">
        <el-col :span="12"><font>日期：</font>{{ date }} </el-col>
        <el-col :span="12">
          <el-row :gutter="20">
            <el-col :span="12"><font>开单ATA：</font>{{ open }}</el-col>
            <el-col :span="12"><font>关单ATA：</font>{{ close }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12"><font>航站：</font>{{ terminal }}</el-col>
        <el-col :span="12">
          <el-row :gutter="20">
            <el-col :span="12"><font>飞机编号：</font>{{ number }}</el-col>
            <el-col :span="12"><font>机型：</font>{{ model }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <font>故障描述：</font>
          <div
            style="display: inline-block"
            class="colorfont"
            v-html="fault"
          ></div>
        </el-col>
        <el-col :span="24">
          <font>计划措施：</font>
          <div
            style="display: inline-block"
            class="colorfont"
            v-html="plan"
          ></div>
        </el-col>
        <el-col :span="24">
          <font>排故方案：</font>
          <div
            style="display: inline-block"
            class="colorfont"
            v-html="programme"
          ></div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "deDatails",
  props: {
    de: String,
    date: String,
    open: Number,
    close: Number,
    terminal: String,
    number: String,
    model: String,
    fault: String,
    plan: String,
    programme: String,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    closeDialog() {
      this.dialogVisible = !this.dialogVisible;
    },
  },
};
</script>

<style  scoped>
</style>