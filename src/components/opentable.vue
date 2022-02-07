<template>
  <div>
    <el-dialog :title="title" :visible.sync="show" width="40%" :close-on-click-modal="false">
      <el-table :data="data" border>
        <el-table-column property="type" label="类别" width="150"></el-table-column>
        <el-table-column property="name" label="件名" width="200"></el-table-column>
        <el-table-column property="pieceNumber" label="件号"></el-table-column>
        <el-table-column property="number" label="数量"></el-table-column>
        <el-table-column property="stock" label="库存"></el-table-column>
        <el-table-column property="otherStock" label="其他航站库存"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "opentable",
  props: { data: Array, title: String },
  data() {
    return {
      show: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    closetable() {
      this.show = !this.show;
    },
  },
};
</script>

<style  scoped>
</style>