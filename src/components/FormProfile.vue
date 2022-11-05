<script setup lang="ts">
// unplugin-auto-import will declare it on src/auto-imports.d.ts

// https://vuejs.org/api/sfc-script-setup.html#typescript-only-features

// const props = defineProps<{
//   selectedProfileIndex?: number | null
// }>();
export interface Props {
  // profileId?: number | null;
  profile?: object | null;
}

const props = withDefaults(defineProps<Props>(), {
  profile: null,
});
console.log('props.profile', props.profile);

const name = ref(props.profile ? props.profile.name : 'Xavier');
const currentWeight = ref(props.profile ? props.profile.currentWeight : '88');
const targetWeight = ref(props.profile ? props.profile.targetWeight : '70');

const disabled = computed(() => {
  return !(
    name.value.trim().length > 0 &&
    currentWeight.value > 0 &&
    targetWeight.value > 0
  );
});

const emits = defineEmits<{
  (
    e: 'onEmitSaveProfile',
    id: number,
    name: string,
    currentWeight: number,
    targetWeight: number
  ): void;
}>();

const emitSaveProfile = () => {
  //name.value && alert(`Hi ${name.value}`);
  console.log('before emit');
  emits(
    'onEmitSaveProfile',
    props.profile ? props.profile.id : null,
    name,
    currentWeight,
    targetWeight
  );
  console.log('after emit');
};

// https://stackblitz.com/edit/vite-kmhcnp?file=src%2FApp.vue
//
</script>

<template>
  <section>
    <v-row>
      <v-col cols="2" />
      <v-col cols="6" class="text-left">
        <header>
          <h2>
            {{ profile ?? `New ` }} Profile
            {{ profile ? `Id:${profile.id}` : `` }}
          </h2>
        </header></v-col
      >
      <v-col cols="2" />
    </v-row>
    <form @submit.prevent="emitSaveProfile">
      <v-text-field
        autofocus
        label="What's your name?"
        v-model="name"
      ></v-text-field>

      <v-text-field
        label="What's your current weight in kilogrammes ?"
        v-model="currentWeight"
        append-icon="IMdiAccount"
        type="number"
      ></v-text-field>

      <v-text-field
        label="What's your target weight in kilogrammes ?"
        v-model="targetWeight"
        append-icon="mdiWeightKilogram"
        type="number"
      ></v-text-field>

      <v-row>
        <v-col cols="2" />
        <v-col cols="6" class="text-left">
          <v-btn
            type="submit"
            :disabled="disabled"
            variant="outlined"
            color="primary"
            text
          >
            Sauvegarder
          </v-btn>
        </v-col>
        <v-col class="d-flex text-right" cols="2">
          <v-btn
            v-if="profile"
            type="button"
            :disabled="disabled"
            variant="outlined"
            color="error"
            fab
          >
            <i-mdi:delete />
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </section>
</template>

<style scoped>
section {
  padding: 1rem 1.5rem;
}
</style>
