<template>
  <Radar :data="data" :options="options" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "vue-chartjs";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default {
  name: "RadarChart",
  components: {
    Radar,
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          responsive: true,
          scales: {
            y: {
              // defining min and max so hiding the dataset does not change scale range
              min: 0,
              max: 3000,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        };
      },
    },
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
