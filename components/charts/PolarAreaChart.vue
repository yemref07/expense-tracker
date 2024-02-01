<template>
  <PolarArea :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { PolarArea } from 'vue-chartjs'


ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export default {
  name: 'PolarAreaChart',
  components: {
    PolarArea
  },
 props:{
  options:{
      default:()=>{
          return{
              plugins: {
                legend: {
                    display: false,
                },
            },
        }
    }
  },
  data:{
      type:Object,
      required:true
  }
 }
}
</script>
