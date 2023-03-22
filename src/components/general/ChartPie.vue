<template>
  <div>
    <Pie  id="pie-chart" :options="options" :data="data" />
  </div>
</template>

<script>
  import { Pie } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";
  ChartJS.register(Title, Tooltip, Legend, ArcElement);

  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ChartPie",
    setup() {
      return {};
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
      options: {
        type: Object,
        default: () => ({
          responsive: true,
        }),
      },
      textColor: {
        type: String,
        default: "#fff",
      },
    },
    components: {
      Pie,
    },
    mounted() {
      this.$nextTick(() => {
        ChartJS.defaults.color = this.textColor;
        ChartJS.defaults.height = 100;
      });
    },
  });
</script>
