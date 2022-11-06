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
let showProfile = ref(false);
let showFormProfile = ref(false);
let selectedProfileId = ref(null);

let selectedProfile = computed(() => {
  return selectedProfileId ? profiles.get(selectedProfileId.value) : null;
});

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

const saveProfile = (id, name, startWeight, targetWeight) => {
  console.log('---- saveProfile:', id, name, startWeight, targetWeight);
  if (!id) {
    let keys = [...profiles.keys()];
    id = keys.length > 0 ? Math.max(...keys) + 1 : 1;
  }
  let profile = new Profile(id, name, startWeight, targetWeight);
  console.log('profile.id', profile.id);
  profiles.set(id, profile);
  saveProfiles();
  profiles.forEach(function (profileItem, id) {
    console.log('profile item id', id, 'profileItem', profileItem.str());
  });
  console.log('profiles.size', profiles.size);
  selectedProfileId.value = profile.id;
  showFormProfile.value = false;
  showProfile.value = true;
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
  selectedProfileId.value = null;
  showFormProfile.value = true;
  showProfile.value = false;
};
const selectProfile = (id: number) => {
  console.log('selectProfile', id);
  selectedProfileId.value = parseInt(id);
  showFormProfile.value = false;
  showProfile.value = true;
};

const openEditFormProfile = (id: number) => {
  console.log('openNewFormProfile');
  selectedProfileId.value = id;
  showFormProfile.value = true;
  showProfile.value = false;
};
</script>

<template>
  <v-app id="inspire">
    <v-system-bar dark color="indigo darken-2">
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>
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
      <ProfileViewMain
        v-if="showProfile"
        :profile="selectedProfile"
        @onEmitOpenEditFormProfile="openEditFormProfile"
      />
    </v-main>
  </v-app>
</template>
<style scoped>
html,
body {
  margin-top: 0px !important;
}
.v-main {
  padding: 1rem 0;
}
</style>
