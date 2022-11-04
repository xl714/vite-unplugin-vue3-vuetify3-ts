<script setup lang="ts">
// unplugin-auto-import will declare it on src/auto-imports.d.ts
const name = ref('Xavier');
const currentWeight = ref('88');
const targetWeight = ref('70');

const disabled = computed(() => {
  return !(
    name.value.trim().length > 0 &&
    currentWeight.value.trim().length > 0 &&
    targetWeight.value.trim().length > 0
  );
});

// const emit = defineEmits(['saveProfile']);
// const emits = ['saveProfile'];
//const emit = defineEmits<{(e: saveProfile, name: string): void}>();
//console.log('emit', emit);

const emits = defineEmits<{ (e: 'onEmitSaveProfile', name: string): void }>();

const emitSaveProfile = () => {
  //name.value && alert(`Hi ${name.value}`);
  console.log('before emit');
  emits('onEmitSaveProfile', name, currentWeight, targetWeight);
  console.log('after emit');
};

// https://stackblitz.com/edit/vite-kmhcnp?file=src%2FApp.vue
// 
</script>

<template>
  <section>
    <header>
      <h2>Profile</h2>
    </header>
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
      ></v-text-field>

      <v-text-field
        label="What's your target weight in kilogrammes ?"
        v-model="targetWeight"
        append-icon="mdiWeightKilogram"
      ></v-text-field>

      <v-btn
        type="submit"
        :disabled="disabled"
        variant="outlined"
        color="primary"
        text
      >
        Let's GO !
      </v-btn>
    </form>
  </section>
</template>

<style scoped>
section {
  padding: 1rem 1.5rem;
}
</style>
