<template>
  <div>
    <p>
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "人生十点需牢记：1知人不必言尽，留些口德；2责人不必苛尽，留些肚量；3才能不必傲尽，留些内涵；4锋芒不必露尽，留些深敛；5有功不必邀尽，留些谦让；6得理不必争尽，留些宽容；7得宠不必恃尽，留些后路；8气势不必倚尽，留些厚道；9富贵不必享尽，留些福泽；10凡事不必做尽，留些余德。。",
    };
  },
  created() {
    this.test();
  },
  mounted() {},
  methods: {
    test() {
      const data = ["口德", "肚量", "内涵"];
      data.forEach((item) => {
        console.log(item);
        this.text.replace(item, `<span style="color:red">${item}</span>`);
      });
    },
  },
};
</script>

<style  scoped>
.adKeyword {
  color: #ff0000;
}
</style>