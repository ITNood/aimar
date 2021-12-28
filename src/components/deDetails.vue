<template>
  <div>
    <el-dialog
      :title="`DE${de}详细信息`"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
    >
      <el-row :gutter="30" class="dialog-de">
        <el-col :span="12"><span>日期：</span>{{ date }} </el-col>
        <el-col :span="12">
          <el-row :gutter="20">
            <el-col :span="12"><span>开单ATA：</span>{{ open }}</el-col>
            <el-col :span="12"><span>关单ATA：</span>{{ close }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12"><span>航站：</span>{{ terminal }}</el-col>
        <el-col :span="12">
          <el-row :gutter="20">
            <el-col :span="12"><span>飞机编号：</span>{{ number }}</el-col>
            <el-col :span="12"><span>机型：</span>{{ model }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <span>故障描述：</span>
          <div style="display: inline-block">{{ fault }}</div>
        </el-col>
        <el-col :span="24">
          <span>计划措施：</span>
          <div style="display: inline-block">{{ plan }}</div>
        </el-col>
        <el-col :span="24">
          <span>排故方案：</span>
          <div style="display: inline-block">{{ programme }}</div>
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