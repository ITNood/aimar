<template>
  <div>
    <el-dialog :title="headName" :visible.sync="show" width="50%" :close-on-click-modal="false">
      <el-row :gutter="20">
        <el-col :span="12" class="border-right">
          <div class="border pd20 contenttext">
            <p><span>适用机型：</span>{{ type }}</p>
            <p><span>最后更新：</span>{{ updateDate }}</p>
            <p><span>手册类型：</span>{{ manual }}</p>
            <p><span>手册章节：</span>{{ chapter }}</p>
            <p><span>关键词：</span>{{ keyword }}</p>
            <p><span>相关部件：</span>{{ part }}</p>
          </div>
          <div class="mt20 border pd20 contenttext">
            <h5>Notes:</h5>
            <div class="mt20 notes">
              <h6>Page&nbsp;{{ page }};&nbsp;Section&nbsp;{{ section }}</h6>
              <P>{{ notestext }}</P>
            </div>
            <div class="mt20 notes">
              <h6>Page&nbsp;{{ page }};&nbsp;Section&nbsp;{{ section }}</h6>
              <P>{{ notestext }}</P>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <flipPage ref="thePage" :data="data" :width="pWidth" :height="pHeight" @tap="tapPage" @change="currentPage"></flipPage>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import flipPage from 'vue-flip-page';
export default {
  components: { flipPage },
  name: 'Basis',
  props: {
    headName: String,
    type: String,
    updateDate: String,
    manual: String,
    chapter: String,
    keyword: String,
    part: String,
    page: String,
    section: String,
    notestext: String,
    data: Array,
  },
  data() {
    return {
      show: false,
      pWidth: 500,
      pHeight: 600,
      currentIndex: 0,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    closeBasis() {
      this.show = !this.show;
    },
    tapPage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = 0;
      }
      this.$refs['thePage'].toPage(this.currentIndex);
    },
    //当前页数
    currentPage(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
</style>