<!--<script setup lang="ts">-->
<!--import * as echarts from 'echarts'-->
<!--import { ref, onMounted, watch, computed } from 'vue'-->
<!--import aiops from '../../../api/aiops'-->
<!--import {-->
<!--  getNowFormatTime,-->
<!--  payRecordUtcToBeijingMinuteDetail-->
<!--} from '../../../hooks/processTime'-->
<!--type EChartsOption = echarts.EChartsOption-->
<!--interface DataItem {-->
<!--  name: string;-->
<!--  value: [string, number];-->
<!--}-->
<!--const currentDate = getNowFormatTime(1)-->

<!--const date2 = new Date(currentDate)-->
<!--date2.setHours(date2.getHours() - 2)-->
<!--const startDate = payRecordUtcToBeijingMinuteDetail(date2.toISOString())-->

<!--const dateFrom = ref(startDate)-->
<!--const startDateStamp = new Date(dateFrom.value).getTime()-->
<!--const dateFromStamp = ref(startDateStamp)-->
<!--const dateTo = ref(currentDate)-->
<!--const currentDateStamp = new Date(dateTo.value).getTime()-->
<!--const dateToStamp = ref(currentDateStamp)-->
<!--//  子组件接收父组件传递过来的值-->
<!--const props = defineProps({-->
<!--  datearray: {-->
<!--    type: Array-->
<!--  }-->
<!--})-->

<!--watch(props, (newVal, oldVal) => {-->
<!--  console.log('监听引用类型数据dataList')-->
<!--  updateOptionChart()-->
<!--})-->
<!--function randomData (): DataItem {-->
<!--  now = new Date(+now + oneDay)-->
<!--  value = value + Math.random() * 21 - 10-->
<!--  return {-->
<!--    name: now.toString(),-->
<!--    value: [-->
<!--      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),-->
<!--      Math.round(value)-->
<!--    ]-->
<!--  }-->
<!--}-->
<!--const updateOptionChart = async () => {-->
<!--  const chartDom = document.getElementById('main')!-->
<!--  const myChart = echarts.init(chartDom)-->
<!--  await myChart.setOption(option.value)-->
<!--  option.value && myChart.setOption(option.value)-->
<!--}-->
<!--const dataAll: DataItem[] = []-->
<!--let now = new Date(2022, 5, 14)-->
<!--const oneDay = 24 * 3600 * 1000-->
<!--let value = Math.random() * 1000-->
<!--for (const i = ref<number>(0); i.value < 1000; i.value++) {-->
<!--  dataAll.push(randomData())-->
<!--}-->
<!--console.log(props.datearray)-->
<!--const queryData = ref<number[]>([])-->
<!--const option = computed(() => ({-->
<!--  title: {-->
<!--    text: '查询量趋势'-->
<!--  },-->
<!--  tooltip: {-->
<!--    trigger: 'axis'-->
<!--  },-->
<!--  legend: {-->
<!--    data: ['查询量']-->
<!--  },-->
<!--  grid: {-->
<!--    left: '3%',-->
<!--    right: '4%',-->
<!--    bottom: '3%',-->
<!--    containLabel: true-->
<!--  },-->
<!--  toolbox: {-->
<!--    feature: {-->
<!--      saveAsImage: {}-->
<!--    }-->
<!--  },-->
<!--  xAxis: {-->
<!--    type: 'category',-->
<!--    boundaryGap: false,-->
<!--    data: props.datearray-->
<!--  },-->
<!--  yAxis: {-->
<!--    type: 'value'-->
<!--  },-->
<!--  series: [-->
<!--    {-->
<!--      name: '查询量',-->
<!--      type: 'line',-->
<!--      stack: 'Total',-->
<!--      // data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]-->
<!--      data: queryData.value-->
<!--    }-->
<!--  ]-->
<!--}))-->
<!--onMounted(async () => {-->
<!--  await getTrendData()-->
<!--  const chartDom = document.getElementById('main')!-->
<!--  const myChart = echarts.init(chartDom)-->
<!--  await myChart.setOption(option.value)-->
<!--  option.value && myChart.setOption(option.value)-->
<!--  myChart.resize({-->
<!--    width: 1230,-->
<!--    height: 700-->
<!--  })-->
<!--})-->
<!--// trend接口-->
<!--interface trenDataInfoInterface {-->
<!--  timestamp?: number | undefined-->
<!--  total_request_number?: number | undefined-->
<!--  independent_users_number?: number | undefined-->
<!--  nxdomain_number?: number | undefined-->
<!--  success_number?: number | undefined-->
<!--  nxdomain_rate?: string | undefined-->
<!--}-->
<!--interface trendDataQueryInterface {-->
<!--  page_size?: number;-->
<!--  page?: number;-->
<!--  ordering?: string;-->
<!--  start?: number;-->
<!--  end?: number;-->
<!--}-->
<!--const numOfQuery = ref<number>(1)-->
<!--const numOfUser = ref<number>(1)-->
<!--const numOfNxdomain = ref<number>(1)-->
<!--const numOfParse = ref<number>(1)-->
<!--const nxdomainRate = ref<string>('1%')-->
<!--const pageSize = ref<number>()-->
<!--const page = ref<number>()-->
<!--const ordering = ref<string>('timestamp')-->
<!--const start = ref<number>(dateFromStamp.value / 1000)-->
<!--const end = ref<number>(dateToStamp.value / 1000)-->
<!--// const start = ref<number>(1688262601)-->
<!--// const end = ref<number>(1688263202)-->
<!--const dnsTrendDataQuery = ref<trendDataQueryInterface>({-->
<!--  page_size: pageSize.value,-->
<!--  page: page.value,-->
<!--  ordering: ordering.value,-->
<!--  start: start.value,-->
<!--  end: end.value-->
<!--})-->
<!--const allResult = ref()-->
<!--const getTrendData = async () => {-->
<!--  console.log('in checkdata')-->
<!--  aiops.trend.dns.getDnsTrendData({ query: dnsTrendDataQuery.value }).then((res) => {-->
<!--    allResult.value = res.data.results-->
<!--    console.log('dnsTrendDataQuery.value.end', dnsTrendDataQuery.value.end)-->
<!--    numOfQuery.value = 0-->
<!--    numOfUser.value = 0-->
<!--    numOfNxdomain.value = 0-->
<!--    numOfParse.value = 0-->
<!--    console.log('allResult.value.length', allResult.value.length)-->
<!--    for (let i = 0; i < allResult.value.length; i++) {-->
<!--      queryData.value.push(allResult.value[i].total_request_number)-->
<!--    }-->
<!--    const chartDom = document.getElementById('main')!-->
<!--    const myChart = echarts.init(chartDom)-->
<!--    myChart.setOption(option.value)-->
<!--    option.value && myChart.setOption(option.value)-->
<!--    myChart.resize({-->
<!--      width: 1230,-->
<!--      height: 700-->
<!--    })-->
<!--    // console.log('allResult.value', allResult.value[0].timestamp)-->
<!--  })-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div id="main" class="col-12">-->

<!--  </div>-->
<!--</template>-->
<!--<style scoped>-->
<!--</style>-->
