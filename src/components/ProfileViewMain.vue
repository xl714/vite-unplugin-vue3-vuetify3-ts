<script setup lang="ts">
import { Profile } from '../classes/profile';
import IconWeightKilogram from '~icons/mdi/weight-kilogram';
import IconFire from '~icons/mdi/fire';
// import Datepicker from 'vue3-datepicker';

export interface Props {
  profile: Profile;
}
const props = withDefaults(defineProps<Props>(), {
  profile: new Profile(),
});
console.log('Profile.vue props.profile.name', props.profile.name);

let dialog: boolean = ref(true);
let datePicked: Date = ref(new Date());
// let picker: string = new Date(
//   Date.now() - new Date().getTimezoneOffset() * 60000
// )
// .toISOString()
// .substr(0, 10);

const emits = defineEmits<{
  (e: 'onEmitOpenEditFormProfile', id: number): void;
}>();

const emitOpenEditFormProfile = () => {
  //name.value && alert(`Hi ${name.value}`);
  console.log('emitOpenEditFormProfile before emit');
  emits('onEmitOpenEditFormProfile', parseInt(props.profile.id));
  console.log('emitOpenEditFormProfile after emit');
};

/***************** CHART *****************/
import { LineChart, useLineChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
Chart.register(...registerables);
const getData = computed<ChartData<'line'>>(() => ({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Bitcoin',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: '#4bc0c0',
    },
    {
      label: 'Ethereum',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      borderColor: '#565656',
    },
  ],
}));

const options = computed<ChartOptions<'line'>>(() => ({
  plugins: {
    legend: {
      display: true,
    },
  },
}));

const { lineChartProps } = useLineChart({
  options,
  chartData: getData,
});

const switchLegend = () => {
  toggleLegend.value = !toggleLegend.value;
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="9" class="text-left">
        <div>PROFILE VIEW MAIN - {{ profile.name }}</div>
      </v-col>
      <v-col cols="3" class="text-left">
        <v-btn color="primary" @click="dialog = true"> <i-mdi:edit /> </v-btn>
        <!-- <v-btn type="button" @click="emitOpenForm" color="primary" fab>
          <i-mdi:edit />
        </v-btn> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="">
        <LineChart v-bind="lineChartProps" />
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add data</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center">
              <date-picker-day :datePicked="datePicked"></date-picker-day>
            </v-row>
            <v-row justify="center">
              <v-col cols="3" />
              <v-col cols="6">
                <v-text-field
                  label="New weight:"
                  v-model="targetWeight"
                  :prepend-icon="IconWeightKilogram"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="3" />
            </v-row>
            <v-row justify="center">
              <v-col cols="3" />
              <v-col cols="6">
                <v-text-field
                  label="New calories burned !"
                  v-model="targetWeight"
                  :prepend-icon="IconFire"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="3" />
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
