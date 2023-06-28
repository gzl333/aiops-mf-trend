<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  getNowFormatTime,
  payRecordUtcToBeijingMinuteDetail
} from '../../../hooks/processTime'
import { navigateToUrl } from 'single-spa'
// 时间选择器 数据与方法
const currentDate = getNowFormatTime(1)
const date = new Date()
date.setHours(date.getHours(), date.getMinutes() - date.getTimezoneOffset())
date.setMonth(date.getMonth())
const date2 = new Date()
date2.setDate(date2.getDate() - 1)
const startDate = payRecordUtcToBeijingMinuteDetail(date2.toISOString())
const dateFrom = ref(startDate)
const dateTo = ref(currentDate)
console.log('dateFrom', dateFrom)
const weblist = reactive([
  {
    name: 'www.baidu.com',
    value: 137999999,
    color: 'text-aiops-negative',
    rank: '1'
  },
  {
    name: 'bao.ac.cn',
    value: 100987,
    color: 'text-aiops-secondary',
    rank: '2'
  },
  {
    name: 'www.cstcloud.com',
    value: 82447,
    color: 'text-aiops-btn-border',
    rank: '3'
  },
  {
    name: 'www.aiops.com',
    value: 70408,
    rank: '4'
  },
  {
    name: 'www.rca.com',
    value: 60476,
    rank: 5
  },
  {
    name: 'www.rca2.com',
    value: 40625,
    rank: 6
  },
  {
    name: 'www.rca2.com',
    value: 40625,
    rank: 7
  },
  {
    name: 'www.rca2.com',
    value: 40625,
    rank: 8
  },
  {
    name: 'www.rca2.com',
    value: 40625,
    rank: 9
  },
  {
    name: 'www.rca2.com',
    value: 40625,
    rank: 10
  }
])
const userTopList = reactive([
  {
    name: 'zhjiang@cnic.cn',
    value: 1999,
    color: 'text-aiops-negative',
    rank: '1'
  },
  {
    name: 'lbg@cnic.cn',
    value: 1387,
    color: 'text-aiops-secondary',
    rank: '2'
  },
  {
    name: 'zg@cnic.cn',
    value: 447,
    color: 'text-aiops-btn-border',
    rank: '3'
  },
  {
    name: 'hai@cnic.cn',
    value: 408,
    rank: '4'
  },
  {
    name: 'ming@cnic.cn',
    value: 376,
    rank: 5
  },
  {
    name: 'luo@cnic.cn',
    value: 325,
    rank: 6
  },
  {
    name: 'xue@cnic.cn',
    value: 225,
    rank: 7
  },
  {
    name: 'xie@cnic.cn',
    value: 225,
    rank: 8
  },
  {
    name: 'li@cnic.cn',
    value: 224,
    rank: 9
  },
  {
    name: 'lijhui@cnic.cn',
    value: 215,
    rank: 10
  }
])
const activeItem = ref('check')
const changeTab = async (name: string) => {
  activeItem.value = name
  navigateToUrl(`/my/trend/dns/list/${name}`)
}
const dates = ref<string[]>([])
function getDayAll (starDay: Date, endDay: Date) {
  const arr = []
  // 设置两个日期UTC时间
  const db = new Date(starDay)
  const de = new Date(endDay)
  // 获取两个日期GTM时间
  const s = db.getTime() - 24 * 60 * 60 * 1000
  const d = de.getTime() - 24 * 60 * 60 * 1000
  // 获取到两个日期之间的每一天的毫秒数
  for (const i = ref<number>(s); i.value <= d;) {
    i.value = i.value + 60 * 1000
    arr.push(parseInt(i.value.toString()))
  }
  // 获取每一天的时间  YY-MM-DD
  for (const j in arr) {
    const time = new Date(arr[j])
    const year = time.getFullYear()
    const mouth = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1))
    const day = time.getDate() >= 10 ? time.getDate() : ('0' + time.getDate())
    const hour = time.getHours() >= 10 ? time.getHours() : ('0' + time.getHours())
    const minutes = time.getMinutes() >= 10 ? time.getMinutes() : ('0' + time.getMinutes())
    const YYMMDD = year + '-' + mouth + '-' + day + ' ' + hour + ':' + minutes
    dates.value.push(YYMMDD)
  }
  console.log('datesArray', dates)
  return dates
}
onMounted(async () => {
  await getDayAll(new Date(dateFrom.value), new Date(dateTo.value))
})
import checkData from '../CurrentList/CheckData.vue'
</script>

<template>
  <div class="DnsList">
    <div class=" row justify-start">
      <div class="col-2">
        <q-input filled dense v-model="dateFrom" >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date minimal v-model="dateFrom"  mask="YYYY-MM-DD HH:mm" >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="确定" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="dateFrom" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="确定" color="primary" flat/>
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="text-center q-mx-md q-pt-md">至</div>
      <div class="col-2 q-mr-md">
        <q-input filled dense v-model="dateTo" >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date minimal v-model="dateTo" @update:model-value="selectDate"  mask="YYYY-MM-DD HH:mm" >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="确定" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="dateTo" mask="YYYY-MM-DD HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="确定" color="primary" flat/>
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-6 text-grey-6 q-mt-md">
        <span> 声明: 相关接口正在研发中，本页面暂时使用静态数据</span>
      </div>
    </div>
    <div class=" row justify-start q-mt-md q-px-sm q-py-sm"  style="background-color: #f9f9f9">
      <div class="col-12 q-pl-md text-bold" style="font-size: 18px;"><span>关键指标</span></div>
      <q-card class="col-3 column justify-center no-shadow   " style="background-color: #ffffff">
        <q-card-section class="bg-white">
          <div class="column justify-start">
            <div style="font-size: 15px" class="row justify-start  col-3 "><span>查询量</span>
            </div>
            <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span> 300,000,000</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col-3 column justify-center no-shadow  q-pl-sm" style="background-color: #ffffff">
        <q-card-section class="bg-white">
          <div class="column justify-start">
            <div style="font-size: 15px" class="row justify-start  col-3 "><span>独立用户</span>
            </div>
            <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span> 10,000,000</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col-3 column justify-center no-shadow  " style="background-color: #ffffff">
        <q-card-section class="bg-white">
          <div class="column justify-start">
            <div style="font-size: 15px" class="row justify-start  col-3 "><span>NXDOMAIN率</span>
            </div>
            <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span> 30%</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col-3 column justify-center no-shadow" style="background-color: #ffffff">
        <q-card-section class="bg-white">
          <div class="column justify-start">
            <div style="font-size: 15px" class="row justify-start  col-3 "><span>成功解析次数</span>
            </div>
            <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span> 2,000,000</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="row justify-start">
      <div class="col-6">
        <div class="title row justify-between q-pl-md" style="margin-top: 5px; background-color: #f9f9f9">
          <p class="text-weight-bold">
            域名访问 Top
          </p>
        </div>

        <div class="ranklist row">
          <div class="col-6">
            <div class="domain row items-center" v-for="(item, index) in weblist.slice(0, 5)" :key="index">
              <p style="padding-left: 6px; width: 26px;">{{ item.rank }}</p>
              <p style="font-weight: 600; width: 150px;">{{ item.name }}</p>
              <p>{{ item.value }}</p>
            </div>
          </div>

          <div class="col-6">
            <div class="domain row items-center" v-for="(item, index) in weblist.slice(5)" :key="index">
              <q-icon v-if="item.icon" :class="[item.color]" :name="item.icon" style="margin-right: 6px; font-size: 18px;"></q-icon>
              <p v-else style="padding-left: 6px; width: 26px;">{{ item.rank }}</p>
              <p style="font-weight: 600; width: 150px;">{{ item.name }}</p>
              <p>{{ item.value }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="title row justify-between q-pl-md" style="margin-top: 5px; background-color: #f9f9f9">
          <p class="text-weight-bold">
            用户访问 Top
          </p>
        </div>

        <div class="ranklist row">
          <div class="col-6">
            <div class="domain row items-center" v-for="(item, index) in userTopList.slice(0, 5)" :key="index">
              <p  style="padding-left: 6px; width: 26px;">{{ item.rank }}</p>
              <p style="font-weight: 600; width: 150px;">{{ item.name }}</p>
              <p>{{ item.value }}</p>
            </div>
          </div>

          <div class="col-6">
            <div class="domain row items-center" v-for="(item, index) in userTopList.slice(5)" :key="index">
              <q-icon v-if="item.icon" :class="[item.color]" :name="item.icon" style="margin-right: 6px; font-size: 18px;"></q-icon>
              <p v-else style="padding-left: 6px; width: 26px;">{{ item.rank }}</p>
              <p style="font-weight: 600; width: 150px;">{{ item.name }}</p>
              <p>{{ item.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-mt-md" style="background-color: #f9f9f9">
      <q-btn-toggle
        v-model="activeItem"
        active-color="black"
        active-bg-color="bg-blue-grey"
        class="col-5 no-shadow "
        flat
        :options="[
        {label: '查询量', value: 'check'},
        {label: '独立用户', value: 'person'},
        {label: 'NXDOMAI率', value: 'domain'},
        {label: '成功解析次数', value: 'parse'}
      ]"
        @update:model-value="changeTab(activeItem)"
      >
      </q-btn-toggle>
      <div style="width: 90%">
        <router-view :datearray="dates"></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.DnsList {
}
.ranklist {
  padding: 0 6px;
  background: #fafafa;
}
.domain {
  line-height: 36px;
}
</style>
