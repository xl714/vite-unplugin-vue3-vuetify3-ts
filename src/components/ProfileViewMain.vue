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

let showDialogForm: boolean = ref(false);
let datePicked: Date = ref(new Date());
let weight: number | null = ref(null);
let calories: number | null = ref(null);

const editDatumClick = (e) => {
  const ts = parseInt(e.currentTarget.getAttribute('data-ts'));
  const type = e.currentTarget.getAttribute('data-type');
  const value = parseInt(e.currentTarget.getAttribute('data-value'));
  console.log(`TODO editDatumClick before emit (${ts}, ${type}, ${value})`);
};

const emits = defineEmits<{
  (e: 'onEmitOpenEditFormProfile', id: number): void;
  (
    e: 'onEmitSaveProfileData',
    id: number,
    date: string,
    weight: number,
    calories: number
  ): void;
}>();

const emitOpenEditFormProfile = () => {
  console.log('emitOpenEditFormProfile before emit');
  emits('onEmitOpenEditFormProfile', parseInt(props.profile.id));
  console.log('emitOpenEditFormProfile after emit');
};

const emitSaveProfileData = () => {
  console.log('ProfileViewMain emitSaveProfileData before emit');
  emits(
    'onEmitSaveProfileData',
    parseInt(props.profile.id),
    datePicked.value,
    weight.value,
    calories.value
  );
  showDialogForm.value = false;
  datePicked.value = new Date();
  console.log('ProfileViewMain emitSaveProfileData after emit');
};

const datePickedChanged = (date: Date) => {
  console.log('ProfileViewMain datePickedChanged', date);
  datePicked.value = date;
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
    <header>
      <v-row class="mb-3">
        <v-col>
          <h2 class="text-h2">Dashboard {{ profile.name }}</h2>
        </v-col>
        <v-col />
        <v-col>
          <v-btn color="primary" @click="showDialogForm = true" block>
            <i-mdi:edit />&nbsp;&nbsp;&nbsp;<i-mdi:weight /><i-mdi:fire />
          </v-btn>
          <!-- <v-btn type="button" @click="emitOpenForm" color="primary" fab>
          <i-mdi:edit />
        </v-btn> -->
        </v-col>
      </v-row>
    </header>
    <!-- TABLE BURNED CALORIES -->
    <v-row>
      <v-col cols="5">
        <h3>Calories burned</h3>
        <table class="v-simple-table dense">
          <!-- <template v-slot:default> -->
          <thead>
            <tr>
              <th class="text-center">Date</th>
              <th class="text-center">Value (Calories)</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in profile.burnedList">
              <td class="text-left">
                {{ new Date(key * 1000).toISOString().split('T')[0] }}
              </td>
              <td class="text-right">
                {{ value }}
              </td>
              <td class="text-right">
                <v-btn
                  :data-ts="key"
                  data-type="burned"
                  :data-value="value"
                  fax
                  @click="editDatumClick"
                  ><i-mdi:edit
                /></v-btn>
              </td>
            </tr>
          </tbody>
          <!-- </template> -->
        </table>
      </v-col>
      <v-col cols="2"></v-col>
      <!-- TABLE WEIGHTS -->
      <v-col cols="5">
        <h3>Weights</h3>
        <table class="v-simple-table dense">
          <!-- <template v-slot:default> -->
          <thead>
            <tr>
              <th class="text-center">Date</th>
              <th class="text-center">Value (Kg)</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in profile.weightList">
              <td class="text-left">
                {{ new Date(key * 1000).toISOString().split('T')[0] }}
              </td>
              <td class="text-left">{{ value }}</td>
              <td class="text-right">
                <v-btn
                  :data-ts="key"
                  data-type="weight"
                  :data-value="value"
                  fax
                  @click="editDatumClick"
                  ><i-mdi:edit
                /></v-btn>
              </td>
            </tr>
          </tbody>
          <!-- </template> -->
        </table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="">
        <LineChart v-bind="lineChartProps" />
      </v-col>
    </v-row>

    <!-- DIALOG FORM -->
    <v-dialog v-model="showDialogForm" class="dialog-form-add-data" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h2"
            >Add new weight and/or burned calories at date</span
          >
        </v-card-title>
        <v-card-text>
          <v-container class="c__inputs">
            <v-row justify="center" class="v-row__numbers">
              <v-col cols="1" />
              <v-col cols="5">
                <v-text-field
                  label="New weight:"
                  class="input-weight"
                  v-model="weight"
                  :prepend-icon="IconWeightKilogram"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  class="input-calories"
                  label="Calories burned:"
                  v-model="calories"
                  :prepend-icon="IconFire"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="1" />
            </v-row>
            <v-row justify="center" class="v-row__datepicker">
              <v-col cols="3" />
              <v-col cols="6">
                <date-picker-day
                  :datePicked="datePicked"
                  @onEmitDatePickedChanged="datePickedChanged"
                  class="dialog-date-picker"
                ></date-picker-day>
              </v-col>
              <v-col cols="3" />
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="text" @click="emitSaveProfileData">
            Save
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="showDialogForm = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style>
.input-weight,
.input-calories {
  margin-left: 3px;
}
</style>
