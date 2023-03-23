<template>
  <ion-page>
    <ion-content :fullscreen="true" style="height: 100%">
      <div class="w-full relative">
        <div class="mb-3 bg-white">
          <CardMain :filterData="filterData" />
          <ion-select
            placeholder="Filtrar tareas"
            class="w-44 ml-auto"
            v-model="filterPeriod"
          >
            <ion-select-option value="today">Tareas de hoy</ion-select-option>
            <ion-select-option value="week"
              >Tareas de la semana</ion-select-option
            >
            <ion-select-option value="month">Tareas del mes</ion-select-option>
          </ion-select>
        </div>
        <ion-datetime
          class="border !my-0 !max-w-[380px] !mx-auto"
          pickerFormat="DD/M/YYYY"
          @ionBlur="cancelChange"
          @ionChange="onChange"
          locale="es-DO"
          presentation="date"
          :highlighted-dates="highDates"
          mode="md"
        />
        <LatestTasks :nextTask="nextTask" :lastDone="lastDone" />

        <div class="flex justify-between items-center">
          <TaskList @onSearch="onSearch" :tasks="filterData" />
          <ion-button @click="showChart = true" expand="block" fill="clear">
            Mostrar gráfica
          </ion-button>
          <ion-modal
            :is-open="showChart"
            :show-backgrop="false"
            :backdrop-breakpoint="0.25"
            :backdrop-dismiss="false"
            ref="chart"
            :initial-breakpoint="0.9"
            :breakpoints="[0.9]"
            class=""
          >
            <ion-header>
              <ion-toolbar>
                <ion-button
                  slot="end"
                  mode="ios"
                  color="primary"
                  fill="clear"
                  @click="showChart = false"
                  >Cerrar</ion-button
                >
              </ion-toolbar>
            </ion-header>
            <ion-content class="">
              <div class="pt-8">
                <ChartPie
                  v-if="data"
                  textColor="#000"
                  :options="options"
                  :data="chartData"
                />
              </div>
            </ion-content>
          </ion-modal>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import TaskList from "../components/tasks/TaskList.vue";
  import TaskController from "@/controllers/TaskController";
  import Subtask from "@/orm/models/Subtask";
  import LatestTasks from "../components/tasks/LatestTasks.vue";
  import moment from "moment";
  import CardMain from "../components/general/CardMain.vue";
  import { mdiStar, mdiClockAlertOutline, mdiCalendarCheckOutline } from "@mdi/js";
  export default defineComponent({
    name: "HomePage",

    setup() {
      const options = {
        responsive: true,
        maintainAspectRatio: true,
        //set dimentions

        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: "Estadísticas generales",
          },
        },
      };
      return {
        options,
        mdiStar,
      };
    },
    data: () => ({
      filterPeriod: null,
      data: [],
      showChart: false,
      filterData: [],
      highDates: [],
      params: {
        where: null,
        whereDateBetween: null,
        orderBy: ["due_date", "asc"],
        include: null,
        search: null,
        limit: [100],
      },
      nextTask: null,
      lastDone: null,
    }),
    methods: {
      async onChange(evt) {
        const highlightedDates = this.highDates;
        const value = evt.detail.value.split("T")[0];
        this.params.where = ["due_date", value];
        await this.getTasks();
      },
      cancelChange() {
        const period = this.filterPeriod;
        this.filterPeriod = " ";
        setTimeout(() => {
          this.filterPeriod = period;
        }, 300);
      },
      async ionViewWillEnter() {
        this.getTasks();
        this.getNextTask();
        this.getLasDone();
        this.$forceUpdate();
      },

      async ionViewWillLeave() {
        this.$refs.chart.$el.dismiss();
      },
      async getNextTask() {
        const params = {
          where: ["status", "pending"],
          orderBy: ["due_date", "asc"],
          limit: [1],
        };
        const result = await new TaskController().index(params);
        if (result.code == 200) {
          const nextTask = result.data[0];
          if (nextTask) {
            nextTask.due_date = moment(nextTask.due_date).format("YYYY-MM-DD");
            (nextTask.icon = mdiClockAlertOutline), (nextTask.fill = "#F9C806");
            this.nextTask = nextTask;
          }
        }
      },
      async getLasDone() {
        const params = {
          where: ["status", "completed"],
          orderBy: ["due_date", "desc"],
          limit: [1],
        };
        const result = await new TaskController().index(params);
        if (result.code == 200) {
          const lastDone = result.data[0];
          if (lastDone) {
            lastDone.due_date = moment(lastDone.due_date).format("YYYY-MM-DD");
            (lastDone.icon = mdiCalendarCheckOutline), (lastDone.fill = "#008800");
            this.lastDone = lastDone;
          }
        }
      },
      async getTasks() {
        const result = await new TaskController().index(this.params);
        if (result.code == 200) {
          this.data = result.data;
          this.filterData = result.data;
        }
        this.getHighDates();
      },

      getHighDates() {
        const highDates = this.filterData
          .filter((d) => d.status == "pending" || d.status == "completed")
          .map((d) => {
            const date = d.due_date.split("T")[0];
            const status = d.status;
            return {
              date: date,
              textColor: "#fff",
              backgroundColor: status == "completed" ? "#008800" : "#aa0000",
            };
          });
        this.highDates = highDates;
      },
      onSearch(val) {
        this.params.search = [val];
        this.getTasks();
      },
    },
    components: { TaskList, CardMain, LatestTasks },
    computed: {
      chartData() {
        const completed = this.filterData.filter(
          (d) => d.status == "completed"
        ).length;
        const pending = this.filterData.filter(
          (d) => d.status == "pending"
        ).length;
        const canceled = this.filterData.filter(
          (d) => d.status == "canceled"
        ).length;
        const data = {
          labels: ["Comp.", "Pend.", "Canc."],
          datasets: [
            {
              label: "Tareas",
              backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
              data: [completed, pending, canceled],
              fill: false,
            },
          ],
        };
        return data;
      },
    },

    watch: {
      filterPeriod: {
        immediate: true,
        async handler(val) {
          const startOfWeek = moment()
            .startOf("week")
            .add(1, "day")
            .format("YYYY-MM-DD");
          const endOfWeek = moment(startOfWeek)
            .clone()
            .add(1, "week")
            .subtract(1, "day")
            .format("YYYY-MM-DD");
          const firstOfMonth = moment().startOf("month").format("YYYY-MM-DD");
          const lastOfMonth = moment().endOf("month").format("YYYY-MM-DD");
          const today = moment().format("YYYY-MM-DD");
          const user_id = localStorage.getItem("isLogged");

          if (val) {
            switch (val) {
              case "today":
                this.params.where = ["due_date", today];
                break;
              case "week":
                this.params.where = null;
                this.params.whereDateBetween = [
                  "due_date",
                  [startOfWeek, endOfWeek],
                ];

                break;
              case "month":
                this.params.where = null;
                this.params.whereDateBetween = [
                  "due_date",
                  [firstOfMonth, lastOfMonth],
                ];
                break;
            }
          }
          await this.getTasks();
        },
      },
    },
  });
</script>

<style scoped>
  ion-progress-bar {
    --background: rgb(224, 224, 221, 0.5);
    --progress-background: #1dc370;
  }
  calendar-month-grid {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
</style>
