<template>
  <div>
    <div class="queryCenter border">
      <h2>消息中心 | Notifications</h2>
      <div class="newslist">
        <el-row :gutter="20">
          <el-col :span="12">
            <div style="height: 602px; border-right: 1px solid #f2f2f2">
              <div class="newstitle">维修通知</div>
              <ul class="newscenterlist">
                <li v-for="(item, index) in news" :key="index">
                  <router-link
                    to=""
                    :style="{ color: item.read == 1 ? '#666' : '' }"
                  >
                    <i
                      :style="{
                        'background-color':
                          item.warning == 1
                            ? 'red'
                            : item.warning == 2
                            ? '#F59A23'
                            : '#03BF16',
                      }"
                    ></i>
                    <span>{{ item.read == 1 ? "[已读]" : "[未读]" }}</span>
                    <p>{{ item.text }}</p>
                  </router-link>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="tips">
              <div class="newstitle">监控提醒</div>
              <div class="tipslist">
                <router-link
                  to=""
                  v-for="(item, index) in tips"
                  :key="index"
                  :style="{ color: item.read == 1 ? '#666' : '' }"
                >
                  <span>{{ item.read == 1 ? "[已读]" : "[未读]" }}</span>
                  <p>{{ item.text }}</p>
                </router-link>
              </div>
            </div>
            <div class="emaillist">
              <div class="newstitle">站内信</div>
              <div class="tipslist">
                <router-link
                  to=""
                  v-for="(item, index) in tips"
                  :key="index"
                  :style="{ color: item.read == 1 ? '#666' : '' }"
                >
                  <span>{{ item.read == 1 ? "[已读]" : "[未读]" }}</span>
                  <p>{{ item.text }}</p>
                </router-link>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  name: "NewCenter",
  data() {
    return {
      news: [
        {
          id: 1,
          read: 0,
          warning: 1,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 0,
          warning: 2,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 1,
          warning: 3,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 0,
          warning: 1,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 0,
          warning: 2,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 1,
          warning: 3,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 0,
          warning: 1,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 0,
          warning: 2,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 1,
          warning: 3,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 1,
          warning: 3,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 0,
          warning: 1,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 0,
          warning: 2,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 1,
          warning: 3,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 1,
          warning: 3,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 0,
          warning: 1,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 0,
          warning: 2,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 1,
          warning: 3,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
      ],
      tips: [
        {
          id: 1,
          read: 0,
          warning: 1,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 0,
          warning: 2,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
        {
          id: 1,
          read: 1,
          warning: 3,
          text: "的考点金佛爱舒服就好安多佛卡就发扫i",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
</style>