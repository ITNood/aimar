<template>
  <div>
    <el-row class="scheme">
      <el-col :md="5" :lg="5" :xl="4">
        <div class="entryFault">
          <h2>筛选部件</h2>
          <div class="faultInformation">
            <ul class="component">
              <li>
                <h5>飞机编号</h5>
                <div class="tagBorder">
                  <el-tag :key="tag" v-for="tag in ariNumber" closable :disable-transitions="false" @close="handleClose(tag)">
                    {{ tag }}
                  </el-tag>
                  <el-input class="input-new-tag" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" :fetch-suggestions="querySearch" @select="handleInputConfirm">
                  </el-input>
                </div>
              </li>
              <li>
                <h5>部件名</h5>
                <div class="tagBorder">
                  <el-tag :key="tag" v-for="tag in names" closable :disable-transitions="false" @close="handleClose1(tag)">
                    {{ tag }}
                  </el-tag>
                  <el-input class="input-new-tag" v-model="inputValue1" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm1" :fetch-suggestions="querySearch1" @select="handleInputConfirm1">
                  </el-input>
                </div>
              </li>
              <li>
                <h5>部件号（PN）</h5>
                <div class="tagBorder">
                  <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose2(tag)">
                    {{ tag }}
                  </el-tag>
                  <el-autocomplete class="input-new-tag" v-model="inputValue2" ref="saveTagInput" size="small" style="width: 150px !important" @keyup.enter.native="handleInputConfirm2" :fetch-suggestions="querySearch2" @select="handleInputConfirm2">
                  </el-autocomplete>
                </div>
              </li>
              <li>
                <el-checkbox v-model="checkbox1" class="componentbox">
                  仅查询当前在机部件
                </el-checkbox>
              </li>
              <li>
                <el-checkbox v-model="checkbox2" class="componentbox">
                  仅查询主件
                </el-checkbox>
              </li>
            </ul>
            <el-button class="el-icon-search searchbtn mt20" @click="screen">
              &nbsp;&nbsp;筛选
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :md="14" :lg="14" :xl="15">
        <div class="selectedsProgramme">
          <h2>选择更换部件</h2>
          <div class="programme">
            <el-radio-group v-model="radio" @change="changePn">
              <el-radio-button :label="index" v-for="(item, index) in pns" :key="index">PN # {{ item }}</el-radio-button>
            </el-radio-group>
            <el-row class="border">
              <el-col :span="12">
                <div class="programmeDetails">
                  <h4>部件基本信息</h4>
                  <div class="news">
                    <el-row :gutter="20">
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN#：</p>
                        <p :title="pn">{{ pn }}</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN是否在机({{ pn }}})：</p>
                        <p>{{ isonline }}</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>部件名称：</p>
                        <p :title="pnName">{{ pnName }}</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>可替换PN：</p>
                        <p :title="replacePn">{{ replacePn }}</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN平均在机时间：</p>
                        <p>{{ onlineDate }} 天</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN平均在机时间({{ pn }})：</p>
                        <p>{{ averageDate }} 天</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN故障概率：</p>
                        <p>{{ percent }}%</p>
                      </el-col>
                      <el-col :md="24" :lg="24" :xl="12">
                        <p>PN更换排故概率：</p>
                        <p>{{ replacePercent }}%</p>
                      </el-col>
                    </el-row>
                  </div>
                  <el-table border :data="tableData" class="mt20" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="SN" prop="sn"></el-table-column>
                    <el-table-column label="在机时长" prop="onlineDays">
                      <template #default="row">{{ row.row.onlineDays }}天</template>
                    </el-table-column>
                    <el-table-column label="历史更换次数" prop="historyChangeCount">
                    </el-table-column>
                    <el-table-column label="流转信息">
                      <template #default="row">
                        <el-button size="mini" @click="lookUp(row)">
                          查看
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="proprammeRight">
                  <div class="programmeImg">
                    <h3>部件流转信息展示 <span>beta</span></h3>
                    <!-- <img src="../static/image/img.png" /> -->
                    <div class="pntitle">
                      <strong>PN#:</strong>{{ pn }}&nbsp;&nbsp;<strong>SN#:</strong>{{ sn }}
                    </div>
                    <el-table :data="data" border class="mt20">
                      <el-table-column label="更换时间" prop="changeOnDateTime,changeOffDateTime" min-width="140">
                        <template slot-scope="scope">
                          <p class="fonthide">
                            {{ scope.row.changeOnDateTime }}
                          </p>
                          <p class="fonthide">
                            {{ scope.row.changeOffDateTime }}
                          </p>
                        </template>
                      </el-table-column>
                      <el-table-column label="在机时长" prop="time">
                        <template slot-scope="scope">
                          {{ scope.row.onlineDays }}
                        </template>
                      </el-table-column>
                      <el-table-column label="拆下" prop="acOff" width="70"></el-table-column>
                      <el-table-column label="装上" prop="acOn" width="70"></el-table-column>
                      <el-table-column label="CC/MR记录">
                        <template slot-scope="scope">
                          <el-button size="mini" @click="record(scope.row)">
                            查看
                          </el-button>
                        </template>
                      </el-table-column>
                      <el-table-column label="DE记录">
                        <template slot-scope="scope">
                          <el-button size="mini" @click="DErecord(scope.row)">
                            查看
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :md="5" :lg="5" :xl="5">
        <div class="selecteds">
          <h2>已选择更换部件</h2>
          <div class="selectedComponent">
            <ul>
              <li v-for="(item, index) in items" :key="index">
                <p>
                  PN# {{ item.pn
                  }}<i class="el-icon-close" @click="delData(index)"></i><i class="el-icon-edit"></i>
                </p>
                <p>SN# {{ item.sn }}</p>
              </li>
            </ul>
            <el-checkbox v-model="checked1" class="check mt20">
              自动补充辅助件
            </el-checkbox>
            <el-checkbox v-model="checked2" class="check">
              自动填写部件数量
            </el-checkbox>
            <el-checkbox v-model="checked3" class="check">
              同时建议可替换件
            </el-checkbox>
            <el-button class="icon iconfont icon-download download">
              &nbsp;&nbsp;自动生成CC单
            </el-button>
            <el-button class="icon iconfont icon-download download">
              &nbsp;&nbsp;自动生成MR单
            </el-button>
            <el-button class="icon iconfont icon-download download">
              &nbsp;&nbsp;领料报告下载
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <de-details :de="de" :date="date" :open="open" :close="closed" :terminal="terminal" :number="number" :model="model" :fault="faults" :plan="plan" :programme="programme" @closedDialog="closedDialog" ref="child" />
  </div>
</template>

<script>
import api from '../API/index';
import deDetails from '../components/deDetails.vue';
export default {
  components: { deDetails },
  data() {
    return {
      sn: '',
      ariNumber: [],
      names: [],
      radio: '0',
      dynamicTags: [],
      inputValue: '',
      inputValue1: '',
      inputValue2: '',
      restaurants: [],
      restaurants2: [],
      restaurants1: [],
      checkbox1: false,
      checkbox2: false,
      tableData: [],
      data: [],
      items: [],
      checked1: false,
      checked2: false,
      checked3: false,
      pns: [],
      pn: '',
      replacePercent: '',
      percent: '',
      averageDate: '',
      onlineDate: '',
      replacePn: '',
      pnName: '',
      isonline: '',
      multipleSelection: [],
      getPn: '',
      result: [],
      //DE详情
      de: '',
      date: '',
      open: 0,
      closed: 0,
      terminal: '',
      number: '',
      model: '',
      faults: '',
      plan: '',
      programme: '',
      chatnumber: '',
    };
  },
  created() {},
  mounted() {
    this.restaurants2 = this.loadAll();
  },
  methods: {
    //CC/MR记录
    record(row) {
      console.log(row);
    },
    //DE记录
    DErecord(row) {
      this.closedDialog();
      const de = row.de[0];
      api
        .get(`/DeRecord/by/id/${de}`)
        .then((res) => {
          console.log(res);
          this.date = res.data.dateAction;
          this.open = res.data.ataOpen;
          this.closed = res.data.ataClose;
          this.terminal = res.data.station;
          this.number = res.data.acId;
          this.model = res.data.acType;
          this.faults = res.data.description;
          this.plan = res.data.plannedAction;
          this.programme = res.data.action;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
    closedDialog() {
      this.$refs.child.closeDialog();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      const arr = this.multipleSelection.map((item) => {
        return { pn: this.pn, sn: item.sn };
      });
      this.items = arr;
    },
    delData(index) {
      const sn = this.items[index].sn;
      const list = [...this.items];
      list.splice(index, 1);
      this.items = [...list];
      const data = this.tableData.filter((item) => item.sn == sn);
      this.$refs.multipleTable.toggleRowSelection(data[0], false);
    },
    changePn(val) {
      const data = this.result[val];
      this.pn = data.pn;
      this.onlineDate = data.onlineDayTotal;
      this.averageDate = data.averageOnlineDays;
      this.percent = data.oyfp;
      if (data.pnNames) {
        this.pnName = data.pnNames.join();
      }
      if (data.replacePn) {
        this.replacePn = data.replacePn.join();
      } else {
        this.replacePn = '';
      }
      if (data.pnOnline == true) {
        this.isonline = '是';
      } else {
        this.isonline = '否';
      }
      this.tableData = data.snList;
      this.data = data.snList[0].snChangeDetail;
      this.sn = data.snList[0].sn;
    },
    screen() {
      const data = {
        acId: this.ariNumber.join(),
        onlyMainComponents: this.checkbox1,
        onlyOnline: this.checkbox2,
        pnCodes: this.dynamicTags,
        pnNames: this.names,
      };
      api
        .post('/ccDeInfo/merged/de', data)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            this.result = res.data;
            this.pns = [...res.data].map((item) => {
              return item.pn;
            });
            let data = res.data[0];
            this.pn = data.pn;
            // this.replacePercent = data.oyfp;
            this.onlineDate = data.onlineDayTotal;
            this.averageDate = data.averageOnlineDays;
            this.percent = data.oyfp;
            if (data.pnNames) {
              this.pnName = data.pnNames.join();
            }
            if (data.replacePn) {
              this.replacePn = data.replacePn.join();
            } else {
              this.replacePn = '';
            }
            if (data.pnOnline == true) {
              this.isonline = '是';
            } else {
              this.isonline = '否';
            }
            this.tableData = data.snList;
            this.data = data.snList[0].snChangeDetail;
            this.sn = data.snList[0].sn;
          } else {
            this.result = [];
            this.pn = '';
            // this.replacePercent = data.oyfp;
            this.onlineDate = '';
            this.averageDate = '';
            this.percent = '';
            this.pnName = '';
            this.replacePn = '';
            this.isonline = '';
            this.tableData = '';
            this.data = [];
            this.sn = '';
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },

    lookUp(row) {
      this.data = row.row.snChangeDetail;
      this.sn = row.row.sn;
    },
    handleClose(tag) {
      this.ariNumber.splice(this.ariNumber.indexOf(tag), 1);
    },
    handleClose1(tag) {
      this.names.splice(this.names.indexOf(tag), 1);
    },
    handleClose2(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.ariNumber.push(inputValue);
      }
      this.inputValue = '';
    },
    handleInputConfirm1() {
      let inputValue = this.inputValue1;
      if (inputValue) {
        this.names.push(inputValue);
      }
      this.inputValue1 = '';
    },
    handleInputConfirm2() {
      let inputValue = this.inputValue2;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        this.dynamicTags = [...new Set(this.dynamicTags)];
      }
      this.inputValue2 = '';
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch1(queryString, cb) {
      var restaurants = this.restaurants1;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch2(queryString, cb) {
      var restaurants = this.restaurants2;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: '109-9554304' },
        {
          value: '1-11-3802',
        },
        {
          value: '30-0000A3031',
        },
        { value: '542-6242511' },
        {
          value: '102-8787-226',
        },
        { value: '10-20-101471' },
        {
          value: '1MNA143H',
        },
        {
          value: 'AA10-27991-3604',
        },
        {
          value: '100-4045-228',
        },
        {
          value: '8-3911063',
        },
        {
          value: '500-5726-297',
        },
        {
          value: '1-0577163',
        },
      ];
    },
  },
};
</script>

<style  scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>