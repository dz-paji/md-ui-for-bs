<template>
  <base-skeleton>
    <div class="row layout-padding">
      <span class="label bg-pink text-white">
        {{ $trans('admin.index.totalUsers') }}
        <span class="right-detail">{{ users }}</span>
      </span>&nbsp;
      <span class="label bg-red text-white">
        {{ $trans('admin.index.totalPlayers') }}
        <span class="right-detail">{{ players }}</span>
      </span>&nbsp;
      <span class="label bg-deep-purple text-white">
        {{ $trans('admin.index.totalTextures') }}
        <span class="right-detail">{{ textures }}</span>
      </span>&nbsp;
      <span class="label bg-secondary text-white">
        {{ $trans('admin.index.diskUsage') }}
        <span class="right-detail">{{ storageText }}</span>
      </span>
    </div>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2"><echart :options="activityStatusChart" /></div>
      <div class="width-1of2">
        <echart :options="textureLikesTopTenChart" />
      </div>
    </div>
    <div class="row gutter sm-column layout-padding">
      <div class="width-1of2">
        <echart :options="textureSizeTopTenChart" />
      </div>
      <div class="width-1of2">
        <echart :options="textureTypeCountChart" />
      </div>
    </div>
  </base-skeleton>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import BaseSkeleton from './Base'

export default {
  components: {
    BaseSkeleton,
    echart: ECharts
  },
  computed: {
    storageText () {
      return this.storage >= 1024
        ? ((this.storage / 1024).toFixed(1) + ' MB')
        : this.storage + ' KB'
    },
    activityStatusChart () {
      return {
        title: {
          text: this.$trans('admin.index.activityStatus')
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          type: 'plain',
          data: [
            this.$trans('admin.userRegistration'),
            this.$trans('admin.textureUploads')
          ]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.activityStatus.labels
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1
          }
        ],
        series: [
          {
            name: this.$trans('admin.userRegistration'),
            type: 'line',
            areaStyle: { normal: {} },
            data: this.activityStatus.data.userRegistration
          },
          {
            name: this.$trans('admin.textureUploads'),
            type: 'line',
            areaStyle: { normal: {} },
            data: this.activityStatus.data.textureUpload
          }
        ]
      }
    },
    textureLikesTopTenChart () {
      return {
        title: {
          text: this.$trans('admin.index.textureLikesTopTen')
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.textureLikesTopTen.map(item => item.name),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1
          }
        ],
        series: [
          {
            name: this.$trans('skinlib.show.likes'),
            type: 'bar',
            barWidth: '60%',
            data: this.textureLikesTopTen.map(item => item.likes)
          }
        ]
      }
    },
    textureSizeTopTenChart () {
      return {
        title: {
          text: this.$trans('admin.index.textureSizeTopTen')
        },
        color: ['#FF9800'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.textureSizeTopTen.map(item => item.name),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1
          }
        ],
        series: [
          {
            name: this.$trans('skinlib.show.size'),
            type: 'bar',
            barWidth: '60%',
            data: this.textureSizeTopTen.map(item => item.size)
          }
        ]
      }
    },
    textureTypeCountChart () {
      const { steve, alex, cape } = this.textureTypeCount
      return {
        title: {
          text: this.$trans('admin.index.textureTypeCount'),
          x: 'center'
        },
        color: ['#3F51B5', '#2196F3', '#9C27B0'],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: 'right',
          data: ['Steve', 'Alex', this.$trans('general.cape')]
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: steve, name: 'Steve' },
              { value: alex, name: 'Alex' },
              { value: cape, name: this.$trans('general.cape') }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  data () {
    return {
      users: 0,
      players: 0,
      textures: 0,
      storage: 0,
      activityStatus: {
        labels: [],
        data: {
          userRegistration: [],
          textureUploads: []
        }
      },
      textureLikesTopTen: [],
      textureSizeTopTen: [],
      textureTypeCount: {
        total: 0, steve: 0, alex: 0, cape: 0
      }
    }
  },
  async mounted () {
    const {
      users,
      players,
      textures,
      storage,
      chart
    } = await this.$bs('/md/info/admin-panel')
    this.users = users
    this.players = players
    this.textures = textures
    this.storage = storage
    this.activityStatus = chart.activityStatus
    this.textureLikesTopTen = chart.textureLikesTopTen
    this.textureSizeTopTen = chart.textureSizeTopTen
    this.textureTypeCount = chart.textureTypeCount
  }
}
</script>
