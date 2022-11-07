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
let showProfileViewMain = ref(false);
let showProfiles = ref(false);
let showFormProfile = ref(false);
let forceUpdateKey = ref(0); // https://stackoverflow.com/questions/42678983/vue-js-computed-property-not-updating

let selectedProfile = computed(() => {
  console.log(
    `computed selectedProfile forceUpdateKey.value: ${forceUpdateKey.value}`
  );
  return profilesMngr.getById(selectedProfileId.value, new Profile());
});

const loadProfiles = onMounted(() => {
  profiles.value = profilesMngr.loadList();
  console.log('loadProfiles profiles', profilesMngr.toString());
  if (profiles.value && profiles.value.size) {
    openProfiles();
  } else {
    openNewFormProfile();
  }
});

const saveProfile = (id, name, startWeight, targetWeight) => {
  console.log('---- saveProfile:', id, name, startWeight, targetWeight);
  let profile = new Profile(id, name, startWeight, targetWeight);
  profile = profilesMngr.saveProfile(profile);
  console.log('Saved Profile:', profile.toString());
  profiles.value = profilesMngr.getList();
  console.log(profilesMngr.toString());
  openProfileViewMain(profile.id);
};

const removeProfile = (id: number) => {
  console.log('selectProfile', id);
  profilesMngr.removeProfile(id);
  profiles.value = profilesMngr.getList();
  openProfiles();
};

const selectProfile = (id: number) => {
  console.log(`selectProfile(id:${id})`);
  openProfileViewMain(id);
};

const openProfileViewMain = (id: number) => {
  console.log(`openProfileViewMain(id:${id})`);
  forceUpdateKey.value++;
  console.log('forceUpdateKey.value', forceUpdateKey.value);
  selectedProfileId.value = id;
  showFormProfile.value = false;
  showProfiles.value = false;
  showProfileViewMain.value = true;
};

const openProfiles = () => {
  console.log('openProfiles');
  forceUpdateKey.value++;
  console.log('forceUpdateKey.value', forceUpdateKey.value);
  selectedProfileId.value = null;
  showFormProfile.value = false;
  showProfileViewMain.value = false;
  showProfiles.value = true;
};

const openNewFormProfile = () => {
  console.log('openNewFormProfile');
  forceUpdateKey.value++;
  console.log('forceUpdateKey.value', forceUpdateKey.value);
  selectedProfileId.value = null;
  showProfileViewMain.value = false;
  showProfiles.value = false;
  showFormProfile.value = true;
};

const openEditFormProfile = (id: number) => {
  console.log(`openEditFormProfile(id:${id})`);
  forceUpdateKey.value++;
  console.log('forceUpdateKey.value', forceUpdateKey.value);
  selectedProfileId.value = id;
  showProfiles.value = false;
  showProfileViewMain.value = false;
  showFormProfile.value = true;
};
</script>

<template>
  <v-app id="inspire">
    <Header :profile="selectedProfile" @onEmitOpenProfiles="openProfiles" />
    <v-main>
      <ProfileViewMain
        v-if="showProfileViewMain"
        :profile="selectedProfile"
        @onEmitOpenEditFormProfile="openEditFormProfile"
        :key="forceUpdateKey"
      />
      <FormProfile
        v-else-if="showFormProfile"
        @onEmitSaveProfile="saveProfile"
        @onEmitRemoveProfile="removeProfile"
        :profile="selectedProfile"
        :key="forceUpdateKey"
      />
      <Profiles
        v-else-if="showProfiles"
        :profiles="profiles"
        :selectedProfileId="selectedProfileId"
        @onEmitOpenNewFormProfile="openNewFormProfile"
        @onEmitSelectProfile="selectProfile"
        @onEmitOpenEditFormProfile="openEditFormProfile"
        :key="forceUpdateKey"
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
