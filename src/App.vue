<script setup lang="ts">
/*
The current recommended approach is:
 - Use SFC + <script setup> + Composition API
 - Use VSCode + Volar (or WebStorm once its support for <script setup> ships soon)
 - Not strictly required for TS, but if applicable, use Vite for build tooling.
TODO: 
 - saveProfile cf https://v2.vuejs.org/v2/cookbook/client-side-storage.html
*/
// unplugin-auto-import will declare it on src/auto-imports.d.ts
const name = ref('');
const disabled = computed(() => {
  return name.value && name.value.trim().lenght > 0;
});

const profiles = ref([]);
const showProfile = ref(false);
const showFormProfile = ref(false);

const loadProfiles = onMounted(() => {
  console.log('mounted');
  console.log('profiles', profiles);
  console.log('profiles.value', profiles.value);
  console.log('mounted 2');

  if (localStorage.getItem('profiles')) {
    try {
      profiles.value = JSON.parse(localStorage.getItem('profiles'));
      console.log('this.profiles', this.profiles.value);
    } catch (e) {
      localStorage.removeItem('profiles');
      console.log("localStorage.removeItem('profiles');");
    }
  }
  console.log('profiles.value.length');
  console.log(profiles.value.length);
  if (!profiles.value.length) {
    showFormProfile.value = true;
    console.log('showFormProfile.value', showFormProfile.value);
  }
});

const saveProfile = (name, currentWeight, targetWeight) => {
  console.log('saveProfile', name, currentWeight, targetWeight);
};
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <FormProfile v-if="showFormProfile" @onEmitSaveProfile="saveProfile" />
      <Profile v-if="showProfile" />
    </v-main>
  </v-app>
</template>
<style scoped>
.v-main {
  padding: 1rem 0;
}
</style>
