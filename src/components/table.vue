<template>
  <div>
    <el-table :data="data" border>
      <el-table-column v-for="(item, index) in items" :key="index" :prop="item.prop" :label="item.name">
        <template #default="row">{{ row.row[item.prop] }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: { items: Array },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
</style>