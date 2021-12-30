<template>
  <div>
    <div class="queryCenter border">
      <h2>监控中 | Monitor</h2>
      <div class="monitor">
        <ul>
          <li
            v-for="(item, index) in items"
            :key="index"
            @click="openData(item.de)"
          >
            {{ item.de }} | {{ item.ataChater }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { items: Array },
  name: "monitor",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    openData(de) {
      this.$emit("openData", de);
    },
  },
};
</script>

<style  scoped>
</style>