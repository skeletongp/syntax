<template>
  <div>
    <Bar id="bar-chart" :options="options" :data="data"  />
  </div>
</template>

<script>
  import { Bar } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );
 
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ChartBar",
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
      Bar,
    },
    mounted() {
      this.$nextTick(() => {
        ChartJS.defaults.color = this.textColor;
      });
    },
  });
</script>
