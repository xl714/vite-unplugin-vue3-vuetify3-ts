<script setup lang="ts">
// unplugin-auto-import will declare it on src/auto-imports.d.ts
const name = ref('');
const disabled = computed(() => {
  return name.value && name.value.trim().lenght > 0;
});
let one = ref(true);
const toggleOne = () => {
  console.log('toggleOne');
  console.log('one', one);
  one = !one;
  console.log('one', one);
};

let profiles = reactive([]);
let showProfile = reactive(false);
let showFormProfile = reactive(false);

const loadProfiles = onMounted(() => {
  console.log('mounted');
  console.log('profiles', profiles);
  console.log('mounted 2');

  if (localStorage.getItem('profiles')) {
    try {
      profiles = JSON.parse(localStorage.getItem('profiles'));
      console.log('this.profiles', this.profiles);
    } catch (e) {
      localStorage.removeItem('profiles');
      console.log("localStorage.removeItem('profiles');");
    }
  }
  console.log('profiles.length', profiles.length);
  if (!profiles.length) {
    showFormProfile = true;
    console.log('showFormProfile', showFormProfile);
  }
});
</script>

<template>
  <div v-if="one === true">TRUE</div>
  <div v-if="one === false">FALSE</div>
  <v-btn
    @click="toggleOne"
    type="button"
    variant="outlined"
    color="primary"
    text
  >
    Toggle
  </v-btn>
</template>
<!--template>
  <v-app>
    <Header />
    <v-main>
      <FormProfile v-if="showFormProfile" />
      <Profile v-if="showProfile" />
      <div v-if="one">TRUE</div>
      <div v-if="!one">FALSE</div>
      <v-btn
        @click="toggleOne"
        type="button"
        variant="outlined"
        color="primary"
        text
      >
        Toggle
      </v-btn>
    </v-main>
  </v-app>
</template -->
<style scoped>
.v-main {
  padding: 1rem 0;
}
</style>
