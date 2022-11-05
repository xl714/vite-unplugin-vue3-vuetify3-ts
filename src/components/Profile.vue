<script setup lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
export interface Props {
  profile?: object | null;
}
const props = withDefaults(defineProps<Props>(), {
  profile: null,
});
console.log('Profile.vue props', props);
</script>

<template>
  <div>PROFILE {{ profile.name }}</div>
</template>
