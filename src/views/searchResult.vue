<template>
  <div>
    <div class="conditionSummary">
      <div class="summaryTilte">
        <h4>筛选条件汇总</h4>
      </div>
      <el-row :gutter="40" class="conditionSummaryList">
        <el-col
          :md="8"
          :lg="6"
          :xl="4"
          v-for="(item, index) in items"
          :key="index"
        >
          <h5>
            {{ item.title }}
            <i class="el-icon-close"></i><i class="el-icon-edit"></i>
          </h5>
          <p>{{ item.text }}</p>
        </el-col>
      </el-row>
    </div>
    <div class="mt20 mb20">
      <el-button class="el-icon-refresh refreshResult" @click="refresh"
        >&nbsp;&nbsp;刷新检索结果</el-button
      >
      <el-button class="el-icon-plus addCondition" @click="addCondition"
        >&nbsp;&nbsp;添加筛选条件</el-button
      >
    </div>
    <div class="resultTable clear">
      <h4>筛选结果汇总</h4>
      <el-row :gutter="40" style="padding: 20px">
        <el-col :md="8" :lg="6" :xl="4">
          <ul class="dataList">
            <li>
              <h3>
                总条数:<span>{{ total }}</span>
              </h3>
            </li>
            <li>
              <h3>
                已选中:<span>{{ checkedNumber }}</span>
              </h3>
            </li>
            <li>
              <h3>ATA章节：</h3>
              <p>-{{ startChapter }}</p>
              <p>-{{ endChapter }}</p>
            </li>
            <li>
              <h3>ATA次章节：</h3>
              <p>-{{ startChapter }}</p>
              <p>-{{ endChapter }}</p>
              <p>-{{ listChapter }}</p>
            </li>
          </ul>
        </el-col>
        <el-col :md="16" :lg="18" :xl="20">
          <div class="clear">
            <el-radio-group v-model="radio" class="selectradio">
              <el-radio :label="3"> 按综合相似度排序</el-radio>
              <el-radio :label="6"> 按描述相似度排序</el-radio>
              <el-radio :label="9"> 按时间排序</el-radio>
            </el-radio-group>
            <el-checkbox v-model="checked" class="selectcheckbox">
              仅查看相关ATA</el-checkbox
            >
          </div>
          <el-table
            :data="tableData"
            border
            @selection-change="handleSelectionChange"
            :header-cell-style="{
              background: '#012A4A',
              color: '#fff',
              fontWeight: 'normal',
            }"
            max-height="500"
            class="mt20"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="DE号"></el-table-column>
            <el-table-column prop="start" label="开单ATA"></el-table-column>
            <el-table-column prop="end" label="关单ATA"></el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="text" label="故障描述"></el-table-column>
            <el-table-column prop="plan" label="计划措施"></el-table-column>
            <el-table-column prop="measures" label="排故措施"></el-table-column>
            <el-table-column label="查看 DE 详情" #default="row">
              <el-button size="small" @click="lookDe(row)">查看DE</el-button>
            </el-table-column>
            <el-table-column label="查看相关 CC 单" #default="row">
              <el-button size="small" @click="lookDe(row)">查看CC</el-button>
            </el-table-column>
            <el-table-column label="查看相关 MR 单" #default="row">
              <el-button size="small" @click="lookDe(row)">查看MR</el-button>
            </el-table-column>
          </el-table>
          <pagination
            :total="totalPage"
            :pageSize="pageSize"
            :currentPage="currentPage"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
          />
        </el-col>
      </el-row>
      <div class="mt20 mb20" style="padding-right: 20px; float: right">
        <el-button class="el-icon-check refreshResult"
          >&nbsp;&nbsp;推荐排故方案</el-button
        >
        <el-button class="el-icon-back addCondition"
          >&nbsp;&nbsp;返回查询页面</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "故障描述", text: "ABCDEFGHIGKLMNOPQRSTUVWXYZ" },
        {
          title: "关键词组",
          text: "自动抽取: ABCD , EFGH , XYZ 手动输入: ACEG , ZYX",
        },
        { title: "故障描述", text: "ABCDEFGHIGKLMNOPQRSTUVWXYZ" },
        {
          title: "关键词组",
          text: "自动抽取: ABCD , EFGH , XYZ 手动输入: ACEG , ZYX",
        },
        { title: "故障描述", text: "ABCDEFGHIGKLMNOPQRSTUVWXYZ" },
      ],
      total: 10,
      checkedNumber: 0,
      startChapter: "12:飞机维修",
      endChapter: "16:维修结果",
      listChapter: "36:就殴打Jodi",
      radio: 3,
      checked: false,
      tableData: [
        {
          id: 2641654,
          start: 5454,
          end: 8548,
          date: "2021-12-13",
          text: "dadgasgas",
          plan: "deadagasg",
          measures: "dasgasgsagdgas",
        },
      ],
      multipleSelection: [],
      totalPage: 100,
      pageSize: 10,
      currentPage: 1,
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //刷新
    refresh() {},
    //添加条件
    addCondition() {},
    lookDe(row) {
      console.log(row.row);
    },
    //table checkedbox
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style  scoped>
</style>