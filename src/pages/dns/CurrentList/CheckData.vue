<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
type EChartsOption = echarts.EChartsOption
interface DataItem {
  name: string;
  value: [string, number];
}

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

const dataAll: DataItem[] = []
let now = new Date(2022, 5, 14)
const oneDay = 24 * 3600 * 1000
let value = Math.random() * 1000
for (const i = ref<number>(0); i.value < 1000; i.value++) {
  dataAll.push(randomData())
}

const option: EChartsOption = {
  title: {
    text: '查询量实时折线图'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params: any) {
      params = params[0]
      const date = new Date(params.name)
      return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' : ' +
        params.value[1]
      )
    },
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      showSymbol: false,
      data: dataAll
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

  setInterval(function () {
    for (const i = ref<number>(0); i.value < 5; i.value++) {
      dataAll.shift()
      dataAll.push(randomData())
    }

    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          data: dataAll
        }
      ]
    })
  }, 1000)
})

</script>

<template>
  <div id="main" class="col-12">

  </div>
</template>
<style scoped>
</style>
