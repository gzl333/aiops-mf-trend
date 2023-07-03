<script setup lang="ts">
import LineChart from 'components/chart/LineChart.vue'
import { ref, reactive, onMounted, computed, watch } from 'vue'
import {
  getNowFormatTime,
  payRecordUtcToBeijingMinuteDetail
} from '../../../hooks/processTime'
import { navigateToUrl } from 'single-spa'
import aiops from '../../../api/aiops'

const currentDate = getNowFormatTime(1)
const date2 = new Date(currentDate)
date2.setHours(date2.getHours() - 2)
const startDate = payRecordUtcToBeijingMinuteDetail(date2.toISOString())
const dateFrom = ref(startDate)
const startDateStamp = new Date(dateFrom.value).getTime()
const dateFromStamp = ref(startDateStamp)
const dateTo = ref(currentDate)
const currentDateStamp = new Date(dateTo.value).getTime()
const dateToStamp = ref(currentDateStamp)
// console.log('startDate', startDate)
// console.log('currentDate', currentDate)
// console.log('currentDateStamp', currentDateStamp)
// console.log('startDateStamp', startDateStamp)
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

const minuteOptionsTime1 = ref<number[]>([0, 10, 20, 30, 40, 50])
const checkUpdateFromdate = async (date: string) => {
  dnsTrendDataQuery.value.start = (new Date(date).getTime()) / 1000
  if (new Date(date) > new Date(currentDate)) {
    alert('时间选择无效')
  }
  // console.log('dateFromchange', date)
}
const UpdateTodate = async (date: string) => {
  dnsTrendDataQuery.value.end = (new Date(date).getTime()) / 1000
}
const search = async (date2: string) => {
  dates.value = []
  await getDayAll(new Date(date2), new Date(dateTo.value))
  await getTrendData()
  await getTopData()
}
// chart
// x轴——时间
const dates = ref<string[]>([])
// 获取时间段间隔十分钟数组
function getDayAll (starDay: Date, endDay: Date) {
  const arr = []
  // 设置两个日期UTC时间
  const db = new Date(starDay)
  const de = new Date(endDay)
  // 获取两个日期GTM时间
  const s = db.getTime() - 24 * 60 * 60 * 1000
  const d = de.getTime() - 24 * 60 * 60 * 1000 - 10 * 60 * 1000
  // 获取到两个日期之间的每一天的毫秒数
  for (const i = ref<number>(s); i.value <= d;) {
    i.value = i.value + 60 * 1000 * 10
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
  // console.log('datesArray', dates)
  return dates
}
const props = defineProps({
  datearray: {
    type: Array
  }
})
// 变量定义
const mapRef = ref()
const queryData = ref<number[]>([])
const option = computed(() => ({
  title: {
    text: '查询量趋势'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['查询量']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.datearray
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '查询量',
      type: 'line',
      stack: 'Total',
      // data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
      data: queryData.value
    }
  ]
}))
// trend 接口
interface trenDataInfoInterface {
  timestamp?: number | undefined
  total_request_number?: number | undefined
  independent_users_number?: number | undefined
  nxdomain_number?: number | undefined
  success_number?: number | undefined
  nxdomain_rate?: string | undefined
}
interface trendDataQueryInterface {
  page_size?: number;
  page?: number;
  ordering?: string;
  start?: number;
  end?: number;
}
const numOfQuery = ref<number>(1)
const numOfUser = ref<number>(1)
const numOfNxdomain = ref<number>(1)
const numOfParse = ref<number>(1)
const nxdomainRate = ref<string>('1%')
const pageSize = ref<number>(10000)
const page = ref<number>()
const ordering = ref<string>('timestamp')
const start = ref<number>(dateFromStamp.value / 1000)
const end = ref<number>(dateToStamp.value / 1000)
// const start = ref<number>(1688262601)
// const end = ref<number>(1688263202)
const dnsTrendDataQuery = ref<trendDataQueryInterface>({
  page_size: pageSize.value,
  page: page.value,
  ordering: ordering.value,
  start: start.value,
  end: end.value
})
const allResult = ref()
const getTrendData = async () => {
  mapRef.value.chartStartLoading()
  aiops.trend.dns.getDnsTrendData({ query: dnsTrendDataQuery.value }).then((res) => {
    allResult.value = res.data.results
    numOfQuery.value = 0
    numOfUser.value = 0
    numOfNxdomain.value = 0
    numOfParse.value = 0
    queryData.value = []
    for (let i = 0; i < allResult.value.length; i++) {
      queryData.value.push(allResult.value[i].total_request_number)
      console.log('result length', allResult.value.length)
      numOfQuery.value += allResult.value[i].total_request_number
      numOfUser.value += allResult.value[i].independent_users_number
      numOfNxdomain.value += allResult.value[i].nxdomain_number
      numOfParse.value += allResult.value[i].success_number
    }
    nxdomainRate.value = String((numOfNxdomain.value * 100 / numOfQuery.value).toPrecision(4)) + '%'
    numOfUser.value = Math.round(numOfUser.value / allResult.value.length)
    mapRef.value.chartStopLoading()
  })
}
// top 接口
interface topDataQueryInterface {
  start?: number;
  end?: number;
}
const topDomain = ref<string[]>([])
const topUser = ref<string[]>([])
const dnsTopDataQuery = ref<topDataQueryInterface>({
  start: start.value,
  end: end.value
})
const getTopData = async () => {
  aiops.trend.top.getDnsTopData({ query: dnsTopDataQuery.value }).then((res) => {
    topDomain.value = res.data.domain
    topUser.value = res.data.user
    console.log('topDomain.value', topDomain.value)
    console.log('topUser.value', topUser.value)
  })
}
onMounted(async () => {
  await getDayAll(new Date(dateFrom.value), new Date(dateTo.value))
  await getTrendData()
  await getTopData()
})

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
                <q-time v-model="dateFrom" mask="YYYY-MM-DD HH:mm" format24h with-hours:true  :minute-options="minuteOptionsTime1" @update:model-value="checkUpdateFromdate(dateFrom)">
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
                <q-time v-model="dateTo" mask="YYYY-MM-DD HH:mm" format24h :minute-options="minuteOptionsTime1" @update:model-value="UpdateTodate(dateTo)">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="确定" color="primary" flat/>
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class='col-1'><q-btn style="height: 40px"  outline label="搜索" class="q-px-lg q-ml-lg" @click="search(dateFrom)"/></div>
      <!-- <div class="col-6 text-grey-6 q-mt-md">
        <span> 声明: 相关接口正在研发中，本页面暂时使用静态数据</span>
      </div> -->
    </div>
    <div class=" row justify-start q-mt-md q-px-sm q-py-sm"  style="background-color: #f9f9f9">
      <div class="col-12 q-pl-md text-bold" style="font-size: 18px;"><span>关键指标</span></div>
      <q-card class="col-3 column justify-center no-shadow   " style="background-color: #ffffff">
        <q-card-section class="bg-white">
          <div class="column justify-start">
            <div style="font-size: 15px" class="row justify-start  col-3 "><span>查询量</span>
            </div>
            <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span>{{numOfQuery}}</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col-3 column justify-center no-shadow  q-pl-sm" style="background-color: #ffffff">
        <q-card-section class="bg-white">
          <div class="column justify-start">
            <div style="font-size: 15px" class="row justify-start  col-3 "><span>平均用户数量</span>
            </div>
            <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span>{{numOfUser}}</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col-3 column justify-center no-shadow  " style="background-color: #ffffff">
        <q-card-section class="bg-white">
          <div class="column justify-start">
            <div style="font-size: 15px" class="row justify-start  col-3 "><span>NXDOMAIN率</span>
            </div>
            <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span>{{nxdomainRate}}</span>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="col-3 column justify-center no-shadow" style="background-color: #ffffff">
        <q-card-section class="bg-white">
          <div class="column justify-start">
            <div style="font-size: 15px" class="row justify-start  col-3 "><span>成功解析次数</span>
            </div>
            <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span>{{ numOfParse }}</span>
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
          <div class="col-6 q-pl-sm">
            <div class="domain row items-center" v-for="(item, index) in topDomain.slice(0, 5)" :key="index">
              <p style="padding-left: 6px; width: 20px;">{{ index + 1 }}</p>
              <p style="font-weight: 600; width: 200px;">{{ item.name }}</p>
              <p>{{ item.query_num }}</p>
            </div>
          </div>

          <div class="col-6">
            <div class="domain row items-center" v-for="(item, index) in topDomain.slice(5, 10)" :key="index">
              <q-icon v-if="item.icon" :class="[item.color]" :name="item.icon" style="margin-right: 6px; font-size: 18px;"></q-icon>
              <p v-else style="padding-left: 6px; width: 26px;">{{ index + 6 }}</p>
              <p style="font-weight: 600; width: 150px;">{{ item.name }}</p>
              <p>{{ item.query_num }}</p>
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
            <div class="domain row items-center" v-for="(item, index) in topUser.slice(0, 5)" :key="index">
              <p  style="padding-left: 6px; width: 26px;">{{ index + 1 }}</p>
              <p style="font-weight: 600; width: 150px;">{{ item.name }}</p>
              <p>{{ item.query_num }}</p>
            </div>
          </div>

          <div class="col-6">
            <div class="domain row items-center" v-for="(item, index) in topUser.slice(5, 10)" :key="index">
              <q-icon v-if="item.icon" :class="[item.color]" :name="item.icon" style="margin-right: 6px; font-size: 18px;"></q-icon>
              <p v-else style="padding-left: 6px; width: 26px;">{{ index + 6 }}</p>
              <p style="font-weight: 600; width: 150px;">{{ item.name }}</p>
              <p>{{ item.query_num }}</p>
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
        <router-view v-model:datearray="dates"></router-view>
      </div>
    </div>
    <div class="row q-mt-lg justify-start">
      <div class="col-12">
        <line-chart :option="option" ref="mapRef"/>
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
