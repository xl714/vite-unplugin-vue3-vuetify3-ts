<script setup lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
export interface Props {
  profile?: object | null;
}
const props = withDefaults(defineProps<Props>(), {
  profile: null,
});
</script>

<template>
  <div>PROFILE {{ profile.name }}</div>
</template>
