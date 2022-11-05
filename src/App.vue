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

import { Profile } from './classes/profile';

let profiles = reactive(new Map());
let selectedProfileId = ref(null);

let selectedProfile = computed(() => {
  return selectedProfileId ? profiles.get(selectedProfileId) : null;
});

let showFormProfile = ref(false);

const loadProfiles = onMounted(() => {
  console.log('mounted profiles', profiles);
  console.log('mounted profiles.size', profiles.size);

  if (localStorage.getItem('profiles')) {
    try {
      profiles.value = JSON.parse(localStorage.getItem('profiles'));
      console.log('this.profiles', this.profiles.value);
    } catch (e) {
      localStorage.removeItem('profiles');
      console.log("localStorage.removeItem('profiles');");
    }
  }
  console.log('profiles.size');
  console.log(profiles.size);
  if (!profiles.size) {
    showFormProfile.value = true;
    console.log('showFormProfile.value', showFormProfile.value);
  }
});

const saveProfile = (id, name, currentWeight, targetWeight) => {
  console.log('---- saveProfile', id, name, currentWeight, targetWeight);
  if (!id) {
    let keys = [...profiles.keys()];
    id = keys.length > 0 ? Math.max(...keys) + 1 : 1;
  }
  let profile = new Profile(id, name, currentWeight, targetWeight);
  console.log('profile.id', profile.id);
  profiles.set(id, profile);
  saveProfiles();
  profiles.forEach(function (value, key) {
    console.log('profile item key', key, 'profile item value', value);
  });
  console.log('profiles.size', profiles.size);
  selectedProfileId.value = profile.id;
  showFormProfile.value = false;
};

const saveProfiles = () => {
  const parsed = JSON.stringify(profiles);
  //localStorage.setItem('profiles', parsed);
  console.log('saveProfiles', parsed);
};

const removeProfile = () => {
  profile.delete(selectedProfileId);
  saveProfiles();
};

const openNewFormProfile = () => {
  console.log('openNewFormProfile');
  showFormProfile.value = true;
};
const selectProfile = (id) => {
  console.log('selectProfile', id);
  selectedProfileId.value = id;
};
</script>

<template>
  <v-app>
    <Header
      :profiles="profiles"
      :selectedProfileId="selectedProfileId"
      @onEmitSelectProfile="selectProfile"
      @onEmitOpenNewFormProfile="openNewFormProfile"
      :showAddButton="!showFormProfile && profiles.size < 3"
    />
    <v-main>
      <FormProfile
        v-if="showFormProfile"
        @onEmitSaveProfile="saveProfile"
        :profile="selectedProfile"
      />
      <Profile v-if="selectedProfile" :profile="selectedProfile" />
    </v-main>
  </v-app>
</template>
<style scoped>
.v-main {
  padding: 1rem 0;
}
</style>
