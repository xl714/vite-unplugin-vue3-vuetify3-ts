<script setup lang="ts">
// unplugin-auto-import will declare it on src/auto-imports.d.ts
const name = ref('');
const currentWeight = ref('');
const targetWeight = ref('');

const disabled = computed(() => {
  return !(
    name.value.trim().length > 0 &&
    currentWeight.value.trim().length > 0 &&
    targetWeight.value.trim().length > 0
  );
});
const sayHi = () => {
  name.value && alert(`Hi ${name.value}`);
};
</script>

<template>
  <section>
    <header>
      <h2>Profile</h2>
    </header>
    <form @submit.prevent="sayHi">
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
