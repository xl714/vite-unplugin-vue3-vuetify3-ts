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

class Profile {
  id: number | null;
  name: string;
  currentWeight: number;
  targetWeight: number;
  // burnedList: { timestamp: number; calories: number }[];
  burnedList: Array<{ timestamp: number; calories: number }>;

  constructor(
    id: number,
    name: string,
    currentWeight: number,
    targetWeight: number,
    burnedList: Array<{ timestamp: number; calories: number }> = []
  ) {
    this.id = id;
    this.name = name;
    this.currentWeight = currentWeight;
    this.targetWeight = targetWeight;
    this.burnedList = burnedList;
  }
}

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
  console.log('saveProfile', id, name, currentWeight, targetWeight);
  let profile = new Profile(id, name, currentWeight, targetWeight);
  // save profile
  let profilId = profile.id ?? Math.max(...profiles.keys()) + 1;
  profiles.set(profilId, profile);
  // saveProfiles();
  profiles.forEach(function (value, key) {
    console.log(key, value);
  });
  selectedProfileId = profilId;
  showFormProfile = false;
};

const saveProfiles = () => {
  const parsed = JSON.stringify(profiles);
  localStorage.setItem('profiles', parsed);
};

const removeCat = (x) => {
  this.cats.splice(x, 1);
  this.saveCats();
};
</script>

<template>
  <v-app>
    <Header :profiles="profiles" />
    <v-main>
      <FormProfile
        v-if="showFormProfile"
        @onEmitSaveProfile="saveProfile"
        :selectedProfileId="selectedProfileId"
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
