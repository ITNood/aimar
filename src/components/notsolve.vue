<template>
  <div>
    <div class="queryCenter border">
      <h2>未解决 | Open</h2>
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
  name: "Notsolve",
  props: { items: Array },
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