<template>
  <div>
    <el-pagination class="mt20" background style="text-align: center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: { total: Number, pageSize: Number, currentPage: Number },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
  },
};
</script>

<style  scoped>
</style>