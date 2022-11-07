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
let showProfiles = ref(false);
let showFormProfile = ref(false);

let selectedProfile = computed(() => {
  return profilesMngr.getById(selectedProfileId.value, new Profile());
});

const loadProfiles = onMounted(() => {
  profiles.value = profilesMngr.loadList();
  console.log('loadProfiles profiles', profiles.toString());
  if (!(profiles.value && profiles.size.value)) {
    showProfiles.value = false;
    showProfile.value = false;
    showFormProfile.value = true;
  }
});

const saveProfile = (id, name, startWeight, targetWeight) => {
  console.log('---- saveProfile:', id, name, startWeight, targetWeight);
  let profile = new Profile(id, name, startWeight, targetWeight);
  profilesMngr.saveProfile(profile);
  profiles.value = profilesMngr.getList();
  console.log(profilesMngr.toString());
  selectedProfileId.value = profile.id;
  showFormProfile.value = false;
  showProfiles.value = false;
  showProfile.value = true;
};

const selectProfile = (id: number) => {
  console.log('selectProfile', id);
  selectedProfileId.value = parseInt(id);
  showFormProfile.value = false;
  showProfiles.value = false;
  showProfile.value = true;
};

const openProfiles = () => {
  console.log('onEmitOpenProfiles');
  showFormProfile.value = false;
  showProfile.value = false;
  showProfiles.value = true;
};

const openNewFormProfile = () => {
  console.log('openNewFormProfile');
  selectedProfileId.value = null;
  showProfile.value = false;
  showProfiles.value = false;
  showFormProfile.value = true;
};

const openEditFormProfile = (id: number) => {
  console.log('openEditFormProfile');
  selectedProfileId.value = id;
  showProfiles.value = false;
  showProfile.value = false;
  showFormProfile.value = true;
};
</script>

<template>
  <v-app id="inspire">
    <Header :profile="selectedProfile" @onEmitOpenProfiles="openProfiles" />
    <v-main>
      <ProfileViewMain
        v-if="showProfile"
        :profile="selectedProfile"
        @onEmitOpenEditFormProfile="openEditFormProfile"
      />
      <FormProfile
        v-else-if="showFormProfile"
        @onEmitSaveProfile="saveProfile"
        :profile="selectedProfile"
      />
      <Profiles
        v-else-if="showProfiles"
        :profiles="profiles"
        :selectedProfileId="selectedProfileId"
        @onEmitOpenNewFormProfile="openNewFormProfile"
        @onEmitSelectProfile="selectProfile"
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
