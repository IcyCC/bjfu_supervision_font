<template>
  <div ref="dom" class="charts"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'StackedLinePortrait',
  props: {
    data: Object,
    name_key: {
      type: String,
      default: 'name'
    },
    value_key: {
      type: String,
      default: 'value'
    },
    legend_key: {
      type: String,
      default: 'legend'
    },
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function () {
        let xAxisData = []
        let seriesData = []
        let series = []
        let legends = []
        this.data[0].values.forEach((item) => {
          xAxisData.push(item[this.name_key])
        })

        this.data.forEach((element, index) => {
          let serie = {
            name: '',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'inside'
              }
            },
            data: []
          }
          legends.push(element[this.legend_key])
          serie.name = element[this.legend_key]
          element.values.forEach(single_arra => {
            serie.data.push(single_arra[this.value_key])
          })
          series.push(serie)
        })
        let option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          legend: {
            data: legends
          },
          grid: {
            bottom: '25%'
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {// 坐标轴刻度标签的相关设置。
              interval: 0,
              rotate: '45'
            }
          },
          yAxis: {
            type: 'value'
          },
          series: series
        }
        this.dom.setOption(option)
      }
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let xAxisData = []
      let seriesData = []
      let series = []
      let legends = []
      console.log(this.data)
      this.data[0].values.forEach((item) => {
        xAxisData.push(item[this.name_key])
      })

      this.data.forEach((element, index) => {
        let serie = {
          name: '',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: false,
              position: 'inside'
            }
          },
          data: []
        }
        legends.push(element[this.legend_key])
        serie.name = element[this.legend_key]
        element.values.forEach(single_arra => {
          serie.data.push(single_arra[this.value_key])
        })
        series.push(serie)
      })
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        legend: {
          data: legends
        },
        grid: {
          bottom: '25%'
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {// 坐标轴刻度标签的相关设置。
            interval: 0,
            rotate: '45'
          }
        },
        yAxis: {
          type: 'value'
        },
        series: series
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
