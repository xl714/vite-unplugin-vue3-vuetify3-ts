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

import { Profile, ProfileListManagerLocalStorage } from './classes/profile';

const profilesMngr = new ProfileListManagerLocalStorage();
let profiles = reactive(new Map());
let selectedProfileId = ref(null);
let showProfile = ref(false);
let showFormProfile = ref(false);

let selectedProfile = computed(() => {
  return profilesMngr.getById(selectedProfileId.value, new Profile());
});

const loadProfiles = onMounted(() => {
  console.log('mounted profiles', profiles);
  console.log('mounted profiles.size', profiles.size);
  profiles.value = profilesMngr.loadList();
  console.log('typeof profiles', typeof profiles);
  console.log('typeof profiles.value', typeof profiles.value);
  console.log('profiles.size', profiles.size);
  console.log('profiles.value.size', profiles.value.size);
  if (!(profiles.value && profiles.size.value)) {
    showFormProfile.value = true;
    console.log('showFormProfile.value', showFormProfile.value);
  }
});

const saveProfile = (id, name, startWeight, targetWeight) => {
  console.log('---- saveProfile:', id, name, startWeight, targetWeight);
  let profile = new Profile(id, name, startWeight, targetWeight);
  profilesMngr.saveProfile(profile);
  profiles.value = profilesMngr.getList();
  console.log(profilesMngr.toString());
  console.log('typeof profiles.value', typeof profiles.value);
  console.log('profiles.value.size', profiles.value.size);
  selectedProfileId.value = profile.id;
  showFormProfile.value = false;
  showProfile.value = true;
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
