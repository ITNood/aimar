<template>
  <div>
    <el-dialog title="预览" :visible.sync="isshowPfd" width="40%" id="previewpdf">
      <el-button class="el-icon-download downloading" size="medium">&nbsp;下载</el-button>
      <div class="preview">
        <img v-for="(item, index) in img" :key="index" :src="item.img" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "pdf",
  props: { img: Array },
  data() {
    return {
      isshowPfd: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    preview() {
      this.isshowPfd = !this.isshowPfd;
    },
  },
};
</script>

<style  scoped>
</style>