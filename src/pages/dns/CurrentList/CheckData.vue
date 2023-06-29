<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch } from 'vue'
type EChartsOption = echarts.EChartsOption
interface DataItem {
  name: string;
  value: [string, number];
}
//  子组件接收父组件传递过来的值
const props = defineProps({
  datearray: {
    type: Array
  }
})

watch(props, (newVal, oldVal) => {
  console.log('监听引用类型数据dataList')
  console.log('new1', newVal)
  console.log('new2', newVal)
  console.log('old', oldVal)
  updateOptionChart()
})
function randomData (): DataItem {
  now = new Date(+now + oneDay)
  value = value + Math.random() * 21 - 10
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)
    ]
  }
}
const updateOptionChart = async () => {
  const chartDom = document.getElementById('main')!
  const myChart = echarts.init(chartDom)
  await myChart.setOption(option)
  option && myChart.setOption(option)
}
const dataAll: DataItem[] = []
let now = new Date(2022, 5, 14)
const oneDay = 24 * 3600 * 1000
let value = Math.random() * 1000
for (const i = ref<number>(0); i.value < 1000; i.value++) {
  dataAll.push(randomData())
}

// const option: EChartsOption = {
//   title: {
//     text: '查询量实时折线图'
//   },
//   tooltip: {
//     trigger: 'axis',
//     formatter: function (params: any) {
//       params = params[0]
//       const date = new Date(params.name)
//       return (
//         date.getDate() +
//         '/' +
//         (date.getMonth() + 1) +
//         '/' +
//         date.getFullYear() +
//         ' : ' +
//         params.value[1]
//       )
//     },
//     axisPointer: {
//       animation: false
//     }
//   },
//   xAxis: {
//     type: 'time',
//     splitLine: {
//       show: false
//     },
//     data: props.datearray
//   },
//   yAxis: {
//     type: 'value',
//     boundaryGap: [0, '100%'],
//     splitLine: {
//       show: false
//     }
//   },
//   series: [
//     {
//       name: 'Fake Data',
//       type: 'line',
//       showSymbol: false,
//       data: dataAll
//     }
//   ]
// }
console.log(props.datearray)
const option = {
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
      data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
    }
  ]
}
onMounted(async () => {
  const chartDom = document.getElementById('main')!
  const myChart = echarts.init(chartDom)
  await myChart.setOption(option)
  option && myChart.setOption(option)
  myChart.resize({
    width: 1230,
    height: 700
  })
})

</script>

<template>
  <div id="main" class="col-12">

  </div>
</template>
<style scoped>
</style>
